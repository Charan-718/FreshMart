// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Cart.css';

// // Sample cart items
// const sampleCartItems = [
//   {
//     id: 1,
//     productId: 1,
//     name: 'Organic Apples',
//     price: 4.99,
//     quantity: 2,
//     image: '/images/apples.jpg',
//     category: 'fruits'
//   },
//   {
//     id: 2,
//     productId: 4,
//     name: 'Milk',
//     price: 3.49,
//     quantity: 1,
//     image: '/images/milk.jpg',
//     category: 'dairy'
//   },
//   {
//     id: 3,
//     productId: 5,
//     name: 'Eggs',
//     price: 4.99,
//     quantity: 1,
//     image: '/images/eggs.jpg',
//     category: 'dairy'
//   }
// ];

// const Cart = () => {
//   const [cartItems, setCartItems] = useState(sampleCartItems);
//   const [recipes, setRecipes] = useState([]);
//   const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);

//   const updateQuantity = (id, newQuantity) => {
//     if (newQuantity < 1) return;
    
//     setCartItems(items =>
//       items.map(item =>
//         item.id === id ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   const removeItem = (id) => {
//     setCartItems(items => items.filter(item => item.id !== id));
//   };

//   const getTotalPrice = () => {
//     return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   };

//   const getTaxAmount = () => {
//     return getTotalPrice() * 0.08;
//   };

//   const getShippingCost = () => {
//     return 5.99;
//   };

//   const getFinalTotal = () => {
//     return getTotalPrice() + getShippingCost() + getTaxAmount();
//   };

//   const handleSmartRecipe = async () => {
//     setIsLoadingRecipes(true);
    
//     // Simulate API call to LLM backend
//     setTimeout(() => {
//       const sampleRecipes = [
//         {
//           id: 1,
//           name: 'Apple Omelette',
//           description: 'A sweet and savory omelette with fresh apples and dairy',
//           cookingTime: 15,
//           difficulty: 'Easy',
//           ingredients: ['Apples', 'Eggs', 'Milk', 'Butter', 'Cinnamon'],
//           image: '/images/recipe1.jpg',
//           instructions: [
//             'Chop apples into small pieces',
//             'Whisk eggs with milk',
//             'Cook apples in butter until soft',
//             'Pour egg mixture over apples',
//             'Sprinkle with cinnamon and cook until set'
//           ],
//           nutrition: {
//             calories: 320,
//             protein: '18g',
//             carbs: '25g',
//             fat: '15g'
//           }
//         },
//         {
//           id: 2,
//           name: 'Fruit Smoothie Bowl',
//           description: 'Refreshing smoothie bowl with apples and yogurt',
//           cookingTime: 5,
//           difficulty: 'Very Easy',
//           ingredients: ['Apples', 'Milk', 'Yogurt', 'Honey', 'Granola'],
//           image: '/images/recipe2.jpg',
//           instructions: [
//             'Blend apples with milk and yogurt',
//             'Pour into a bowl',
//             'Top with granola and drizzle with honey',
//             'Serve immediately'
//           ],
//           nutrition: {
//             calories: 280,
//             protein: '12g',
//             carbs: '45g',
//             fat: '8g'
//           }
//         },
//         {
//           id: 3,
//           name: 'Scrambled Eggs with Apple Salsa',
//           description: 'Fluffy scrambled eggs topped with fresh apple salsa',
//           cookingTime: 10,
//           difficulty: 'Easy',
//           ingredients: ['Eggs', 'Apples', 'Milk', 'Onion', 'Cilantro'],
//           image: '/images/recipe3.jpg',
//           instructions: [
//             'Dice apples and mix with chopped onion and cilantro',
//             'Whisk eggs with milk and scramble until fluffy',
//             'Top eggs with apple salsa',
//             'Season with salt and pepper'
//           ],
//           nutrition: {
//             calories: 250,
//             protein: '16g',
//             carbs: '20g',
//             fat: '12g'
//           }
//         }
//       ];
//       setRecipes(sampleRecipes);
//       setIsLoadingRecipes(false);
//     }, 2000);
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="cart">
//         <div className="container">
//           <h1>Shopping Cart</h1>
//           <div className="empty-cart">
//             <h2>Your cart is empty</h2>
//             <p>Add some delicious groceries to get started!</p>
//             <Link to="/shop" className="btn btn-primary">
//               Start Shopping
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="cart">
//       <div className="cart-container">
//         <h1>Shopping Cart</h1>
        
