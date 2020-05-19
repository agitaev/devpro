const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Import models
const User = require('../models/User');
const Post = require('../models/Post');
const Tag = require('../models/Tag');

// @route POST api/reactions/tag/:id/subscribe
// @desc Subscribe/Follow tag
// @access Public
router.post('/tag/:tagId([0-9a-fA-F]{24})/subscribe', async (req, res) => {
	const { tagId } = req.params;
	const { userId } = req.body;

	try {
		// check if user is authorized
		await User.findById(userId).exec(async (error, response) => {
			if (!response) {
				res.status(401).json({ error: 'unauthorized' });
			} else {
				// check if tag exists with such id
				await Tag.findById(tagId).exec(async (error, response) => {
					if (!response) {
						res.status(404).json({ error: 'tag not found' });
					} else {
						await User.findOneAndUpdate(
							{ _id: userId },
							{ $addToSet: { followed_tags: tagId } }
						).exec((error, response) => {
							if (error) {
								res.status(400).json(err);
							} else {
								res.status(202).send(response);
							}
						});
					}
				});
			}
		});
	} catch (error) {
		res.status(400).send({ error });
	}
});

// @route POST api/reactions/post/:postId/save
// @desc Save post
// @access Public
router.post('/post/:postId([0-9a-fA-F]{24})/save', async (req, res) => {
	const { postId } = req.params;
	const { userId } = req.body;

	try {
		await User.findById(userId).exec(async (error, user) => {
			if (!user) {
				res.status(401).json({ error: 'unauthorized' });
			} else {
				await Post.findById(postId).exec(async (error, post) => {
					if (!post) {
						res.status(404).json({ error: 'post not found' });
					} else {
						await User.findOneAndUpdate(
							{ _id: userId },
							{ $addToSet: { saved_posts: postId } },
							{ new: true }
						)
							.populate('saved_posts')
							.exec((error, response) => {
								if (error) {
									res.status(400).json(err);
								} else {
									res.status(202).send(response);
								}
							});
					}
				});
			}
		});
	} catch (error) {
		res.status(400).send({ error });
	}
});

module.exports = router;
