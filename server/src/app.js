require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const logger = require('./lib/logger');

const PORT = process.env.PORT || 8080;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

mongoose.connect(
  process.env.DBURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      app.listen(PORT, () => {
        logger.info(`Server listening on http://localhost:${PORT}`);
      });
    } else {
      console.log(err);
    }
  }
);
