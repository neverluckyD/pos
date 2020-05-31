const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../DB');
const autoIncrement = require('mongoose-auto-increment');

var userSchema = new Schema({
	userID: {
		type: Number,
		required: true,
		unique: true
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
		type: String,
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
})

const User = mongoose.model('User', userSchema);
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userID' });

module.exports = {
	User
};