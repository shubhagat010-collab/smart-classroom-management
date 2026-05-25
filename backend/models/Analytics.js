const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  classroomId: String,
  studentId: String,
  date: Date,
  attendancePercentage: Number,
  engagementScore: Number,
  performanceScore: Number,
  participationRate: Number,
  behaviorMetrics: {
    attentiveness: Number,
    cooperation: Number,
    initiative: Number,
  },
  learningGaps: [String],
  recommendations: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Analytics', analyticsSchema);
