// Alert Service
const Alert = require('../models/Alert');

const createAlert = async (alertData) => {
  try {
    const alert = new Alert(alertData);
    return await alert.save();
  } catch (err) {
    throw new Error(`Error creating alert: ${err.message}`);
  }
};

const getAlerts = async (filters = {}) => {
  try {
    return await Alert.find(filters).sort({ timestamp: -1 });
  } catch (err) {
    throw new Error(`Error fetching alerts: ${err.message}`);
  }
};

const acknowledgeAlert = async (alertId, acknowledgedBy) => {
  try {
    return await Alert.findByIdAndUpdate(
      alertId,
      {
        acknowledged: true,
        acknowledgedBy,
        acknowledgedAt: new Date(),
        status: 'acknowledged',
      },
      { new: true }
    );
  } catch (err) {
    throw new Error(`Error acknowledging alert: ${err.message}`);
  }
};

const resolveAlert = async (alertId) => {
  try {
    return await Alert.findByIdAndUpdate(
      alertId,
      {
        resolvedAt: new Date(),
        status: 'resolved',
      },
      { new: true }
    );
  } catch (err) {
    throw new Error(`Error resolving alert: ${err.message}`);
  }
};

const getAlertStatistics = async () => {
  try {
    const alerts = await Alert.find();
    const statistics = {
      totalAlerts: alerts.length,
      criticalAlerts: alerts.filter((a) => a.severity === 'critical').length,
      highPriorityAlerts: alerts.filter((a) => a.severity === 'high').length,
      mediumPriorityAlerts: alerts.filter((a) => a.severity === 'medium').length,
      lowPriorityAlerts: alerts.filter((a) => a.severity === 'low').length,
      acknowledgedAlerts: alerts.filter((a) => a.acknowledged).length,
      pendingAlerts: alerts.filter((a) => !a.acknowledged).length,
    };
    return statistics;
  } catch (err) {
    throw new Error(`Error fetching statistics: ${err.message}`);
  }
};

module.exports = {
  createAlert,
  getAlerts,
  acknowledgeAlert,
  resolveAlert,
  getAlertStatistics,
};
