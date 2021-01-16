// dependencies
const { urlencoded, json } = require('express');

module.exports = (app) => {
  app.use(urlencoded({ extended: true }));
  app.use(json());
};
