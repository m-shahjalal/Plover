// dependencies
const cookieParser = require('cookie-parser');
const { urlencoded, json } = require('express');

const auth = require('./auth');

module.exports = (app) => {
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(cookieParser());
};
