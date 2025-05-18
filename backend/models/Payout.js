// backend/models/Payout.js
const mongoose = require('mongoose');

const payoutSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  periodStart: { type: Date, required: true },
  periodEnd: { type: Date, required: true },
  totalHours: { type: Number, required: true },
  grossAmount: { type: Number, required: true },
  deductions: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  finalAmount: { type: Number, required: true },
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
  receiptUrl: { type: String }, // optional: if receipt PDF is stored
  status: { type: String, enum: ['pending', 'paid', 'under review'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Payout', payoutSchema);
