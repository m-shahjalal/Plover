const Router = require('express').Router();
const auth = require('../controllers/authentication');

Router.get('/', auth.loginGet);
Router.post('/', auth.loginPost);

module.exports = Router;
