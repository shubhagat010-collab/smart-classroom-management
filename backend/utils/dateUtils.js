// Date Utility Functions
const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

const getStartOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const getEndOfDay = (date) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

const getStartOfMonth = (date) => {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
};

const getEndOfMonth = (date) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  d.setHours(23, 59, 59, 999);
  return d;
};

const getDaysDifference = (date1, date2) => {
  const ms = Math.abs(date2 - date1);
  return Math.floor(ms / (1000 * 60 * 60 * 24));
};

module.exports = {
  formatDate,
  getStartOfDay,
  getEndOfDay,
  getStartOfMonth,
  getEndOfMonth,
  getDaysDifference,
};
