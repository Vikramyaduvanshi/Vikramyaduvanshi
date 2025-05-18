// backend/models/Receipt.js
const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  payout: { type: mongoose.Schema.Types.ObjectId, ref: 'Payout', required: true },
  receiptContent: { type: Object, required: true }, // includes breakdown, taxes, sessions
  generatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Receipt', receiptSchema);
