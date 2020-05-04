const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const sendConfirmationEmail = require('../config/mailer');

// Load input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

// Load User model
const User = require('../models/User');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
	// Form validation
	const { errors, isValid } = validateRegisterInput(req.body);
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			return res.status(400).json({ email: 'Email already exists' });
		} else {
			// check if username is unique
			User.findOne({ username: req.body.username }).then((user) => {
				if (user) {
					return res.status(400).json({ username: 'Username is taken' });
				} else {
					const newUser = new User({
						name: req.body.name,
						email: req.body.email,
						username: req.body.username,
						password: req.body.password,
						followed_tags: req.body.followed_tags,
					});

					// Hash password before saving in database
					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if (err) throw err;
							// email confirmation
							newUser.confirmation_token = jwt.sign(
								{ email: req.body.email },
								keys.secretOrKey,
								{
									expiresIn: 31556926, // 1 year in seconds
								}
							);
							// end email confirmation
							newUser.password = hash;
							newUser
								.save()
								.then((user) => {
									res.json(user);
									sendConfirmationEmail({
										user,
										url: `http://localhost:3000/email_confirmation?token=${user.confirmation_token}&email=${user.email}`,
									})
										.then((email) => console.log(email))
										.catch((mailError) => console.log(mailError));
								})
								.catch((err) => console.log(err));
						});
					});
				}
			});
		}
	});
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
	// Form validation
	const { errors, isValid } = validateLoginInput(req.body);
	const { db } = User;
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const { email, password } = req.body;

	// db state 0 => disconnected		HTTP 504
	// db state 1 => connected			HTTP 200
	// db state 2 => connecting
	// db state 3 => disconnecting

	const checkDbState = setInterval(() => {
		switch (db.readyState) {
			case 0: {
				res
					.status(504)
					.send({ server: 'Unable to connect. Please try again later.' });
				clearInterval(checkDbState);
			}
			case 1: {
				// Find user by email
				User.findOne({ email })
					.populate('followed_tags')
					.populate('saved_posts')
					.populate('created_posts')
					.populate('voted_posts')
					.populate('comments')
					.exec((err, user) => {
						// Check if user exists
						if (!user) {
							return res.status(404).json({ emailnotfound: 'Email not found' });
						}

						// Check password
						bcrypt.compare(password, user.password).then((isMatch) => {
							if (isMatch) {
								// User matched
								// Create JWT Payload
								const payload = {
									id: user.id,
									name: user.name,
									username: user.username,
									saved_posts: user.saved_posts,
									voted_posts: user.voted_posts,
									created_posts: user.created_posts,
									comments: user.comments,
									followed_tags: user.followed_tags,
									allow_personalized_feed: user.allow_personalized_feed,
									allow_notifications: user.allow_notifications,
									allow_dark_mode: user.allow_dark_mode,
								};

								// Sign token
								jwt.sign(
									payload,
									keys.secretOrKey,
									{
										expiresIn: 31556926, // 1 year in seconds
									},
									(err, token) => {
										res.json({
											success: true,
											token: 'Bearer ' + token,
										});
									}
								);
							} else {
								return res
									.status(400)
									.json({ passwordincorrect: 'Password incorrect' });
							}
						});
					});

				clearInterval(checkDbState);
			}
			default:
				return;
		}
	}, 1000);
});

// @route GET api/users/:id
// @desc Get user by ID
// @access Public
router.get('/:id', (req, res) => {
	const { id } = req.params;

	User.findById(id)
		.populate('followed_tags')
		.populate('saved_posts')
		.populate('created_posts')
		.populate('voted_posts')
		.exec((err, user) => {
			if (err) res.status(400).send(err);
			res.send(user);
		});
});

// @route POST api/users/email_confirmation
// @desc Update user property to CONFIRMED
// @access Public
router.post('/email_confirmation', (req, res) => {
	const { token } = req.body;

	User.findOneAndUpdate(
		{ confirmation_token: token },
		{ confirmation_token: '', verified: true },
		{ new: true }
	).exec((err, user) => {
		if (err) {
			res.status(400).send(err);
		} else {
			res.send(user);
		}
	});
});

// @route POST api/users/toggle_allow_notifications
// @desc Toggle notification settings
// @access public
router.post('/toggle_allow_notifications', (req, res) => {
	console.log(req.body);
	const { userId } = req.body;

	User.findOne({ _id: userId }, (error, user) => {
		user.allow_notifications = !user.allow_notifications;
		user.save((error, user) => {
			if (!error) {
				console.log(user);
				res.send(user);
			} else {
				console.log(error);
			}
		});
	});
});

// @route POST api/users/toggle_allow_personalized_feed
// @desc Toggle personalized feed settings
// @access public
router.post('/toggle_allow_personalized_feed', (req, res) => {
	const { userId } = req.body;

	User.findOne({ _id: userId }, (error, user) => {
		user.allow_personalized_feed = !user.allow_personalized_feed;
		user.save((error, user) => {
			if (!error) {
				console.log(user);
				res.send(user);
			}
		});
	});
});

// @route POST api/users/toggle_dark_mode
// @desc Toggle dark mode settings
// @access public
router.post('/toggle_dark_mode', (req, res) => {
	const { userId } = req.body;

	User.findOne({ _id: userId }, (error, user) => {
		user.allow_dark_mode = !user.allow_dark_mode;
		user.save((error, user) => {
			if (!error) {
				console.log(user);
				res.send(user);
			}
		});
	});
});

module.exports = router;
