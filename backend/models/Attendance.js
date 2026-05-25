const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  studentName: String,
  classroomId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  checkInTime: Date,
  method: {
    type: String,
    enum: ['mobile', 'facial-recognition', 'manual'],
    default: 'mobile',
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late'],
    default: 'present',
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
