const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Load Tag model
const Tag = require('../models/Tag');

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

module.exports = router;
