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
			required: true,
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
				ref: 'tag'
				// required: [true, 'Undefined tag']
			}
		],
		saved_posts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'post'
			}
		],
		voted_posts: [
			{
				post: {
					type: Schema.Types.ObjectId,
					ref: 'post'
				},
				action: Number
			}
		],
		verified: {
			type: Boolean,
			default: false
		},
		confirmation_token: String,
		allow_personalized_feed: {
			type: Boolean,
			default: false
		},
		allow_notifications: {
			type: Boolean,
			default: false
		},
		allow_dark_mode: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'edited_at'
		}
	}
);

UserSchema.virtual('created_posts', {
	ref: 'post',
	localField: '_id',
	foreignField: 'author'
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
