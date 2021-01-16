const signup = require('./signup');

module.exports = (app) => {
  app.use('/signup', signup);
  app.get('/', (req, res) => {
    res.send('Hello world');
  });
};
