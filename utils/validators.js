const { body } = require('express-validator');

const validateRegister = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
];

const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const validateTestSubmission = [
  body('wpm')
    .isInt({ min: 0, max: 300 })
    .withMessage('Invalid WPM value'),
  
  body('accuracy')
    .isInt({ min: 0, max: 100 })
    .withMessage('Accuracy must be between 0 and 100'),
  
  body('correctChars')
    .isInt({ min: 0 })
    .withMessage('Correct characters must be positive'),
  
  body('duration')
    .isInt({ min: 1, max: 3600 })
    .withMessage('Duration must be between 1 and 3600 seconds')
];

module.exports = {
  validateRegister,
  validateLogin,
  validateTestSubmission
};