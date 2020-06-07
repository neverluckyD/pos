const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userRoleSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	privilege: {
		type: Array,
		required: true
	},
	status: {
		type: Number,
		required: true,
		default: 1
	},
	dateAdded: { type: Date, default: Date.now },
})

const UserRole = mongoose.model('UserRole', userRoleSchema);

module.exports = {
	UserRole
};