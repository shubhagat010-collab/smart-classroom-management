const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  next();
};

// Get all resources
router.get('/', verifyToken, (req, res) => {
  const mockResources = [
    {
      id: 1,
      name: 'Projector 1',
      type: 'projector',
      location: 'Room 101',
      status: 'available',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-02-15'
    },
    {
      id: 2,
      name: 'Smart Board',
      type: 'display',
      location: 'Room 101',
      status: 'in-use',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-02-10'
    },
    {
      id: 3,
      name: 'Computer Lab',
      type: 'computers',
      location: 'Lab 1',
      status: 'available',
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-02-20'
    }
  ];

  res.json({
    success: true,
    data: mockResources,
    total: mockResources.length
  });
});

// Add new resource
router.post('/', verifyToken, [
  body('name').notEmpty(),
  body('type').notEmpty(),
  body('location').notEmpty()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, type, location } = req.body;
  const resource = {
    id: Date.now(),
    name,
    type,
    location,
    status: 'available',
    createdAt: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    message: 'Resource added successfully',
    data: resource
  });
});

// Update resource
router.put('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const updatedResource = {
    id: parseInt(id),
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    message: 'Resource updated successfully',
    data: updatedResource
  });
});

// Delete resource
router.delete('/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  res.json({
    success: true,
    message: 'Resource deleted successfully',
    deletedId: id
  });
});

// Get resource usage
router.get('/:id/usage', verifyToken, (req, res) => {
  const usage = {
    resourceId: req.params.id,
    totalUsageHours: 156,
    averageDailyUsage: 7.8,
    utilizationRate: '78%',
    monthlyUsage: [
      { month: 'January', hours: 45 },
      { month: 'February', hours: 52 },
      { month: 'March', hours: 59 }
    ]
  };

  res.json({
    success: true,
    data: usage
  });
});

module.exports = router;
