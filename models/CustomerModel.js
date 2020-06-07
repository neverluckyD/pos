const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var customerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: false
	},
	type: {
		type: Number,
		required: true,
		default: 1
	},
	status: {
		type: Number,
		required: true,
		default: 1
	},
	dateAdded: { type: Date, default: Date.now },
})

const Customer = mongoose.model('Customer', customerSchema);

module.exports = {
	Customer
};