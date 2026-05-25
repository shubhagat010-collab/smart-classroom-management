// String Utility Functions
const generateUniqueId = (prefix = 'ID') => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const truncateString = (str, maxLength) => {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  }
  return str;
};

const removeSpecialCharacters = (str) => {
  return str.replace(/[^\w\s]/gi, '');
};

module.exports = {
  generateUniqueId,
  slugify,
  capitalizeFirstLetter,
  truncateString,
  removeSpecialCharacters,
};
