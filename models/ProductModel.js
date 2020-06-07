const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({
	productCode: {
		type: Number,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	colors: {
		type: [{ type: ObjectId, ref: 'Color' }],
		required: false
	},
	units: {
		type: [{ type: ObjectId, ref: "Unit" }],
		require: true
	},
	description: {
		type: String,
		required: false
	},
	status: {
		type: Number,
		required: true,
		default: 1
	},
	dateAdded: { type: Date, default: Date.now },
})

const Product = mongoose.model('Product', productSchema);

module.exports = {
	Product
};