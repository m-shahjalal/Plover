require('dotenv').config();
const express = require('express');

const mongoose = require('./lib/dbConnect');
const logger = require('./lib/logger');
const middlewares = require('./middlewares');
const routes = require('./routes');
const errors = require('./lib/errors');
const authorization = require('./utils/userBind');

const app = express();
const port = process.env.PORT || 5000;

middlewares(app);
authorization(app);
routes(app);
errors(app);

mongoose(app.listen(port, logger.info(`Server listening on port ${port}`)));
