import React, { createContext, useState, useEffect } from 'react';

// Create the context for the cart
const CartContext = createContext();

// Create a provider component
const CartProvider = ({ children }) => {
  // Initialize cart from localStorage if it exists
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Add item to the cart
  const addToCart = (book) => {
    const existingBook = cart.find(item => item.id === book.id);
    if (existingBook) {
      // If book already exists, increase the quantity
      const updatedCart = cart.map(item =>
        item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      // If book doesn't exist in cart, add it with quantity 1
      const updatedCart = [...cart, { ...book, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  // Remove item from the cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Update quantity of items in the cart
  const updateQuantity = (id, action) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        if (action === 'increase') {
          item.quantity += 1;
        } else if (action === 'decrease' && item.quantity > 1) {
          item.quantity -= 1;
        }
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Calculate total price of items in the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Cart context values that will be provided to components
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    calculateTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
const useCart = () => {
  return React.useContext(CartContext);
};

export { CartProvider, useCart };
