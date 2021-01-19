// dependencies
const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');

// Default home route
const home = (req, res) => {
  res.json({ message: 'Hello world' });
};

// routes array
const routers = [
  {
    path: '/signup',
    controller: signup,
  },
  {
    path: '/login',
    controller: login,
  },
  {
    path: '/logout',
    controller: logout,
  },
  {
    path: '/',
    controller: home,
  },
];

// module export
module.exports = (app) => {
  routers.forEach((route) => {
    app.use(route.path, route.controller);
  });
};
