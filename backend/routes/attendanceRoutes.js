const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Mock middleware for token verification
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  next();
};

// Get attendance records
router.get('/records', verifyToken, (req, res) => {
  const { classroomId, date, studentId } = req.query;
  
  const mockRecords = [
    {
      id: 1,
      studentId: 'S001',
      studentName: 'John Doe',
      classroomId: 'C001',
      date: new Date().toISOString(),
      checkInTime: new Date().toISOString(),
      status: 'present'
    },
    {
      id: 2,
      studentId: 'S002',
      studentName: 'Jane Smith',
      classroomId: 'C001',
      date: new Date().toISOString(),
      checkInTime: new Date().toISOString(),
      status: 'present'
    }
  ];

  res.json({
    success: true,
    data: mockRecords,
    total: mockRecords.length
  });
});

// Record attendance
router.post('/check-in', verifyToken, [
  body('studentId').notEmpty(),
  body('classroomId').notEmpty()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { studentId, classroomId, method } = req.body;
  const attendanceRecord = {
    id: Date.now(),
    studentId,
    classroomId,
    date: new Date().toISOString(),
    checkInTime: new Date().toISOString(),
    method: method || 'mobile', // mobile, facial-recognition, manual
    status: 'present'
  };

  res.status(201).json({
    success: true,
    message: 'Attendance recorded',
    data: attendanceRecord
  });
});

// Generate attendance reports
router.get('/reports', verifyToken, (req, res) => {
  const { classroomId, startDate, endDate } = req.query;

  const mockReport = {
    classroomId,
    period: { startDate, endDate },
    totalStudents: 30,
    totalDays: 20,
    statistics: {
      averageAttendance: '92%',
      totalPresent: 552,
      totalAbsent: 48,
      totalLate: 12
    },
    studentBreakdown: [
      { studentId: 'S001', studentName: 'John Doe', attendance: '95%', present: 19, absent: 1 },
      { studentId: 'S002', studentName: 'Jane Smith', attendance: '90%', present: 18, absent: 2 }
    ]
  };

  res.json({
    success: true,
    data: mockReport
  });
});

// Get attendance statistics
router.get('/statistics', verifyToken, (req, res) => {
  const statistics = {
    todayPresent: 28,
    todayAbsent: 2,
    todayLate: 3,
    weekAverage: '93%',
    monthAverage: '91%',
    trends: [
      { date: '2024-01-01', present: 28, absent: 2 },
      { date: '2024-01-02', present: 29, absent: 1 },
      { date: '2024-01-03', present: 27, absent: 3 }
    ]
  };

  res.json({
    success: true,
    data: statistics
  });
});

module.exports = router;