//         <div className="cart-content">
//           {/* Cart Items */}
//           <div className="cart-items-section">
//             <h2>Cart Items ({cartItems.length})</h2>
//             <div className="cart-items">
//               {cartItems.map(item => (
//                 <div key={item.id} className="cart-item">
//                   <div className="item-image">
//                     <img src={item.image} alt={item.name} />
//                   </div>
//                   <div className="item-details">
//                     <h3>{item.name}</h3>
//                     <p className="item-category">{item.category}</p>
//                     <p className="item-price">₹{item.price} each</p>
//                   </div>
//                   <div className="quantity-controls">
//                     <button 
//                       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                       className="btn btn-quantity"
//                     >
//                       -
//                     </button>
//                     <span className="quantity">{item.quantity}</span>
//                     <button 
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                       className="btn btn-quantity"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <div className="item-total">
//                     <span className="total-label">Total:</span>
//                     <span className="total-amount">₹{(item.price * item.quantity).toFixed(2)}</span>
//                   </div>
//                   <button 
//                     onClick={() => removeItem(item.id)}
//                     className="btn btn-remove"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Cart Summary & Recipes */}
//           <div className="cart-sidebar">
//             {/* Cart Summary */}
//             <div className="cart-summary">
//               <div className="summary-card">
//                 <h3>Order Summary</h3>
//                 <div className="summary-row">
//                   <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
//                   <span>₹{getTotalPrice().toFixed(2)}</span>
//                 </div>
//                 <div className="summary-row">
//                   <span>Shipping</span>
//                   <span>₹{getShippingCost().toFixed(2)}</span>
//                 </div>
//                 <div className="summary-row">
//                   <span>Tax (8%)</span>
//                   <span>₹{getTaxAmount().toFixed(2)}</span>
//                 </div>
//                 <div className="summary-row total">
//                   <span>Total</span>
//                   <span>₹{getFinalTotal().toFixed(2)}</span>
//                 </div>
                
//                 <Link to="/checkout" className="btn btn-primary btn-checkout">
//                   Proceed to Checkout
//                 </Link>
//                 <Link to="/shop" className="btn btn-secondary btn-continue">
//                   Continue Shopping
//                 </Link>
//               </div>
//             </div>

//             {/* Smart Recipe Section */}
//             <div className="recipe-section">
//               <div className="recipe-header">
//                 <h3>Smart Recipe Suggestions</h3>
//                 <p>Get personalized recipe ideas based on your cart items using AI!</p>
//                 <div className="recipe-icon">🍳</div>
//                 <button 
//                   onClick={handleSmartRecipe}
//                   className="btn btn-recipe"
//                   disabled={isLoadingRecipes}
//                 >
//                   {isLoadingRecipes ? (
//                     <>
//                       <div className="spinner"></div>
//                       Generating Recipes...
//                     </>
//                   ) : (
//                     'Get Recipe Ideas'
//                   )}
//                 </button>
//               </div>

//               {isLoadingRecipes && (
//                 <div className="loading-recipes">
//                   <div className="loading-spinner"></div>
//                   <p>Our AI chef is cooking up delicious recipes for you...</p>
//                 </div>
//               )}

