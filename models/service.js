var mongoose = require('mongoose');

// Service Schema
var ServiceSchema = mongoose.Schema({
	service_name: {
		type: String,
		index:true
	},
	service_desc: {
		type: String
	},
	service_min: {
		type: String
	},
	service_price: {
		type: String
	},
	service_stylists: {
		type: String
	},
	service_icon: {
		type: String
	},
	service_image_path: {
		type: String
	},
	created_date: {
		 type: Date, default: Date.now
	}
});

 	// db.Services.insert({
	 // name:"New Alon",designation:"sdafsdf@gmail.com",facebook_link:"safsdf",twitter_link:"sdfksajfds",
 	// linkind_link:"Conmtact fino",image_path:"sdafsdfsdaf.jpg", created_date:ISODate("2014-10-01T00:00:00Z")});


var Service = module.exports = mongoose.model('Service', ServiceSchema);

module.exports.createService = function(newService, callback){
	        newService.save(callback);
	   }

module.exports.updateService=function(id,newService,callback){
	Service.findByIdAndUpdate(id,newService,callback);
}




module.exports.deleteService=function(id,callback){
	Service.findOneAndRemove(id,callback);
}

// Delete data

module.exports.findServicebyId=function(id,callback){
	Service.findById(id,callback);
}

module.exports.findallService=function(callback){
	Service.find(callback);
}

