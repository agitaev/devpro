const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Load input validation
const validatePostInput = require('../validation/post');

// Load Post model
const Post = require('../models/Post');
const User = require('../models/User');

// @route GET api/posts/
// @desc Retrieve all posts
// @access Public
router.get('/', async (req, res) => {
	try {
		// retrieve only approved posts
		await Post.find({})
			.populate('author')
			.populate('tags')
			.populate('comments')
			.populate({
				path: 'comments',
				populate: { path: 'author', model: 'User' },
				options: { sort: { created_at: 'desc' } },
			})
			.sort({ created_at: 'desc' }) // newest on top
			.exec((err, posts) => {
				if (err) {
					console.log(err);
					res.send(400).send(err);
				} else {
					res.send(posts);
				}
			});
	} catch (e) {
		console.log(e);
		res.status(400).send({ error: 'bad request' });
	}
});

// @route POST api/posts/new
// @desc Create new post
// @access Public
router.post('/new', (req, res) => {
	// Form validation
	const { errors, isValid } = validatePostInput(req.body);
	const { author, title, subtitle, body, tags } = req.body;
	// console.log(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	Post.findOne({ title }).then((post) => {
		if (post) {
			return res
				.status(400)
				.json({ title: 'Post with such title already exists' });
		} else {
			const post = new Post({
				author,
				subtitle,
				title,
				body,
				tags,
			});
			try {
				post.save((err, model) => {
					if (err) console.log('[postRoutes:savePost]', err);
					model.populate('tags author', (err, post) => {
						if (err) console.log('[postRoutes]', err);
						res.status(201).send(post);
					});
				});
			} catch (e) {
				res.status(400).send({ error: 'bad request' });
			}
		}
	});
});

// @route POST api/posts/:postId/vote
// @desc Upvote/Downvote post
// @access public
router.post('/:postId([0-9a-fA-F]{24})/vote', async (req, res) => {
	const { userId } = req.body;
	const { postId } = req.params;

	try {
		await User.findOneAndUpdate(
			{ _id: userId },
			{ $addToSet: { voted_posts: postId } }
		).exec(async (error, response) => {
			if (error) {
				console.log('cannot find user', error);
				res.status(401).json(error);
			} else if (!response) {
				// if response is null, user already voted
				console.log('already voted', response);
				res.status(400).send({ error: 'already voted' });
			} else {
				await Post.findOneAndUpdate(
					{ _id: postId },
					{ $inc: { vote_count: 1 } },
					{ new: true }
				)
					.populate('tags')
					.populate('author')
					.exec((err, post) => {
						if (err) {
							console.log('cannot find post', err);
							res.status(400).json(err);
						} else {
							res.status(202).send(post);
						}
					});
			}
		});
	} catch (e) {
		console.log('caught an error', e);
		res.status(400).send(e);
	}
});

// @route GET api/posts/:id
// @desc Get single post by its ID
// @access Public
router.get('/:id([0-9a-fA-F]{24})', async (req, res) => {
	// const pattern = RegExp('^[0-9a-fA-F]{24}$');
	const { id } = req.params;
	// if (req.params.id.match(pattern) !== null) {
	try {
		await Post.findById(id)
			.populate('author')
			.populate('tags')
			.exec((err, post) => {
				if (err) {
					res.status(400).json(err);
				} else {
					res.status(200).send(post);
				}
			});
	} catch (e) {
		res.status(404).send({ error: 'not found' });
	}
	// }
});

// @route GET api/posts/trending
// @desc Fetch trending/popular posts
// @access public
router.get('/trending', async (req, res) => {
	try {
		await Post.find({})
			.populate('author')
			.populate('tags')
			.sort({ vote_count: -1 })
			.exec((err, posts) => {
				if (err) {
					res.status(404).json(err);
				} else {
					res.status(200).send(posts);
				}
			});
	} catch (e) {
		res.status(400).send({ error: 'unable to fetch trends' });
	}
});

// @route POST api/posts/approve
// @desc Approve post
// @access private
router.post('/approve', async (req, res) => {
	const { postId } = req.body;

	try {
		await Post.findOneAndUpdate(
			{ _id: postId },
			{ $set: { approved: true } },
			{ new: true }
		)
			.populate('author')
			.populate('tags')
			.populate('comments')
			.exec((err, post) => {
				if (err) console.log('[approvePost]', err);
				if (post) {
					res.status(202).send(post);
				}
			});
	} catch (e) {
		res.status(400).send({ error: 'unable to approve post' });
	}
});

// @route POST api/posts/decline
// @desc Decline post
// @access private
router.post('/decline', async (req, res) => {
	const { postId } = req.body;

	try {
		await Post.findOneAndDelete({ _id: postId }).exec((err) => {
			return err
				? console.log('[declinePost]', err)
				: res.status(200).send({ status: 200, msg: 'post deleted' });
		});
	} catch (e) {
		res.status(400).send({ error: 'unable to decline post' });
	}
});

module.exports = router;
