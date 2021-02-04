// dependencies
const { body } = require('express-validator');
const User = require('../models/User');

module.exports = [
  body('email')
    .isEmail()
    .custom((email) => {
      return User.findOne({ email }).then((user) => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
    }),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be grater then 6 character'),
];
