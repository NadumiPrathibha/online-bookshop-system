// controllers/cartController.js
const CartItem = require('../models/CartItems');

// Fetch cart items for a user
exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find({ userId: req.userId }); // Get items from the database
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Add item to the cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, title, price, image } = req.body;

    // Check if item already exists in the cart
    let cartItem = await CartItem.findOne({ userId: req.userId, productId });

    if (cartItem) {
      // If it exists, increase quantity
      cartItem.quantity += 1;
    } else {
      // If it doesn't exist, create a new cart item
      cartItem = new CartItem({
        userId: req.userId,
        productId,
        title,
        price,
        image,
      });
    }

    await cartItem.save();
    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Remove item from the cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    await CartItem.deleteOne({ userId: req.userId, productId });
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update item quantity
exports.updateQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const cartItem = await CartItem.findOne({ userId: req.userId, productId });

    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      res.json(cartItem);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
