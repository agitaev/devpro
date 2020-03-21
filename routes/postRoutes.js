const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Load input validation
const validatePostInput = require('../validation/post');

// Load Post model
const Post = require('../models/Post');

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
					throw new Error();
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

// @route POST api/posts/:id
// @desc Upvote/Downvote post
// @access public
router.post('/:id([0-9a-fA-F]{24})/action', async (req, res) => {
	const { action } = req.body;
	const { id } = req.params;

	if (action === 'upvote') {
		try {
			await Post.findOneAndUpdate(
				{ _id: id },
				{ $inc: { vote_count: 1 } },
				{ new: true }
			).exec((err, post) => {
				if (err) {
					res.status(400).json(err);
				} else {
					res.status(202).send(post);
				}
			});
		} catch (e) {
			res.status(400).send(e);
		}
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
					throw new Error(err);
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
