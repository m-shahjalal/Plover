const jwt = require('jsonwebtoken');
const logger = require('../lib/logger');
const secret = process.env.SECRET || 'test';

module.exports = (req, res, next) => {
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
			logger.warn('Authorization failed');
		}
	} else {
		req.user = null;
		logger.warn('Authorization failed');
	}
	next();
};
