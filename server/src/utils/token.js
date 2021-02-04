const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'test';

module.exports = (user) => {
	return jwt.sign(user, secret, { expiresIn: '3d' });
};
