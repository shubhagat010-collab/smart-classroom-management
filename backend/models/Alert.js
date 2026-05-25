const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['fire', 'unauthorized_access', 'resource_maintenance', 'emergency', 'other'],
    required: true,
  },
  severity: {
    type: String,
    enum: ['critical', 'high', 'medium', 'low'],
    default: 'high',
  },
  message: {
    type: String,
    required: true,
  },
  location: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  acknowledged: {
    type: Boolean,
    default: false,
  },
  acknowledgedBy: String,
  acknowledgedAt: Date,
  resolvedAt: Date,
  status: {
    type: String,
    enum: ['active', 'acknowledged', 'resolved'],
    default: 'active',
  },
  notificationssent: [String],
});

module.exports = mongoose.model('Alert', alertSchema);
