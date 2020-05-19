const brain = require('brain.js');
const { importUsers, importTags, tagsToArray } = require('./utils');
const chalk = require('chalk');

// 1. build array of followed tags by all users, where length
//		of an array is equal to the total number of existing tags
// 2. push them into the array
// 3. feed the network
// 4. check if output contains any of tags from database
// 5. find tags from string output and push to new array distinct values

module.exports.fetchRecommendations = async (input) => {
	console.log('_______________________________');
	console.log(chalk.cyan(`input: ${input}`));
	let tags = [];

	importTags().then((res) => {
		res.map((tag) => tags.push(tag));
	});

	return await importUsers().then((res) => {
		let trainingData = tagsToArray(res);

		console.log(
			chalk.magenta('sorted tags followed by users:\n'),
			trainingData
		);

		// running algorithm
		// {hiddenLayers: [2, 2]}
		const net = new brain.recurrent.LSTM({ hiddenLayers: [2, 2] });
		net.maxPredictionLength = 1000;
		net.train(trainingData, {
			iterations: 5000,
			learningRate: 0.05,
			errorThresh: 0.02,
			momentum: 0.3,
			callback: (res) => (res.error > 0.1 ? console.log(res) : null),
		});

		const result = net.run(input);
		console.log(chalk.yellow(`layers:		${net.hiddenLayers}`));
		console.log(chalk.yellow(`result:		${result}`));

		let recList = [];

		tags.map((tag) => {
			if (result.indexOf(tag.title) !== -1) {
				recList.push(tag);
			}
		});

		console.log(chalk.green(`output:\n${recList}`));
		console.log('_______________________________');
		return recList;
	});
};
