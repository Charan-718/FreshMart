const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Generate session ID for guest users
const generateSessionId = () => {
  return 'guest_' + Math.random().toString(36).substr(2, 9);
};

// GET /api/cart - Get cart items
router.get('/', async (req, res) => {
  try {
    const sessionId = req.headers['session-id'] || generateSessionId();
    
    let cart = await Cart.findOne({ sessionId })
      .populate('items.productId', 'name price image category description inStock');
    
    if (!cart) {
      cart = new Cart({ 
        sessionId, 
        items: [],
        total: 0 
      });
      await cart.save();
    }
    
    res.json({
      sessionId: cart.sessionId,
      items: cart.items,
      total: cart.total
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
});

// POST /api/cart/add - Add item to cart
router.post('/add', async (req, res) => {
  try {
    const { productId, name, price, image, category, quantity = 1 } = req.body;
    const sessionId = req.headers['session-id'] || generateSessionId();
    
    let cart = await Cart.findOne({ sessionId });
    
    if (!cart) {
      cart = new Cart({ sessionId, items: [] });
    }
    
    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );
    
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.items.push({
        productId,
        name,
        price,
        image,
        category,
        quantity
      });
    }
    
    await cart.save();
    
    res.json({
      message: 'Item added to cart successfully',
      cart: {
        sessionId: cart.sessionId,
        items: cart.items,
        total: cart.total
      }
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error: error.message });
  }
});

// PUT /api/cart/update/:itemId - Update item quantity
router.put('/update/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const sessionId = req.headers['session-id'];
    
    if (!sessionId) {
      return res.status(400).json({ message: 'Session ID required' });
    }
    
    const cart = await Cart.findOne({ sessionId });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const item = cart.items.id(itemId);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    if (quantity < 1) {
      // Remove item if quantity is 0
      cart.items.pull({ _id: itemId });
    } else {
      item.quantity = quantity;
    }
    
    await cart.save();
    
    res.json({
      message: 'Cart updated successfully',
      cart: {
        sessionId: cart.sessionId,
        items: cart.items,
        total: cart.total
      }
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error: error.message });
  }
});

// DELETE /api/cart/remove/:itemId - Remove item from cart
router.delete('/remove/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const sessionId = req.headers['session-id'];
    
    if (!sessionId) {
      return res.status(400).json({ message: 'Session ID required' });
    }
    
    const cart = await Cart.findOne({ sessionId });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.items.pull({ _id: itemId });
    await cart.save();
    
    res.json({
      message: 'Item removed from cart successfully',
      cart: {
        sessionId: cart.sessionId,
        items: cart.items,
        total: cart.total
      }
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error: error.message });
  }
});

// DELETE /api/cart/clear - Clear entire cart
router.delete('/clear', async (req, res) => {
  try {
    const sessionId = req.headers['session-id'];
    
    if (!sessionId) {
      return res.status(400).json({ message: 'Session ID required' });
    }
    
    const cart = await Cart.findOne({ sessionId });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.items = [];
    await cart.save();
    
    res.json({
      message: 'Cart cleared successfully',
      cart: {
        sessionId: cart.sessionId,
        items: cart.items,
        total: cart.total
      }
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
});

module.exports = router;