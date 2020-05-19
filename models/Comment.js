const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema(
	{
		body: {
			type: String,
			minLength: 2,
			maxLength: 255,
			trim: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'User is undefined'],
		},
		approved: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'edited_at',
		},
	}
);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
