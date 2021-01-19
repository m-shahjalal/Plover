const Router = require('express').Router();
const auth = require('../controllers/authentication');

Router.get('/', auth.logout);

module.exports = Router;
