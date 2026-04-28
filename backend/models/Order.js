const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  bookTitle: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, default: 'Processing' },
});

module.exports = mongoose.model('Order', orderSchema);
