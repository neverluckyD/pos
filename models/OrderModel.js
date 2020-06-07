const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var orderSchema = new Schema({
	customer: {
		type: { type: ObjectId, ref: "Customer" },
		required: true
	},
	productList: {
		type: [{
			product: { type: ObjectId, ref: "Product" },
			color: { type: ObjectId, ref: "Color" },
			quantity: { type: Number },
			unit: { type: ObjectId, ref: "Unit" }
		}],
		required: true
	},
	status: {
		type: Number,
		required: true,
		default: 1
	},
	dateAdded: { type: Date, default: Date.now },
	createdBy: { type: ObjectId, ref: "User" }
})

const Order = mongoose.model('Order', orderSchema);

module.exports = {
	Order
};