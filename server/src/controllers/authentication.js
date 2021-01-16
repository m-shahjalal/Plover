// dependencies
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const logger = require('../lib/logger');

// module scaffold
const auth = {};

// default controller
auth.signupGet = (req, res) => {
  res.json({
    message: 'Give your email and a strong password in request body',
  });
};

// signup route controller
auth.signupPost = async (req, res, next) => {
  const errors = validationResult(req);
  // console.log(errors);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    console.log(errors.mapped());
    return res.status(409).json('something gone wrong');
  }
  const user = new User({
    email,
    password,
  });
  user
    .save()
    .then((data) =>
      res.json({ message: 'user created successfully', data: data })
    )
    .catch((err) => {
      next(err);
    });
};

// export modules
module.exports = auth;
