const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  jwt.verify('jwt', process.env.SECRET || 'test', (err, token) => {
    if (err) throw new Error('You are not allowed to browse this route');
    console.log(token);
  });
  next();
};
