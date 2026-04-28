const mongoose = require('mongoose');

// Define the schema for a CartItem
const cartItemSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', // Reference to the Book model (assuming you have a Book model)
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1, // Default quantity is 1
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (if you have user authentication implemented)
    required: true,
  },
}, { timestamps: true });

// Create a model for CartItem
const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
