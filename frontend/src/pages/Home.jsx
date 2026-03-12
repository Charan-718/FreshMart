import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const categories = [
    { id: 1, name: 'Fruits & Vegetables', image: '/images/fruits-veg.jpg' },
    { id: 2, name: 'Dairy & Eggs', image: '/images/dairy.jpg' },
    { id: 3, name: 'Meat & Poultry', image: '/images/meat.jpg' },
    { id: 4, name: 'Bakery', image: '/images/bakery.jpg' }
  ];

  const featuredProducts = [
    { id: 1, name: 'Organic Apples', price: 4.99, image: '/images/apples.jpg' },
    { id: 2, name: 'Fresh Milk', price: 3.49, image: '/images/milk.jpg' },
    { id: 3, name: 'Whole Wheat Bread', price: 2.99, image: '/images/bread.jpg' },
    { id: 4, name: 'Chicken Breast', price: 8.99, image: '/images/chicken.jpg' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Fresh Groceries Delivered to Your Door</h1>
            <p>Get the best quality products at amazing prices with free delivery on your first order!</p>
            <Link to="/shop" className="btn btn-primary">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <h2>Shop by Category</h2>
          <div className="grid grid-4">
            {categories.map(category => (
              <div key={category.id} className="category-card">
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                </div>
                <h3>{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="grid grid-4">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="price">₹{product.price}</p>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="offers">
        <div className="container">
          <h2>Special Offers</h2>
          <div className="offer-banner">
            <h3>Get 20% OFF on your first order!</h3>
            <p>Use code: WELCOME20</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;