// Attendance Service
const Attendance = require('../models/Attendance');

const recordAttendance = async (studentId, classroomId, method = 'mobile') => {
  try {
    const attendance = new Attendance({
      studentId,
      classroomId,
      date: new Date(),
      checkInTime: new Date(),
      method,
      status: 'present',
    });
    return await attendance.save();
  } catch (err) {
    throw new Error(`Error recording attendance: ${err.message}`);
  }
};

const getAttendanceRecords = async (classroomId, startDate, endDate) => {
  try {
    return await Attendance.find({
      classroomId,
      date: { $gte: startDate, $lte: endDate },
    });
  } catch (err) {
    throw new Error(`Error fetching attendance records: ${err.message}`);
  }
};

const generateAttendanceReport = async (classroomId, startDate, endDate) => {
  try {
    const records = await getAttendanceRecords(classroomId, startDate, endDate);
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const totalStudents = new Set(records.map((r) => r.studentId)).size;

    const studentStats = {};
    records.forEach((record) => {
      if (!studentStats[record.studentId]) {
        studentStats[record.studentId] = { present: 0, absent: 0, late: 0 };
      }
      studentStats[record.studentId][record.status]++;
    });

    return {
      classroomId,
      period: { startDate, endDate },
      totalStudents,
      totalDays,
      statistics: {
        totalPresent: records.filter((r) => r.status === 'present').length,
        totalAbsent: records.filter((r) => r.status === 'absent').length,
        totalLate: records.filter((r) => r.status === 'late').length,
        averageAttendance:
          ((records.filter((r) => r.status === 'present').length /
            (totalStudents * totalDays)) *
            100).toFixed(2) + '%',
      },
      studentBreakdown: Object.entries(studentStats).map(([studentId, stats]) => ({
        studentId,
        attendance: ((stats.present / totalDays) * 100).toFixed(2) + '%',
        ...stats,
      })),
    };
  } catch (err) {
    throw new Error(`Error generating report: ${err.message}`);
  }
};

module.exports = {
  recordAttendance,
  getAttendanceRecords,
  generateAttendanceReport,
};
