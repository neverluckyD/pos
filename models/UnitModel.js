const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var unitSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	status: {
		type: Number,
		required: true,
		default: 1
	},
	dateAdded: { type: Date, default: Date.now },
})

const Unit = mongoose.model('Unit', unitSchema);

module.exports = {
	Unit
};