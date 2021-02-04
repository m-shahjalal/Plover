const mongoose = require('mongoose');
module.exports = (callback) => {
	mongoose
		.connect(process.env.DBURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		})
		.then(callback())
		.catch((err) => logger.error(err));
};
