const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  next();
};

// Get all alerts
router.get('/', verifyToken, (req, res) => {
  const mockAlerts = [
    {
      id: 1,
      type: 'fire',
      severity: 'critical',
      message: 'Fire detected in Room 101',
      timestamp: new Date().toISOString(),
      location: 'Room 101',
      acknowledged: false,
      acknowledgedBy: null
    },
    {
      id: 2,
      type: 'unauthorized_access',
      severity: 'high',
      message: 'Unauthorized access attempt at main entrance',
      timestamp: new Date().toISOString(),
      location: 'Main Entrance',
      acknowledged: true,
      acknowledgedBy: 'admin@scms.edu'
    },
    {
      id: 3,
      type: 'resource_maintenance',
      severity: 'medium',
      message: 'Projector requires maintenance',
      timestamp: new Date().toISOString(),
      location: 'Room 101',
      acknowledged: false,
      acknowledgedBy: null
    }
  ];

  res.json({
    success: true,
    data: mockAlerts,
    total: mockAlerts.length
  });
});

// Create emergency alert
router.post('/emergency', verifyToken, [
  body('type').notEmpty(),
  body('message').notEmpty(),
  body('location').notEmpty()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { type, message, location, severity } = req.body;
  const alert = {
    id: Date.now(),
    type,
    message,
    location,
    severity: severity || 'high',
    timestamp: new Date().toISOString(),
    acknowledged: false
  };

  // Emit real-time alert via Socket.io
  const io = req.app.get('io');
  if (io) {
    io.emit('emergency-alert', alert);
  }

  res.status(201).json({
    success: true,
    message: 'Emergency alert created',
    data: alert
  });
});

// Acknowledge alert
router.put('/:id/acknowledge', verifyToken, (req, res) => {
  const { id } = req.params;
  const { acknowledgedBy } = req.body;

  const acknowledgment = {
    alertId: id,
    acknowledgedBy: acknowledgedBy || 'unknown',
    acknowledgedAt: new Date().toISOString(),
    status: 'acknowledged'
  };

  res.json({
    success: true,
    message: 'Alert acknowledged',
    data: acknowledgment
  });
});

// Get alert statistics
router.get('/statistics', verifyToken, (req, res) => {
  const statistics = {
    totalAlerts: 45,
    criticalAlerts: 3,
    highPriorityAlerts: 8,
    mediumPriorityAlerts: 15,
    lowPriorityAlerts: 19,
    acknowledgedAlerts: 35,
    pendingAlerts: 10,
    alertsByType: {
      fire: 3,
      unauthorizedAccess: 8,
      resourceMaintenance: 15,
      other: 19
    },
    responseTime: {
      average: '5.2 minutes',
      fastest: '0.5 minutes',
      slowest: '45 minutes'
    }
  };

  res.json({
    success: true,
    data: statistics
  });
});

module.exports = router;
