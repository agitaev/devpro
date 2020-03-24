const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Load Tag model
const Tag = require('../models/Tag');

// @route GET api/tags/
// @desc Retrieve all tags
// @access Public
router.get('/', async (req, res) => {
	try {
		await Tag.find({}).exec((err, tags) => {
			if (err) {
				res.send(400).send(err);
			} else {
				res.send(tags);
			}
		});
	} catch (e) {
		res.status(400).send({ error: 'bad request' });
	}
});

// @route POST api/tags/new
// @desc Create a new tag
// @access Public
router.post('/new', async (req, res) => {
	const { title } = req.body;
	const tag = new Tag({ title });

	try {
		await tag.save(err => console.log(err));
		res.status(201).send(tag);
	} catch (e) {
		res.status(400).send({ error: 'bad request' });
	}
});

// @route GET api/tags/:title
// @desc Get tag details by its name
// @access public
router.get('/:title', async (req, res) => {
	const { title } = req.params;
	try {
		const tag = await Tag.find({ title }, (err, tag) => {
			if (tag.length === 0) {
				res.status(404).send({ tags: `${title}` });
			} else {
				res.send(tag);
			}
		});
	} catch (e) {
		res.status(404).send({ error: 'not found' });
	}
});

module.exports = router;
