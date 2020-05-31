const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../DB');
const autoIncrement = require('mongoose-auto-increment');

var productSchema = new Schema({
	productID: {
		type: Number,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	colors: {
		type: Array,
		required: false
	},
	description: {
		type: String,
		required: false
	},
	dateAdded: { type: Date, default: Date.now },
})

const Product = mongoose.model('Product', productSchema);
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, { model: 'Product', field: 'productID' });

module.exports = {
	Product
};