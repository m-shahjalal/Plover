// dependencies
const mongoose = require('mongoose');
const { validationResult, Result } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const logger = require('../lib/logger');
const jwtToken = require('../utils/token');

// module scaffold
const auth = {};

// default signup controller
auth.signupGet = (req, res) => {
	res.json({
		message: 'Give your email and a strong password in request body',
	});
};

// signup route controller
auth.signupPost = async (req, res, next) => {
	const errors = validationResult(req);
	const { email, password } = req.body;
	try {
		const hashPassword = await bcrypt.hash(password, 10);

		if (!errors.isEmpty()) {
			// console.log(errors);
			return res.status(409).json('something gone wrong');
		}
		const user = new User({
			email,
			password: hashPassword,
		});
		const data = await user.save();
		res.json({ message: 'user created successfully', data });
	} catch (err) {
		next(err);
	}
};

// default login route controller
auth.loginGet = (req, res) => {
	res.json({ message: 'Send email and password via request parameter' });
};

// login controller
auth.loginPost = async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) return next({ message: 'No user found' });
	const hashPassword = await bcrypt.compare(password, user.password);
	if (!hashPassword) return next({ message: 'Password does not match' });

	const jwt = await jwtToken({ id: user._id, email: user.email });
	console.log('this is token by create token', jwt);

	res.set('Authorization', 'Bearer ' + jwt);
	res.json({ message: 'Login successful', user, jwt });
};

// logout controller
auth.logout = (req, res) => {
	const errors = validationResult(req);
	if (req.cookies.jwt) {
		res.cookie('jwt', '', { maxAge: 1 });
		res.json({ message: 'logout successful' });
	}
	res.json({ Error: 'there is no login user' });
};

// export modules
module.exports = auth;
