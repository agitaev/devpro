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
		await Post.find({})
			.populate('author')
			.populate('tags')
			.sort({ created_at: 'desc' }) // newest on top
			.exec((err, posts) => {
				if (err) {
					res.send(400).send(err);
				} else {
					res.send(posts);
				}
			});
	} catch (e) {
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

	if (!isValid) {
		return res.status(400).json(errors);
	}

	Post.findOne({ title }).then(post => {
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
				tags
			});
			try {
				post
					.save()
					.then(post => res.status(201).send(post))
					.catch(err => console.log(err));
			} catch (e) {
				res.status(400).send({ error: 'bad request' });
			}
		}
	});
});

// @route POST api/posts/:postId/action
// @desc Upvote/Downvote post
// @access public
router.post('/:postId([0-9a-fA-F]{24})/action', async (req, res) => {
	const { action, user } = req.body;
	const { postId } = req.params;
	const count = action === 'upvote' ? 1 : -1;

	try {
		await User.findOneAndUpdate(
			{ _id: user.id, 'voted_posts.post': { $ne: postId } },
			{
				$push: {
					voted_posts: { post: postId, action: count > 0 ? 1 : 0 }
				}
			}
		).exec(async (error, response) => {
			if (error) {
				res.status(400).json(error);
			} else if (!response) {
				// if response is null, user already voted
				res.status(400).send({ error: 'already voted' });
			} else {
				await Post.findOneAndUpdate(
					{ _id: postId },
					{ $inc: { vote_count: count } },
					{ new: true }
				).exec((error, post) => {
					if (error) {
						res.status(400).json(error);
					} else {
						res.status(202).send(post);
					}
				});
			}
		});
	} catch (e) {
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

module.exports = router;
