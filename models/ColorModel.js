const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var colorSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	colorCode: {
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

const Color = mongoose.model('Color', colorSchema);

module.exports = {
	Color
};