const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create Schema
const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
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

UserSchema.virtual('posts', {
	ref: 'Post',
	localField: '_id',
	foreignField: 'author'
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
