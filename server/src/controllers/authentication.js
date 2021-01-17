// dependencies
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const logger = require('../lib/logger');

// module scaffold
const auth = {};

// default signup controller
auth.signupGet = (req, res) => {
  res.json({
    message: 'Give your email and a strong password in request body',
  });
};

// signup route controller
auth.signupPost = async (req, res, next) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  if (!errors.isEmpty()) {
    console.log(errors.mapped());
    return res.status(409).json('something gone wrong');
  }
  const user = new User({
    email,
    password: hashPassword,
  });

  const data = await user.save();
  try {
    res.json({ message: 'user created successfully', data });
  } catch (err) {
    next(err);
  }
};

// default login route controller
auth.loginGet = (req, res) => {
  res.json({ message: 'Send email and password via request parameter' });
};

// login controller
auth.loginPost = (req, res) => {
  console.log(req.body);
  res.json({ message: 'this is post method' }); //TODO: have to implement things
};

// export modules
module.exports = auth;
