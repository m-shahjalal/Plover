// dependencies
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { urlencoded, json } = require('express');

const middlewares = [
	cors(),
	urlencoded({ extended: true }),
	json(),
	cookieParser(),
];

module.exports = (app) => {
	middlewares.forEach((middleware) => app.use(middleware));
};
