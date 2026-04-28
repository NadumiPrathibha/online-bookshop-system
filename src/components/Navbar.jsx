// src/components/Navbar.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Adjust key if needed
    alert('🔒 Logged out successfully!');
    navigate('/login');
  };

  const renderLinks = () => {
    switch (location.pathname) {
      case '/':
        return (
          <>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        );
      case '/BookList':
        return (
          <>
            <li><Link to="/">Home</Link></li>
           
            <li><Link to="/Login">Login</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </>
        );
      case '/book/:id':
        return (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Profile">My Profile</Link></li>
            <li><Link to="/BookList">Book List</Link></li>
          </>
        );
      case '/ShoppingCart':
        return (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link to="/booklist">Book List</Link></li>
          </>
        );
      case '/Profile':
        return (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/ShoppingCart">Cart</Link></li>
            <li><Link to="/Checkout">Checkout</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </>
        );
      case '/Checkout':
        return (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/ShoppingCart">Cart</Link></li>
            <li><Link to="/Profile">My Profile</Link></li>
          </>
        );
        case '/OrderConfirmation':
        return (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/ShoppingCart">Cart</Link></li>
            <li><Link to="/Profile">My Profile</Link></li>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="nav-logo">📚 BookStore</div>
      </div>
      <ul className="nav-links">
        {renderLinks()}
      </ul>
    </nav>
  );
};

export default Navbar;
