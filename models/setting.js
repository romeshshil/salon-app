var mongoose = require('mongoose');

// Setting Schema
var SettingSchema = mongoose.Schema({
	salon_name: {
		type: String,
		index:true
	},
	salon_email: {
		type: String
	},
	salon_facebook: {
		type: String
	},
	salon_twitter: {
		type: String
	},
	salon_contactinfo: {
		type: String
	},
	salon_logo_path: {
		type: String
	},
	salon_phone: {
		type: String
	},
	salon_maplat: {
			type: String
	},
	salon_maplong: {
		type: String
	}
});

// db.settings.insert({
// 	salon_name:"New Alon",salon_email:"sdafsdf@gmail.com",salon_facebook:"safsdf",salon_twitter:"sdfksajfds",
// 	salon_contactinfo:"Conmtact fino",salon_logo_path:"sdafsdfsdaf.jpg",salon_phone:"sdafsdf",
// 	salon_maplat:"sdafsdfsd5524af",salon_maplong:'sdfasdf.psfang'
// })


var Setting = module.exports = mongoose.model('Setting', SettingSchema);

module.exports.createSetting = function(newSetting, callback){
	        newSetting.save(callback);
	   }

module.exports.updateSetting=function(id,newSetting,callback){
	Setting.findByIdAndUpdate(id,newSetting,callback);
}


// Delete data

module.exports.deleteSetting=function(id,callback){
	Setting.findOneAndRemove(id,callback);
}

// Delete data

// module.exports.findSetting=function(id,callback){
// 	Setting.findById(id,callback);
// }

module.exports.findSetting=function(callback){
	Setting.find(callback);
}

