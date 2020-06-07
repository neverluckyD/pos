const User = require('../models/UserModel');
const bcrypt = require("bcrypt");
const { body,validationResult,sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
const { constants } = require("../helpers/constants");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

function userData(data) {
	this.id 					= data._id;
	this.userName			= data.userName;
	this.email 				= data.email;
	this.name 				= data.name;
	this.role 				= data.role;
	this.phone 				= data.phone;
	this.address 			= data.address;
	this.status 			= data.status;
	this.dateAdded 		= data.dateAdded;
}

exports.userList = (req, res) => {
	auth,
	function (req, res) {
		try{
			userData = user.find().then(users => {
				if(users.length > 0)
					return apiResponse.successResponseWithData(res, "Operation success", users);
				else
					return apiResponse.successResponseWithData(res, "Operation success", []);
			});
		}catch(err){
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
}

exports.userDetail = [
	auth,
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id))
			return apiResponse.validationErrorWithData(res, "Invalid id", {});

		try{
			User.findOne({_id: req.params.id}).then(User => {
				if(User != null){
					let UserData = new UserData(User);
					return apiResponse.successResponseWithData(res, "Operation success", userData);
				}else
					return apiResponse.notFoundResponse(res, "Not found");
			})
		}catch{
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.addUser = [
	auth,
	body("userName", "User name must not be empty.").isLength({ min: 1 }).trim(),
	body("password", "Password must not be empty or less than 6 characters.").isLength({ min: 6 }).trim(),
	body("role", "Please choose at least one user role.").isLength({ min: 3 }).trim(),
	body("email", "Email must not be empty.").isLength({ min: 1 }).trim()
		.isEmail().withMessage("Email must be a valid email address.").custom(value => {
		return User.findOne({email: value}).then(user => {
			if(user)
				return Promise.reject("Email already exist.");
		});	
	}),
	sanitizeBody("*").escape(),
	(req, res) => {
		try{
			const errors = validationResult(req);
			if (!errors.isEmpty()) 
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			else{
				bcrypt.hash(req.body.password,10,function(err, hash) {
					var user = new User({
						userName: req.body.userName,
						name: 		req.body.name,
						email: 		req.body.email,
						role: 		req.body.role,
						phone: 		req.body.phone,
						address: 	req.body.address,
						status: 	req.body.status,
						password: hash
					});
					user.save(err => {
						if(err)
							return apiResponse.ErrorResponse(res, err);
						let userData = new UserData(user);
						return apiResponse.successResponseWithData(res,"User Added Successfully.", userData);
					});
				});
			}
		}catch{
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.editUser = [];

exports.deleteUser = [];
