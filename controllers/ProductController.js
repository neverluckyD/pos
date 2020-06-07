const Product = require("../models/ProductModel");
const { body,validationResult,sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
const { constants } = require("../helpers/constants");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

function ProductData(data) {
	this.id 					= data._id;
	this.productCode	= data.productCode;
	this.description 	= data.description;
	this.name 				= data.name;
	this.colors 			= data.colors;
	this.status 			= data.status;
	this.dateAdded 		= data.dateAdded;
}

exports.ProductList = [
	auth,
	function (req, res) {
		try{
			productData = Product.find().then(products => {
				if(products.length > 0)
					return apiResponse.successResponseWithData(res, "Operation success", products);
				else
					return apiResponse.successResponseWithData(res, "Operation success", []);
			});
		}catch(err){
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.ProductDetail = [
	auth,
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id))
			return apiResponse.validationErrorWithData(res, "Invalid id", {});

		try{
			Product.findOne({_id: req.params.id}).then(product => {
				if(product != null){
					let productData = new ProductData(product);
					return apiResponse.successResponseWithData(res, "Operation success", productData);
				}else
					return apiResponse.notFoundResponse(res, "Not found");
			})
		}catch{
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.addProduct = [
	auth,
	body("name", "Product name must not be empty.").isLength({ min: 3 }).trim(),
	body("colors", "Please choose at least one color").isLength({ min: 1 }).trim(),
	body("productCode", "Product code must not be empty.").isLength({ min: 1 }).trim().custom(value => {
		return Product.findOne({productCode: value}).then(product => {
			if(product)
				return Promise.reject("Product already exist with this code.");
		});	
	}),
	sanitizeBody("*").escape(),
	(req, res) => {
		try{
			const errors = validationResult(req);
			if (!errors.isEmpty()) 
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			else{
				var product = new Product({
					productCode: 	req.body.productCode,
					name: 				req.body.name,
					colors: 			req.body.colors,
					description: 	req.body.description,
					status: 			req.body.status
				});
				product.save(err => {
					if(err)
						return apiResponse.ErrorResponse(res, err);
					let productData = new ProductData(product);
					return apiResponse.successResponseWithData(res,"Product Added Successfully.", productData);
				})
			}
		}catch{
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.editProduct = [
	auth,
	body("name", "Product name must not be empty.").isLength({ min: 3 }).trim(),
	body("colors", "Please choose at least one color").isLength({ min: 1 }).trim(),
	sanitizeBody("*").escape(),
	(req, res) => {
		try{
			const errors = validationResult(req);
			if(!errors.isEmpty())
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			if(!mongoose.Types.ObjectId.isValid(req.params.id))
				return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");

			var product = new Product({
				productCode: 	req.body.productCode,
				name: 				req.body.name,
				colors: 			req.body.colors,
				description: 	req.body.description,
				status: 			req.body.status
			});
			Product.findById(req.params.id, (err, foundProduct) => {
				if(foundProduct == null)
					return apiResponse.notFoundResponse(res,"Product not found");
				else{
					Product.findByIdAndUpdate(req.params.id, product, {},function (err) {
						if (err) { 
							return apiResponse.ErrorResponse(res, err); 
						}else{
							let productData = new ProductData(product);
							return apiResponse.successResponseWithData(res,"Product update Success.", productData);
						}
					});
				}
			})
		}catch{
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.deleteProduct = [
	auth,
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id))
			return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
		
		try {
			Product.findById(req.params.id, function (err, foundProduct) {
				if(foundProduct === null)
					return apiResponse.notFoundResponse(res,"Product not exists with this id");
				else{
					Product.findByIdAndRemove(req.params.id,function (err) {
						if (err) 
							return apiResponse.ErrorResponse(res, err); 
						else
							return apiResponse.successResponse(res,"Product delete Success.");
					});
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];