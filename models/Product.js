const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
	name: String,
	description: String
});

mongoose.model('products', ProductSchema);
