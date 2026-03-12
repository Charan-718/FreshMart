// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './ProductDetails.css';

// // This would typically come from an API
// const sampleProduct = {
//   id: 1,
//   name: 'Organic Apples',
//   price: 4.99,
//   category: 'fruits',
//   image: '/images/apples.jpg',
//   description: 'Fresh organic apples from local farms. These apples are crisp, sweet, and perfect for snacking or baking.',
//   longDescription: 'Our organic apples are grown without synthetic pesticides or fertilizers. They are hand-picked at peak ripeness to ensure the best flavor and nutritional value. Perfect for eating fresh, making applesauce, or baking in your favorite recipes.',
//   nutrition: {
//     calories: 95,
//     carbs: 25,
//     fiber: 4,
//     sugar: 19,
//     protein: 0
//   },
//   inStock: true,
//   rating: 4.5,
//   reviews: 128
// };

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [quantity, setQuantity] = useState(1);
//   const [product] = useState(sampleProduct);

//   const handleAddToCart = () => {
//     // Add to cart logic here
//     console.log(`Added ${quantity} ${product.name} to cart`);
//     // Navigate to cart or show success message
//   };

//   const handleBuyNow = () => {
//     handleAddToCart();
//     navigate('/cart');
//   };

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <div className="product-details">
//       <div className="container">
//         <div className="product-details-content">
//           {/* Product Image */}
//           <div className="product-image">
//             <img src={product.image} alt={product.name} />
//           </div>

//           {/* Product Info */}
//           <div className="product-info">
//             <h1>{product.name}</h1>
//             <div className="product-rating">
//               <span className="rating-stars">★★★★☆</span>
//               <span className="rating-text">({product.rating}) • {product.reviews} reviews</span>
//             </div>
//             <p className="product-price">${product.price}</p>
//             <p className="product-description">{product.description}</p>

//             {/* Quantity Selector */}
//             <div className="quantity-selector">
//               <label>Quantity:</label>
//               <div className="quantity-controls">
//                 <button 
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   className="btn btn-secondary"
//                 >
//                   -
//                 </button>
//                 <span className="quantity">{quantity}</span>
//                 <button 
//                   onClick={() => setQuantity(quantity + 1)}
//                   className="btn btn-secondary"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="action-buttons">
//               <button onClick={handleAddToCart} className="btn btn-primary">
//                 Add to Cart
//               </button>
//               <button onClick={handleBuyNow} className="btn btn-secondary">
//                 Buy Now
//               </button>
//             </div>

//             {/* Product Features */}
//             <div className="product-features">
//               <h3>Features</h3>
//               <ul>
//                 <li>100% Organic</li>
//                 <li>Locally Grown</li>
//                 <li>No Artificial Preservatives</li>
//                 <li>Fresh Daily Delivery</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Additional Details */}
//         <div className="product-additional-details">
//           <div className="detail-section">
//             <h3>Description</h3>
//             <p>{product.longDescription}</p>
//           </div>

//           <div className="detail-section">
//             <h3>Nutritional Information</h3>
//             <div className="nutrition-facts">
//               <div className="nutrition-item">
//                 <span>Calories</span>
//                 <span>{product.nutrition.calories}</span>
//               </div>
//               <div className="nutrition-item">
//                 <span>Carbohydrates</span>
//                 <span>{product.nutrition.carbs}g</span>
//               </div>
//               <div className="nutrition-item">
//                 <span>Fiber</span>
//                 <span>{product.nutrition.fiber}g</span>
//               </div>
//               <div className="nutrition-item">
//                 <span>Sugar</span>
//                 <span>{product.nutrition.sugar}g</span>
//               </div>
//               <div className="nutrition-item">
//                 <span>Protein</span>
//                 <span>{product.nutrition.protein}g</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';

