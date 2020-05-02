const { importUsers, importTags, tagsToArray } = require('../utils');

const fetchRecs = async () => {
	let tags = [];

	importTags().then((res) => {
		res.map((tag) => tags.push(tag));
	});

	return await importUsers().then((res) => {
		console.log(res);
	});
};

fetchRecs().then(() => console.log('done'));
