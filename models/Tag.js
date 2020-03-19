const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema(
	{
		title: {
			type: String,
			lowercase: true,
			trim: true,
			required: true
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'edited_at'
		}
	}
);

tagSchema.virtual('posts', {
	ref: 'Post',
	localField: 'name',
	foreignField: 'tags'
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
