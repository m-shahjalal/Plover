// dependencies
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { urlencoded, json } = require('express');

const auth = require('./auth');

module.exports = (app) => {
	app.use(cors());
	app.use(urlencoded({ extended: true }));
	app.use(json());
	app.use(cookieParser());
	app.use(auth);
};
