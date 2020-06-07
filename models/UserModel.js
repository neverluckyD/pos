const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
	userName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: false
	},
	role: {
		type: [{ type: ObjectId, ref: "UserRole" }],
		required: true
	},
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: false
	},
	status: {
		type: Number,
		required: true,
		default: 1
	},
	address: {
		type: String,
		required: false
	},
	dateAdded: { type: Date, default: Date.now },
	createdBy: { type: ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema);

module.exports = {
	User
};