//               {recipes.length > 0 && (
//                 <div className="recipes-grid">
//                   <h4>Suggested Recipes ({recipes.length})</h4>
//                   <div className="recipes-list">
//                     {recipes.map(recipe => (
//                       <div key={recipe.id} className="recipe-card">
//                         <div className="recipe-image">
//                           <img src={recipe.image} alt={recipe.name} />
//                           <div className="recipe-badge">{recipe.difficulty}</div>
//                         </div>
//                         <div className="recipe-content">
//                           <h5>{recipe.name}</h5>
//                           <p className="recipe-description">{recipe.description}</p>
//                           <div className="recipe-meta">
//                             <span className="cooking-time">⏱️ {recipe.cookingTime} mins</span>
//                             <span className="ingredients-count">🍴 {recipe.ingredients.length} ingredients</span>
//                           </div>
//                           <div className="recipe-ingredients">
//                             <strong>Ingredients:</strong>
//                             <div className="ingredients-list">
//                               {recipe.ingredients.map((ingredient, index) => (
//                                 <span key={index} className="ingredient-tag">
//                                   {ingredient}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>
//                           <Link 
//                             to={`/recipe/${recipe.id}`} 
//                             className="btn btn-view-recipe"
//                           >
//                             View Full Recipe
//                           </Link>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

// Sample cart items for initial setup
const sampleCartItems = [
  {
    id: 1,
    productId: 1,
    name: 'Organic Apples',
    price: 4.99,
    quantity: 2,
    image: '/images/apples.jpg',
    category: 'fruits'
  },
  {
    id: 2,
    productId: 4,
    name: 'Milk',
    price: 3.49,
    quantity: 1,
    image: '/images/milk.jpg',
    category: 'dairy'
  },
  {
    id: 3,
    productId: 5,
    name: 'Eggs',
    price: 4.99,
    quantity: 1,
    image: '/images/eggs.jpg',
    category: 'dairy'
  }
];

