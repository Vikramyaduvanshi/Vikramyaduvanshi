// backend/models/Session.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sessionType: { type: String, enum: ['live', 'evaluation', 'review'], required: true },
  date: { type: Date, required: true },
  durationMinutes: { type: Number, required: true },
  ratePerHour: { type: Number, required: true },
  status: { type: String, enum: ['completed', 'pending'], default: 'completed' }
}, 
{ timestamps: true }
);

module.exports = mongoose.model('Session', sessionSchema);
