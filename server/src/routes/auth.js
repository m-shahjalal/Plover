const Router = require('express').Router();
const auth = require('../controllers/authentication');
const loginValidator = require('../validators/loginValidator');
const signupValidator = require('../validators/signupValidator.js');

Router.get('/signup', auth.signupGet);
Router.post('/signup', signupValidator, auth.signupPost);

Router.get('/login', auth.loginGet);
Router.post('/login', loginValidator, auth.loginPost);

Router.get('/logout', auth.logout);

module.exports = Router;
