// dependencies
const logger = require('./logger');

// module scaffold
const errors = {};

// log the error by winston logger
errors.log = (err) => {
  const errObj = { ...err };

  if (errObj instanceof Object) {
    logger.error(Object.keys(errObj).map((err) => errObj.msg));
  } else logger.error(errObj);
  return err;
};

// define not found error
errors.notFound = (req, res, next) => {
  const error = new Error('Page not found');
  error.status = 404;
  next(error);
};

// errors handling
errors.errorHandler = (error, req, res, next) => {
  errors.log(error);
  if (error.status === 404) {
    res.json({ Error: 'Page not found', ...error });
  } else {
    res.json({ Error: 'internal server error', ...error });
  }
};

// export module
module.exports = (app) => {
  for (let [key, value] of Object.entries(errors)) {
    app.use(value);
  }
};
