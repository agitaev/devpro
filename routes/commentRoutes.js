const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const Comment = require('../models/Comment');

router.post('/new', async (req, res) => {
	const { body, author, post } = req.body;
	const comment = new Comment({ body, author: author.id });

	try {
		await comment.save(async (err, model) => {
			if (err) console.log('[commentRoutes:commentSave]', err);

			// update Post, add comment
			if (model) {
				await Post.findOneAndUpdate(
					{ _id: post._id },
					{ $addToSet: { comments: model._id } }
				).exec(async (error, response) => {
					if (error) console.log('[commentRoutes:updatePost]', error);

					// @TODO better workaround without requerying
					if (response)
						model.populate('author', (err, payload) => {
							res.status(201).send(payload);
						});
				});
			}
		});
	} catch (e) {
		res.status(400).send({ error: 'bad request' });
	}
});

module.exports = router;
