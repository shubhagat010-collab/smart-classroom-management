const express = require('express');
const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  next();
};

// Get attendance analytics
router.get('/attendance', verifyToken, (req, res) => {
  const analytics = {
    period: req.query.period || 'monthly',
    totalStudents: 500,
    averageAttendance: '91.5%',
    trends: [
      { date: '2024-01-01', percentage: 90 },
      { date: '2024-01-02', percentage: 92 },
      { date: '2024-01-03', percentage: 91 },
      { date: '2024-01-04', percentage: 93 },
      { date: '2024-01-05', percentage: 89 }
    ],
    byGrade: [
      { grade: 'Grade 1', attendance: '94%' },
      { grade: 'Grade 2', attendance: '92%' },
      { grade: 'Grade 3', attendance: '89%' },
      { grade: 'Grade 4', attendance: '91%' }
    ]
  };

  res.json({
    success: true,
    data: analytics
  });
});

// Get student engagement analytics
router.get('/engagement', verifyToken, (req, res) => {
  const engagementData = {
    classroomId: req.query.classroomId,
    engagementScore: 7.8,
    engagementLevel: 'High',
    students: [
      { studentId: 'S001', name: 'John Doe', engagementScore: 8.5, participationRate: '85%' },
      { studentId: 'S002', name: 'Jane Smith', engagementScore: 9.0, participationRate: '90%' },
      { studentId: 'S003', name: 'Bob Johnson', engagementScore: 6.2, participationRate: '62%' }
    ],
    activityBreakdown: {
      interactiveParticipation: '45%',
      handRaising: '25%',
      groupWork: '20%',
      other: '10%'
    }
  };

  res.json({
    success: true,
    data: engagementData
  });
});

// Get resource utilization analytics
router.get('/resources', verifyToken, (req, res) => {
  const resourceAnalytics = {
    period: req.query.period || 'monthly',
    averageUtilization: '78%',
    resources: [
      {
        resourceId: 1,
        name: 'Projector 1',
        utilizationRate: '85%',
        hoursUsed: 156,
        maintenanceStatus: 'Good',
        nextMaintenance: '2024-02-15'
      },
      {
        resourceId: 2,
        name: 'Smart Board',
        utilizationRate: '92%',
        hoursUsed: 178,
        maintenanceStatus: 'Good',
        nextMaintenance: '2024-02-10'
      },
      {
        resourceId: 3,
        name: 'Computer Lab',
        utilizationRate: '65%',
        hoursUsed: 126,
        maintenanceStatus: 'Needs Maintenance',
        nextMaintenance: '2024-01-30'
      }
    ]
  };

  res.json({
    success: true,
    data: resourceAnalytics
  });
});

// Get performance analytics
router.get('/performance', verifyToken, (req, res) => {
  const performanceData = {
    classroomId: req.query.classroomId,
    averagePerformance: '82.5%',
    topPerformers: [
      { studentId: 'S001', name: 'Alice Wilson', score: 95 },
      { studentId: 'S002', name: 'Bob Smith', score: 92 }
    ],
    needsSupport: [
      { studentId: 'S003', name: 'Charlie Brown', score: 65, gaps: ['Math', 'Science'] },
      { studentId: 'S004', name: 'Diana Prince', score: 72, gaps: ['Literature'] }
    ]
  };

  res.json({
    success: true,
    data: performanceData
  });
});

module.exports = router;
