// dependencies
const auth = require('./auth');
const post = require('./post');

// routes array
const routers = [
	{
		path: '/auth',
		controller: auth,
	},
	{
		path: '/post',
		controller: post,
	},
];

// module export
module.exports = (app) => {
	routers.forEach((route) => {
		app.use(route.path, route.controller);
	});
};
