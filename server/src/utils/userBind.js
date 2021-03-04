const jwt = require('jsonwebtoken');
const logger = require('../lib/logger');
const secret = process.env.SECRET || 'test';

module.exports = (app) => {
	app.use('*', (req, res, next) => {
		const jwtToken =
			req.headers && req.headers.authorization
				? req.headers.authorization.split(' ')[1]
				: null;

		if (jwtToken) {
			try {
				const token = jwt.verify(jwtToken, secret);
				req.user = token;
				logger.info('Authorization successful');
			} catch (error) {
				logger.error(error.message);
				req.user = null;
				logger.error('Authorization failed');
			}
		} else {
			req.user = null;
			logger.warn('There is no user to bind with Request');
		}
		next();
	});
};
