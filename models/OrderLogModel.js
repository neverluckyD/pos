const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var orderLogSchema = new Schema({
	orderId: { type: ObjectId, ref: "Order" },
	productList: [{
		product: { type: ObjectId, ref: "Product" },
		color: { type: ObjectId, ref: "Color" },
		quantity: { type: Number },
		unit: { type: ObjectId, ref: "Unit" }
	}],
	staffName: {
		type: String,
		required: true
	},
	staffPhone: {
		type: String,
		required: true
	},
	deliverName: {
		type: String,
		required: true
	},
	deliverPhone: {
		type: String,
		required: true
	},
	orderStatus: {
		type: Number,
		required: true
	},
	dateAdded: { type: Date, default: Date.now },
})

const OrderLog = mongoose.model('OrderLog', orderLogSchema);

module.exports = {
	OrderLog
};