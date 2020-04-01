const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: [true, 'Title is required'],
			minLength: 10,
			maxlength: 255
		},
		subtitle: {
			type: String,
			trim: true,
			maxlength: 255
		},
		body: {
			type: String,
			trim: true,
			required: [true, 'Body is required'],
			minLength: 30
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: [true, 'Undefined user']
		},
		vote_count: {
			type: Number,
			default: 0
		},
		tags: [
			{
				type: Schema.Types.ObjectId,
				ref: 'tag'
				// required: [true, 'Undefined tag']
			}
		]
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'edited_at'
		}
	}
);

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
