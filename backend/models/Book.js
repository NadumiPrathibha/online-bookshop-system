const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  bookId: { type: String, required: true, unique: true },  // Unique Book ID
  googleId: { type: String, required: true },               // Google Books ID
  title: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

module.exports = mongoose.model('Book', BookSchema);