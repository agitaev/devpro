const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const morgan = require('morgan');
const forceSsl = require('./config/ssl');
const app = express();

// setup mongodb databse
require('dotenv').config();
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

const users = require('./routes/userRoutes');
const posts = require('./routes/postRoutes');
const tags = require('./routes/tagRoutes');
const reactions = require('./routes/reactionRoutes');
const recommender = require('./routes/recommenderRoutes');

// http request header logger
app.use(morgan('dev'));

// bodyparser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/tags', tags);
app.use('/api/reactions', reactions);
app.use('/api/recommender', recommender);

// serve assets in production environment
if (process.env.NODE_ENV === 'production') {
	// redirect to https
	app.use(forceSsl);

	app.use(express.static(path.join(__dirname, 'client/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`[server] server is running on http://127.0.0.1:${PORT}`);
});
