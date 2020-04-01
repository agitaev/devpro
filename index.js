const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const app = express();
require('dotenv').config();
require('./db/mongoose');

const users = require('./routes/userRoutes');
const posts = require('./routes/postRoutes');
const tags = require('./routes/tagRoutes');
const reactions = require('./routes/reactionRoutes');
const recommender = require('./routes/recommenderRoutes');

// bodyparser middleware
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// serve assets in production environment
if (process.env.NODE_ENV === 'production') {
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`[server] server is running on http://127.0.0.1:${PORT}`);
});
