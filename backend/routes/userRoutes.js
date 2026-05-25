const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  next();
};

// Get all users
router.get('/', verifyToken, (req, res) => {
  const mockUsers = [
    {
      id: 1,
      email: 'john@scms.edu',
      name: 'John Doe',
      role: 'student',
      classroom: 'Room 101',
      createdAt: '2024-01-01'
    },
    {
      id: 2,
      email: 'jane@scms.edu',
      name: 'Jane Smith',
      role: 'teacher',
      classroom: 'Room 101',
      createdAt: '2024-01-01'
    },
    {
      id: 3,
      email: 'admin@scms.edu',
      name: 'Admin User',
      role: 'admin',
      classroom: null,
      createdAt: '2024-01-01'
    }
  ];

  res.json({
    success: true,
    data: mockUsers,
    total: mockUsers.length
  });
});

// Get user profile
router.get('/profile/:id', verifyToken, (req, res) => {
  const user = {
    id: req.params.id,
    email: 'user@scms.edu',
    name: 'User Name',
    role: 'student',
    phone: '+1-XXX-XXX-XXXX',
    classroom: 'Room 101',
    enrollmentDate: '2024-01-01',
    avatar: 'https://api.example.com/avatars/user.jpg'
  };

  res.json({
    success: true,
    data: user
  });
});

// Update user profile
router.put('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const updatedUser = {
    id,
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    message: 'User profile updated',
    data: updatedUser
  });
});

module.exports = router;
