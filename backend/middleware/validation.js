// Input Validation Middleware
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const validateStudentId = (studentId) => {
  return studentId && studentId.trim().length > 0;
};

const validateClassroomId = (classroomId) => {
  return classroomId && classroomId.trim().length > 0;
};

const validateInputs = (validationRules) => {
  return (req, res, next) => {
    const errors = [];

    for (const [field, rules] of Object.entries(validationRules)) {
      const value = req.body[field];

      if (rules.required && !value) {
        errors.push(`${field} is required`);
      }

      if (rules.type === 'email' && value && !validateEmail(value)) {
        errors.push(`${field} must be a valid email`);
      }

      if (rules.type === 'password' && value && !validatePassword(value)) {
        errors.push(`${field} must be at least 6 characters`);
      }

      if (rules.minLength && value && value.length < rules.minLength) {
        errors.push(`${field} must be at least ${rules.minLength} characters`);
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  };
};

module.exports = {
  validateEmail,
  validatePassword,
  validateStudentId,
  validateClassroomId,
  validateInputs,
};
