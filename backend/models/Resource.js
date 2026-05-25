const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['projector', 'display', 'computer', 'furniture', 'other'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'in-use', 'maintenance', 'broken'],
    default: 'available',
  },
  lastMaintenance: Date,
  nextMaintenance: Date,
  maintenanceHistory: [
    {
      date: Date,
      description: String,
      cost: Number,
    },
  ],
  usageHours: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Resource', resourceSchema);
