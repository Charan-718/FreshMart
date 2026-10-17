import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/constants';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details directly from MongoDB database
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        
        if (response.ok) {
          const productData = await response.json();
          setProduct(productData);
        } else {
          throw new Error('Product not found in database');
        }
      } catch (err) {
        console.error('Failed to fetch product from database:', err);
        setError(err.message || 'Product not found in database');
        setProduct(null);
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

    const productId = product._id || product.id;

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('grocery_cart_items') || '[]');
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(
      item => item.productId === productId || item.id === productId
    );
    
    if (existingItemIndex > -1) {
      // Update quantity if product exists
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      const cartItem = {
        id: Date.now(),
        productId: productId,
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

  if (error || !product) {
    return (
      <div className="product-details">
        <div className="container">
          <div className="error-message">
            <h2>Product Not Found</h2>
            <p>{error || "The product you're looking for doesn't exist in the database."}</p>
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
              <span className="rating-text">({product.rating || 4.5}) • {product.reviews || 50} reviews</span>
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
            <p>{product.longDescription || product.description}</p>
          </div>

          {product.nutrition && (
            <div className="detail-section">
              <h3>Nutritional Information</h3>
              <div className="nutrition-facts">
                <div className="nutrition-item">
                  <span>Calories</span>
                  <span>{product.nutrition.calories || 'N/A'}</span>
                </div>
                <div className="nutrition-item">
                  <span>Carbohydrates</span>
                  <span>{product.nutrition.carbs || 0}g</span>
                </div>
                <div className="nutrition-item">
                  <span>Fiber</span>
                  <span>{product.nutrition.fiber || 0}g</span>
                </div>
                <div className="nutrition-item">
                  <span>Sugar</span>
                  <span>{product.nutrition.sugar || 0}g</span>
                </div>
                <div className="nutrition-item">
                  <span>Protein</span>
                  <span>{product.nutrition.protein || 0}g</span>
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