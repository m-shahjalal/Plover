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
  // .matches(
  //   /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
  // )
  // .withMessage(
  //   'password maut contain at least one upper case, one lower case, one digit and one special character'
  // ),

  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
];
