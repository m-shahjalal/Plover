// dependencies
const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const post = require('./post');

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
    path: '/post',
    controller: post,
  },
];

// module export
module.exports = (app) => {
  routers.forEach((route) => {
    app.use(route.path, route.controller);
  });
};
