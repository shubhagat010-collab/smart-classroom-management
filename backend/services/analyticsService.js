// Analytics Service
const Analytics = require('../models/Analytics');
const Attendance = require('../models/Attendance');
const Resource = require('../models/Resource');

const calculateAttendanceAnalytics = async (classroomId, startDate, endDate) => {
  try {
    const records = await Attendance.find({
      classroomId,
      date: { $gte: startDate, $lte: endDate },
    });

    const totalRecords = records.length;
    const presentCount = records.filter((r) => r.status === 'present').length;
    const averageAttendance = ((presentCount / totalRecords) * 100).toFixed(2);

    return {
      classroomId,
      period: { startDate, endDate },
      totalRecords,
      presentCount,
      averageAttendance: `${averageAttendance}%`,
      trends: generateTrends(records),
    };
  } catch (err) {
    throw new Error(`Error calculating attendance analytics: ${err.message}`);
  }
};

const calculateEngagementAnalytics = async (classroomId) => {
  try {
    const analytics = await Analytics.find({ classroomId });
    const avgEngagementScore =
      analytics.reduce((sum, a) => sum + (a.engagementScore || 0), 0) /
      analytics.length;

    return {
      classroomId,
      averageEngagementScore: avgEngagementScore.toFixed(2),
      studentAnalytics: analytics.map((a) => ({
        studentId: a.studentId,
        engagementScore: a.engagementScore,
        participationRate: a.participationRate,
      })),
    };
  } catch (err) {
    throw new Error(`Error calculating engagement analytics: ${err.message}`);
  }
};

const calculateResourceUtilization = async () => {
  try {
    const resources = await Resource.find();
    const totalUsageHours = resources.reduce((sum, r) => sum + r.usageHours, 0);
    const averageUtilization =
      (totalUsageHours / (resources.length * 240)) * 100; // 240 working hours per month

    return {
      totalResources: resources.length,
      totalUsageHours,
      averageUtilizationRate: `${averageUtilization.toFixed(2)}%`,
      resourceBreakdown: resources.map((r) => ({
        resourceId: r._id,
        name: r.name,
        utilizationRate: `${((r.usageHours / 240) * 100).toFixed(2)}%`,
        status: r.status,
      })),
    };
  } catch (err) {
    throw new Error(`Error calculating resource utilization: ${err.message}`);
  }
};

const generateTrends = (records) => {
  const trends = {};
  records.forEach((record) => {
    const date = new Date(record.date).toISOString().split('T')[0];
    if (!trends[date]) trends[date] = { total: 0, present: 0 };
    trends[date].total++;
    if (record.status === 'present') trends[date].present++;
  });

  return Object.entries(trends).map(([date, data]) => ({
    date,
    percentage: ((data.present / data.total) * 100).toFixed(2),
  }));
};

module.exports = {
  calculateAttendanceAnalytics,
  calculateEngagementAnalytics,
  calculateResourceUtilization,
};
