const { body } = require('express-validator');
const User = require('../models/User');

module.exports = [
  body('email')
    .isEmail()
    .withMessage('Please provide a registered email')
    .custom((email) => {
      return User.findOne({ email }).then((user) => {
        if (!user) {
          return Promise.reject('There is no user with that email');
        }
      });
    }),

  body('password')
    .isEmpty()
    .withMessage('please enter a password')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 characters'),
];
