const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  method: { type: String, required: true },
  amount: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model('Payment', paymentSchema);
