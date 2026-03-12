import { useState, useEffect, useCallback } from 'react';
import { storage, cartHelpers } from '../utils/helpers';
import { STORAGE_KEYS, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../utils/constants';
import { api } from '../utils/api';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load cart items from localStorage on mount
  useEffect(() => {
    const savedCart = storage.get(STORAGE_KEYS.CART_ITEMS) || [];
    setCartItems(savedCart);
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    storage.set(STORAGE_KEYS.CART_ITEMS, cartItems);
  }, [cartItems]);

  // Add item to cart
  const addToCart = useCallback((product, quantity = 1) => {
    setError(null);
    
    try {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.productId === product.id);
        
        if (existingItem) {
          // Update quantity if item already exists
          const newQuantity = existingItem.quantity + quantity;
          if (newQuantity > 10) {
            setError('Maximum quantity reached (10 items)');
            return prevItems;
          }
          
          return prevItems.map(item =>
            item.productId === product.id
              ? { ...item, quantity: newQuantity }
              : item
          );
        } else {
          // Add new item to cart
          const newItem = {
            id: Date.now().toString(),
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: quantity
          };
          
          return [...prevItems, newItem];
        }
      });
      
      console.log(SUCCESS_MESSAGES.ITEM_ADDED_TO_CART);
      return { success: true };
    } catch (err) {
      const errorMessage = ERROR_MESSAGES.SERVER_ERROR;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((itemId) => {
    setError(null);
    
    try {
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
      console.log(SUCCESS_MESSAGES.ITEM_REMOVED_FROM_CART);
      return { success: true };
    } catch (err) {
      const errorMessage = ERROR_MESSAGES.SERVER_ERROR;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((itemId, newQuantity) => {
    setError(null);
    
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    if (newQuantity > 10) {
      setError('Maximum quantity is 10');
      return;
    }
    
    try {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
      return { success: true };
    } catch (err) {
      const errorMessage = ERROR_MESSAGES.SERVER_ERROR;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [removeFromCart]);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCartItems([]);
    storage.remove(STORAGE_KEYS.CART_ITEMS);
    return { success: true };
  }, []);

  // Get cart totals
  const getCartTotals = useCallback(() => {
    const subtotal = cartHelpers.calculateSubtotal(cartItems);
    const tax = cartHelpers.calculateTax(subtotal);
    const shipping = cartHelpers.calculateShipping(subtotal);
    const total = cartHelpers.calculateTotal(cartItems);
    const itemCount = cartHelpers.getCartItemCount(cartItems);
    
    return {
      subtotal,
      tax,
      shipping,
      total,
      itemCount
    };
  }, [cartItems]);

  // Check if product is in cart
  const isInCart = useCallback((productId) => {
    return cartItems.some(item => item.productId === productId);
  }, [cartItems]);

  // Get cart item by product ID
  const getCartItem = useCallback((productId) => {
    return cartItems.find(item => item.productId === productId);
  }, [cartItems]);

  // Sync cart with server (when user is authenticated)
  const syncCartWithServer = useCallback(async () => {
    if (cartItems.length === 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // This would be your API call to sync cart with server
      await api.syncCart(cartItems);
      return { success: true };
    } catch (err) {
      const errorMessage = ERROR_MESSAGES.SERVER_ERROR;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [cartItems]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    cartItems,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotals,
    isInCart,
    getCartItem,
    syncCartWithServer,
    clearError
  };
};

export default useCart;