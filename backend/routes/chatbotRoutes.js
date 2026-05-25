const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  next();
};

// Send message to chatbot
router.post('/message', verifyToken, [
  body('message').notEmpty(),
  body('studentId').notEmpty()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { message, studentId } = req.body;
  const conversationId = Date.now();

  // Mock AI response
  const aiResponse = {
    conversationId,
    studentId,
    userMessage: message,
    aiResponse: `I understand you're asking about: "${message}". Let me help you with this concept...`,
    timestamp: new Date().toISOString(),
    suggestedResources: [
      { type: 'video', title: 'Understanding the concept', url: '#' },
      { type: 'article', title: 'Detailed explanation', url: '#' }
    ]
  };

  res.status(201).json({
    success: true,
    data: aiResponse
  });
});

// Get learning gaps for a student
router.get('/learning-gaps/:studentId', verifyToken, (req, res) => {
  const { studentId } = req.params;

  const learningGaps = {
    studentId,
    analysisDate: new Date().toISOString(),
    overallReadiness: '72%',
    identifiedGaps: [
      {
        subject: 'Mathematics',
        topic: 'Quadratic Equations',
        severity: 'high',
        confidence: '92%',
        recommendedActions: [
          'Review basic algebra concepts',
          'Practice quadratic equation solving',
          'Watch tutorial videos'
        ]
      },
      {
        subject: 'Science',
        topic: 'Photosynthesis',
        severity: 'medium',
        confidence: '85%',
        recommendedActions: [
          'Read chapter 3 in textbook',
          'Join study group'
        ]
      }
    ],
    suggestedInterventions: [
      { type: 'tutoring', duration: '30 minutes', frequency: '3x per week' },
      { type: 'peer-learning', partner: 'High performer in same class' },
      { type: 'online-resources', platform: 'Khan Academy' }
    ]
  };

  res.json({
    success: true,
    data: learningGaps
  });
});

// Get conversation history
router.get('/history/:studentId', verifyToken, (req, res) => {
  const { studentId } = req.params;

  const history = {
    studentId,
    totalConversations: 23,
    conversations: [
      {
        conversationId: 1,
        date: '2024-01-25',
        topic: 'Algebra Help',
        messageCount: 5,
        resolutionScore: 8.5
      },
      {
        conversationId: 2,
        date: '2024-01-24',
        topic: 'Science Concepts',
        messageCount: 3,
        resolutionScore: 7.2
      }
    ]
  };

  res.json({
    success: true,
    data: history
  });
});

module.exports = router;
