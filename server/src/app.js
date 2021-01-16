require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const logger = require('./lib/logger');
const middlewares = require('./middlewares');
const routes = require('./routes');
const errors = require('./lib/errors');

const app = express();

middlewares(app);
routes(app);
errors(app);

mongoose
  .connect(process.env.DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const port = process.env.PORT || 8080;
    app.listen(port, () => logger.info(`Server listening on port ${port}`));
  })
  .catch((err) => logger.error(err));
