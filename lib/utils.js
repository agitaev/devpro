const mongoose = require('mongoose');
const Tag = require('../models/Tag');
const User = require('../models/User');

module.exports = {
	importTags: async () => {
		return await Tag.find({}, null, { sort: { title: 1 } });
	},
	importUsers: async () => {
		return await User.find({}).populate('followed_tags');
	},
	tagsToArray: (tagArr) => {
		let data = [];
		for (i = 0; i < tagArr.length; i++) {
			let tagList = [];
			for (k = 0; k < tagArr[i].followed_tags.length; k++) {
				tagList.push(tagArr[i].followed_tags[k].title);
			}

			data.push(tagList.sort());
		}

		return data;
	},
};
