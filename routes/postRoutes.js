const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Load Post model
const Post = require('../models/Post');

// @route GET api/posts/
// @desc Retrieve all posts
// @access Public
router.get('/', async (req, res) => {
	try {
		await Post.find({})
			.populate('author')
			.exec((err, posts) => {
				if (err) {
					throw new Error({ error: 'something just blew up' });
				} else {
					res.send(posts);
				}
			});
	} catch (e) {
		res.status(400).send({ error: 'bad request' });
	}
});

// @route GET api/posts/:id
// @desc Get single post by its ID
// @access Public
router.get('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const post = await Post.findById(id);

		if (!post) throw new Error();
		res.status(200).send(post);
	} catch (e) {
		res.status(404).send({ error: 'not found' });
	}
});

// @route POST api/posts/new
// @desc Create new post
// @access Public
router.post('/new', async (req, res) => {
	const { author, title, body } = req.body;
	const post = new Post({ author, title, body });

	try {
		await post.save();
		res.status(201).send(post);
	} catch (e) {
		res.status(400).send({ error: 'bad request' });
	}
});

module.exports = router;
