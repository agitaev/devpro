const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create Schema
const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			immutable: true
		},
		username: {
			type: String,
			// required: true,
			unique: true,
			immutable: true,
			trim: true
		},
		email: {
			type: String,
			required: true
		},
		bio: {
			type: String,
			maxlength: 160,
			trim: true
		},
		password: {
			type: String,
			required: true
		},
		followed_tags: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Tag'
				// required: [true, 'Undefined tag']
			}
		],
		saved_posts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Post'
			}
		],
		voted_posts: [
			{
				post: {
					type: Schema.Types.ObjectId,
					ref: 'Post'
				},
				action: Number
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

UserSchema.virtual('posts', {
	ref: 'Post',
	localField: '_id',
	foreignField: 'author'
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
