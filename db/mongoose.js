const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.set('debug', true);
mongoose.connect(
	process.env.MONGODB_URI,
	{
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
		useCreateIndex: true,
		serverSelectionTimeoutMS: 5000
	},
	error => {
		if (!error) {
			console.log('[mongodb] connected successfully');
		} else {
			console.log(`[mongodb] error on connection: ${error}`);
		}
	}
);
