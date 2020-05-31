var mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/pos'
const dbName = 'pos-api';

const con = mongoose.connect(dbURI, (error) => {
	if(error){
		console.log("Error " + error);
	}else{
		console.log("Connected successfully to server")
	}
});

module.exports = con;