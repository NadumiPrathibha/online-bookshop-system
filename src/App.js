// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
import ShoppingCart from './pages/ShoppingCart';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

// Import Context and Components
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // ✅ Add Footer

import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/booklist" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
        <Footer /> {/* ✅ Add here */}
      </Router>
    </CartProvider>
  );
}

export default App;
