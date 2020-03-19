const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();
require('./db/mongoose');

const users = require('./routes/userRoutes');
require('./models/Product');

// BodyParser middleware
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());
require('./routes/productRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	const path = require('path');
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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`[server] app running on http://127.0.0.1:${PORT}`);
});
