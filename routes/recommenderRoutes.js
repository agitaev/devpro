const express = require('express');
const router = express.Router();

// recommender engine function algorithm
const { fetchRecommendations } = require('../lib/brain');

// @route GET api/recommender/
// @desc Fetch recommendations for user based on tags he is following
// @access Public
router.post('/', async (req, res) => {
	const { tags } = req.body;

	await fetchRecommendations(tags).then(async result => {
		await res.status(201).send(result);
	});
});

module.exports = router;
