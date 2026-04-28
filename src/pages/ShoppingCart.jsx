import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShoppingCart.css';

function ShoppingCart() {
  // Initialize cart state from localStorage or set as empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sync cart changes to localStorage on every update
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Function to add a book to the cart or increase quantity if already present
  const addToCart = (book) => {
    const existingBook = cart.find(item => item.id === book.id);
    if (existingBook) {
      const updatedCart = cart.map(item =>
        item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart, { ...book, quantity: 1 }];
      setCart(updatedCart);
    }
  };

  // Function to remove a book from the cart by ID
  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  };

  // Function to update the quantity of an item
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
  };

  // Function to calculate the total price of all items in the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // React Router navigation hook
  const navigate = useNavigate();

  // Navigate to checkout page
  const handleCheckout = () => {
    navigate('/Checkout');
  };

  // Navigate back to book list for further shopping
  const handleContinueShopping = () => {
    navigate('/BookList');
  };

  // Calculate the total number of items in the cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="shopping-cart-container">
      {/* Cart Header */}
      <div className="cart-header">
        <span className="cart-icon">🛒</span>
        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        <h1>Shopping Cart</h1>
      </div>

      {/* Show message if cart is empty */}
      {cart.length === 0 ? (
        <p>Your cart is empty. Start shopping!</p>
      ) : (
        <div className="cart-items-container">
          {/* List of cart items */}
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="item-image" />
              <div className="item-details">
                <h2>{item.title}</h2>
                <p>{item.author}</p>
                <p className="item-price">Rs.{item.price}</p>

                {/* Quantity control buttons */}
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, 'decrease')}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 'increase')}>+</button>
                </div>
              </div>

              {/* Remove item button */}
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                ✖ Remove
              </button>
            </div>
          ))}

          {/* Total price of cart */}
          <div className="cart-total">
            <h3>Total: Rs.{calculateTotal()}</h3>
          </div>
        </div>
      )}

      {/* Action buttons below cart */}
      <div className="cart-actions">
        <button className="continue-shopping-btn" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;
