import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../utils/constants';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['all', 'fruits', 'vegetables', 'dairy', 'meat', 'bakery', 'beverages', 'snacks'];

  // Fetch products directly from MongoDB API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}/products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
        
      } catch (err) {
        console.error('Failed to fetch products from MongoDB:', err);
        setError('Failed to load products from database. Please ensure the backend is running.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || product.category === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  if (loading) {
    return (
      <div className="shop">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading products from database...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shop">
      <div className="container">
        {/* Header */}
        <div className="shop-header">
          <h1>Shop All Products</h1>
          <p>Discover our wide selection of fresh, organic groceries</p>
        </div>

        {/* Error notification if database request fails */}
        {error && (
          <div className="error-banner" style={{ padding: '12px 16px', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        {/* Filters and Search */}
        <div className="shop-controls">
          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="sort-dropdown">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Count */}
        <div className="products-count">
          <p>Showing {filteredProducts.length} products</p>
        </div>

        {/* Products Grid */}
        <div className="products-grid grid grid-3">
          {filteredProducts.map(product => (
            <div key={product._id || product.id} className="product-card">
              <Link to={`/product/${product._id || product.id}`}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="price">₹{product.price}</p>
                <button className="btn btn-primary">View Details</button>
              </Link>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && !loading && (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;