const Router = require('express').Router();
const auth = require('../controllers/authentication');
const loginValidator = require('../validators/loginValidator');

Router.get('/', auth.loginGet);
Router.post('/', loginValidator, auth.loginPost);
//
module.exports = Router;
