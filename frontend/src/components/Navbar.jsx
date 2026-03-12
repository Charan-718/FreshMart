import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const isLoggedIn = false; // This should come from auth context

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-brand">
          <Link to="/">FreshMart</Link>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart</Link>
          {isLoggedIn ? (
            <>
              <Link to="/orders">My Orders</Link>
              <Link to="/profile">Profile</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;