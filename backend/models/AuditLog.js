// backend/models/AuditLog.js
const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  actionBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  modelAffected: { type: String, required: true },
  recordId: { type: mongoose.Schema.Types.ObjectId, required: true },
  actionType: { type: String, enum: ['create', 'update', 'delete'], required: true },
  previousData: { type: mongoose.Schema.Types.Mixed },
  updatedData: { type: mongoose.Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
