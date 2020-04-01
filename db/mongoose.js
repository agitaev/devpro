const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.set('debug', true);

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

mongoose.connect(
	'mongodb://admin:agitaev5494@ds125041.mlab.com:25041/devpro_v2',
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
