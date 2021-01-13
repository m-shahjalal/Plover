import express from 'express';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
