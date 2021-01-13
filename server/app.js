import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();
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
        console.log(`Server listening on http://localhost:${PORT}`);
      });
    } else {
      console.log(err);
    }
  }
);
