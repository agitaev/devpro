const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const Comment = require('../models/Comment');

// @route POST api/comments/new
// @desc Post new comment
// @access private
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

// @route POST api/comments/approve
// @desc Approve comment
// @access private
router.post('/approve', async (req, res) => {
	const { commentId } = req.body;

	try {
		await Comment.findOneAndUpdate(
			{ _id: commentId },
			{ $set: { approved: true } },
			{ new: true }
		)
			.populate('author')
			.exec((err, comment) => {
				if (err) console.log('[approveComment]', err);
				if (comment) {
					res.status(202).send(comment);
				}
			});
	} catch (e) {
		res.status(400).send({ error: 'unable to approve comment' });
	}
});

// @route POST api/comments/decline
// @desc Decline comment
// @access private
router.post('/decline', async (req, res) => {
	const { commentId } = req.body;

	try {
		await Comment.findOneAndDelete({ _id: commentId }).exec((err) => {
			return err
				? console.log('[declineComment]', err)
				: res.status(200).send({ status: 200, msg: 'comment deleted' });
		});
	} catch (e) {
		res.status(400).send({ error: 'something just blew up down in the line' });
	}
});

module.exports = router;
