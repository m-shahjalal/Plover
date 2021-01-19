const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'test';

module.exports = (id) => {
  const token = jwt.sign(
    { id },
    secret,
    { expiresIn: 60 * 60 * 24 * 7 },
    (err, token) => {
      if (err) throw new Error('Failed to sign in');
      console.log(token);
    }
  );
};