// localStorage keys
const CART_STORAGE_KEY = 'grocery_cart_items';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(true);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const loadCartItems = () => {
      try {
        const savedCartItems = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCartItems) {
          setCartItems(JSON.parse(savedCartItems));
        } else {
          // If no items in localStorage, use sample items and save them
          setCartItems(sampleCartItems);
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(sampleCartItems));
        }
      } catch (error) {
        console.error('Error loading cart items from localStorage:', error);
        // Fallback to sample items if there's an error
        setCartItems(sampleCartItems);
      } finally {
        setIsLoadingCart(false);
      }
    };

    loadCartItems();
  }, []);

  // Save cart items to localStorage whenever cartItems changes
  useEffect(() => {
    if (!isLoadingCart) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving cart items to localStorage:', error);
      }
    }
  }, [cartItems, isLoadingCart]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTaxAmount = () => {
    return getTotalPrice() * 0.08;
  };

  const getShippingCost = () => {
    return 5.99;
  };

  const getFinalTotal = () => {
    return getTotalPrice() + getShippingCost() + getTaxAmount();
  };

  const handleSmartRecipe = async () => {
    setIsLoadingRecipes(true);
    
    // Simulate API call to LLM backend
    setTimeout(() => {
      const sampleRecipes = [
        {
          id: 1,
          name: 'Apple Omelette',
          description: 'A sweet and savory omelette with fresh apples and dairy',
          cookingTime: 15,
          difficulty: 'Easy',
          ingredients: ['Apples', 'Eggs', 'Milk', 'Butter', 'Cinnamon'],
          image: '/images/recipe1.jpg',
          instructions: [
            'Chop apples into small pieces',
            'Whisk eggs with milk',
            'Cook apples in butter until soft',
            'Pour egg mixture over apples',
            'Sprinkle with cinnamon and cook until set'
          ],
          nutrition: {
            calories: 320,
            protein: '18g',
            carbs: '25g',
            fat: '15g'
          }
        },
        {
          id: 2,
          name: 'Fruit Smoothie Bowl',
          description: 'Refreshing smoothie bowl with apples and yogurt',
          cookingTime: 5,
          difficulty: 'Very Easy',
          ingredients: ['Apples', 'Milk', 'Yogurt', 'Honey', 'Granola'],
          image: '/images/recipe2.jpg',
          instructions: [
            'Blend apples with milk and yogurt',
            'Pour into a bowl',
            'Top with granola and drizzle with honey',
            'Serve immediately'
          ],
          nutrition: {
            calories: 280,
            protein: '12g',
            carbs: '45g',
            fat: '8g'
          }
        },
        {
          id: 3,
          name: 'Scrambled Eggs with Apple Salsa',
          description: 'Fluffy scrambled eggs topped with fresh apple salsa',
          cookingTime: 10,
          difficulty: 'Easy',
          ingredients: ['Eggs', 'Apples', 'Milk', 'Onion', 'Cilantro'],
          image: '/images/recipe3.jpg',
          instructions: [
            'Dice apples and mix with chopped onion and cilantro',
            'Whisk eggs with milk and scramble until fluffy',
            'Top eggs with apple salsa',
            'Season with salt and pepper'
          ],
          nutrition: {
            calories: 250,
            protein: '16g',
            carbs: '20g',
            fat: '12g'
          }
        }
      ];
      setRecipes(sampleRecipes);
      setIsLoadingRecipes(false);
    }, 2000);
  };

  // Show loading state while cart items are being loaded
  if (isLoadingCart) {
    return (
      <div className="cart">
        <div className="container">
          <h1>Shopping Cart</h1>
          <div className="loading-cart">
            <div className="loading-spinner"></div>
            <p>Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <div className="container">
          <h1>Shopping Cart</h1>
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some delicious groceries to get started!</p>
            <Link to="/shop" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        
        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items-section">
            <h2>Cart Items ({cartItems.length})</h2>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-category">{item.category}</p>
                    <p className="item-price">₹{item.price} each</p>
                  </div>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="btn btn-quantity"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="btn btn-quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">
                    <span className="total-label">Total:</span>
                    <span className="total-amount">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="btn btn-remove"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary & Recipes */}
          <div className="cart-sidebar">
            {/* Cart Summary */}
            <div className="cart-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>₹{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>₹{getShippingCost().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (8%)</span>
                  <span>₹{getTaxAmount().toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{getFinalTotal().toFixed(2)}</span>
                </div>
                
                <Link to="/checkout" className="btn btn-primary btn-checkout">
                  Proceed to Checkout
                </Link>
                <Link to="/shop" className="btn btn-secondary btn-continue">
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Smart Recipe Section */}
            <div className="recipe-section">
              <div className="recipe-header">
                <h3>Smart Recipe Suggestions</h3>
                <p>Get personalized recipe ideas based on your cart items using AI!</p>
                <div className="recipe-icon">🍳</div>
                <button 
                  onClick={handleSmartRecipe}
                  className="btn btn-recipe"
                  disabled={isLoadingRecipes}
                >
                  {isLoadingRecipes ? (
                    <>
                      <div className="spinner"></div>
                      Generating Recipes...
                    </>
                  ) : (
                    'Get Recipe Ideas'
                  )}
                </button>
              </div>

              {isLoadingRecipes && (
                <div className="loading-recipes">
                  <div className="loading-spinner"></div>
                  <p>Our AI chef is cooking up delicious recipes for you...</p>
                </div>
              )}

              {recipes.length > 0 && (
                <div className="recipes-grid">
                  <h4>Suggested Recipes ({recipes.length})</h4>
                  <div className="recipes-list">
                    {recipes.map(recipe => (
                      <div key={recipe.id} className="recipe-card">
                        <div className="recipe-image">
                          <img src={recipe.image} alt={recipe.name} />
                          <div className="recipe-badge">{recipe.difficulty}</div>
                        </div>
                        <div className="recipe-content">
                          <h5>{recipe.name}</h5>
                          <p className="recipe-description">{recipe.description}</p>
                          <div className="recipe-meta">
                            <span className="cooking-time">⏱️ {recipe.cookingTime} mins</span>
                            <span className="ingredients-count">🍴 {recipe.ingredients.length} ingredients</span>
                          </div>
                          <div className="recipe-ingredients">
                            <strong>Ingredients:</strong>
                            <div className="ingredients-list">
                              {recipe.ingredients.map((ingredient, index) => (
                                <span key={index} className="ingredient-tag">
                                  {ingredient}
                                </span>
                              ))}
                            </div>
                          </div>
                          <Link 
                            to={`/recipe/${recipe.id}`} 
                            className="btn btn-view-recipe"
                          >
                            View Full Recipe
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;