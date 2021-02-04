// dependencies
const logger = require('./logger');

// module scaffold
const errors = {};

// define not found error
errors.notFound = (req, res, next) => {
  const error = new Error('Page not found');
  error.status = 404;
  next(error);
};

// errors handling
errors.errorHandler = (error, req, res, next) => {
  if (error.status === 404) {
    logger.error(error.message);
    res.json({ Error: '404, page not found' });
  } else {
    logger.error(error.message);
    res.json({ Error: error.message });
  }
};

// export module
module.exports = (app) => {
  for (let [key, value] of Object.entries(errors)) {
    app.use(value);
  }
};
