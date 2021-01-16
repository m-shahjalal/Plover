const Router = require('express').Router();
const auth = require('../controllers/authentication');
const signupValidator = require('../validators/signupValidator.js.js');

Router.get('/', auth.signupGet);
Router.post('/', signupValidator, auth.signupPost);

module.exports = Router;