// Sample product data for fallback
const sampleProducts = {
  1: {
    id: 1,
    name: 'Organic Apples',
    price: 4.99,
    category: 'fruits',
    image: '/images/apples.jpg',
    description: 'Fresh organic apples from local farms. These apples are crisp, sweet, and perfect for snacking or baking.',
    longDescription: 'Our organic apples are grown without synthetic pesticides or fertilizers. They are hand-picked at peak ripeness to ensure the best flavor and nutritional value. Perfect for eating fresh, making applesauce, or baking in your favorite recipes.',
    nutrition: {
      calories: 95,
      carbs: 25,
      fiber: 4,
      sugar: 19,
      protein: 0
    },
    inStock: true,
    rating: 4.5,
    reviews: 128
  },
  2: {
    id: 2,
    name: 'Bananas',
    price: 1.99,
    category: 'fruits',
    image: '/images/bananas.jpg',
    description: 'Sweet and ripe bananas, perfect for smoothies or snacking.',
    longDescription: 'Our bananas are sourced from sustainable farms and delivered at the perfect ripeness. Rich in potassium and other essential nutrients.',
    nutrition: {
      calories: 105,
      carbs: 27,
      fiber: 3,
      sugar: 14,
      protein: 1
    },
    inStock: true,
    rating: 4.3,
    reviews: 95
  },
  3: {
    id: 3,
    name: 'Carrots',
    price: 2.49,
    category: 'vegetables',
    image: '/images/carrots.jpg',
    description: 'Fresh crunchy carrots, great for cooking or raw snacks.',
    longDescription: 'These fresh carrots are packed with beta-carotene and vitamins. Perfect for salads, cooking, or as a healthy snack.',
    nutrition: {
      calories: 41,
      carbs: 10,
      fiber: 3,
      sugar: 5,
      protein: 1
    },
    inStock: true,
    rating: 4.2,
    reviews: 67
  },
  4: {
    id: 4,
    name: 'Milk',
    price: 3.49,
    category: 'dairy',
    image: '/images/milk.jpg',
    description: 'Fresh whole milk from local dairy farms.',
    longDescription: 'Our milk comes from happy, grass-fed cows and is pasteurized for your safety while maintaining great taste and nutrition.',
    nutrition: {
      calories: 149,
      carbs: 12,
      fiber: 0,
      sugar: 12,
      protein: 8
    },
    inStock: true,
    rating: 4.6,
    reviews: 203
  },
  5: {
    id: 5,
    name: 'Eggs',
    price: 4.99,
    category: 'dairy',
    image: '/images/eggs.jpg',
    description: 'Farm fresh eggs from free-range chickens.',
    longDescription: 'Our eggs come from free-range chickens that are raised without antibiotics. Rich in protein and essential nutrients.',
    nutrition: {
      calories: 78,
      carbs: 1,
      fiber: 0,
      sugar: 1,
      protein: 6
    },
    inStock: true,
    rating: 4.7,
    reviews: 156
  },
  6: {
    id: 6,
    name: 'Chicken Breast',
    price: 8.99,
    category: 'meat',
    image: '/images/chicken.jpg',
    description: 'Boneless chicken breast, perfect for healthy meals.',
    longDescription: 'Lean chicken breast that is perfect for grilling, baking, or sautéing. High in protein and low in fat.',
    nutrition: {
      calories: 165,
      carbs: 0,
      fiber: 0,
      sugar: 0,
      protein: 31
    },
    inStock: true,
    rating: 4.4,
    reviews: 89
  }
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from MongoDB API first
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        
        if (response.ok) {
          const productData = await response.json();
          setProduct(productData);
        } else {
          // Fallback to sample data if API fails
          throw new Error('Product not found in database');
        }
      } catch (err) {
        console.error('Failed to fetch product, using sample data:', err);
        
        // Use sample data as fallback
        if (sampleProducts[id]) {
          setProduct(sampleProducts[id]);
          setError('Using sample data (Product not found in database)');
        } else {
          setError('Product not found');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('grocery_cart_items') || '[]');
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item.productId === product.id);
    
    if (existingItemIndex > -1) {
      // Update quantity if product exists
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      const cartItem = {
        id: Date.now(), // Generate unique ID
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
        category: product.category
      };
      existingCart.push(cartItem);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('grocery_cart_items', JSON.stringify(existingCart));
    
    // Show success message
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="product-details">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="product-details">
        <div className="container">
          <div className="error-message">
            <h2>Product Not Found</h2>
            <p>{error}</p>
            <button onClick={() => navigate('/shop')} className="btn btn-primary">
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details">
        <div className="container">
          <div className="error-message">
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/shop')} className="btn btn-primary">
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details">
      <div className="container">
        {/* Show warning if using sample data */}
        {error && (
          <div className="warning-banner">
            <p>⚠️ {error}</p>
          </div>
        )}

        <button onClick={() => navigate('/shop')} className="btn btn-back">
          ← Back to Shop
        </button>

        <div className="product-details-content">
          {/* Product Image */}
          <div className="product-image">
            <img 
              src={product.image} 
              alt={product.name}
              onError={(e) => {
                e.target.src = '/images/placeholder.jpg';
              }}
            />
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1>{product.name}</h1>
            <div className="product-rating">
              <span className="rating-stars">★★★★☆</span>
              <span className="rating-text">({product.rating}) • {product.reviews} reviews</span>
            </div>
            <p className="product-price">₹{product.price}</p>
            <p className="product-description">{product.description}</p>

            {/* Stock Status */}
            <div className="stock-status">
              {product.inStock ? (
                <span className="in-stock">✓ In Stock</span>
              ) : (
                <span className="out-of-stock">✗ Out of Stock</span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="btn btn-secondary"
                  disabled={!product.inStock}
                >
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="btn btn-secondary"
                  disabled={!product.inStock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button 
                onClick={handleAddToCart} 
                className="btn btn-primary"
                disabled={!product.inStock}
              >
                Add to Cart
              </button>
              <button 
                onClick={handleBuyNow} 
                className="btn btn-secondary"
                disabled={!product.inStock}
              >
                Buy Now
              </button>
            </div>

            {/* Product Features */}
            <div className="product-features">
              <h3>Features</h3>
              <ul>
                <li>100% Organic</li>
                <li>Locally Sourced</li>
                <li>No Artificial Preservatives</li>
                <li>Fresh Daily Delivery</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="product-additional-details">
          <div className="detail-section">
            <h3>Description</h3>
            <p>{product.longDescription}</p>
          </div>

          {product.nutrition && (
            <div className="detail-section">
              <h3>Nutritional Information</h3>
              <div className="nutrition-facts">
                <div className="nutrition-item">
                  <span>Calories</span>
                  <span>{product.nutrition.calories}</span>
                </div>
                <div className="nutrition-item">
                  <span>Carbohydrates</span>
                  <span>{product.nutrition.carbs}g</span>
                </div>
                <div className="nutrition-item">
                  <span>Fiber</span>
                  <span>{product.nutrition.fiber}g</span>
                </div>
                <div className="nutrition-item">
                  <span>Sugar</span>
                  <span>{product.nutrition.sugar}g</span>
                </div>
                <div className="nutrition-item">
                  <span>Protein</span>
                  <span>{product.nutrition.protein}g</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );  
};

export default ProductDetails;