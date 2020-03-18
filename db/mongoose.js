const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(
	'mongodb://127.0.0.1:27017/devpro_v2',
	{
		useNewUrlParser: true,
		useFindAndModify: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	},
	error => {
		if (!error) {
			console.log('[mongodb] connected successfully');
		} else {
			console.log(`[mongodb] error on connection: ${error}`);
		}
	}
);