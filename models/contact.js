var mongoose = require('mongoose');

// Contact Schema
var ContactSchema = mongoose.Schema({
	name: {
		type: String,
		index:true
	},
	email: {
		type: String
	},
	subject: {
		type: String
	},
	message: {
		type: String
	},
	created_date: {
		 type: Date, default: Date.now
	}
});

 	// db.Contacts.insert({
	 // name:"New Alon",designation:"sdafsdf@gmail.com",facebook_link:"safsdf",twitter_link:"sdfksajfds",
 	// linkind_link:"Conmtact fino",image_path:"sdafsdfsdaf.jpg", created_date:ISODate("2014-10-01T00:00:00Z")});


var Contact = module.exports = mongoose.model('Contact', ContactSchema);

module.exports.createContact = function(newContact, callback){
	        newContact.save(callback);
	   }

module.exports.updateContact=function(id,newContact,callback){
	Contact.findByIdAndUpdate(id,newContact,callback);
}




module.exports.deleteContact=function(id,callback){
	Contact.findOneAndRemove(id,callback);
}

// Delete data

module.exports.findContactbyId=function(id,callback){
	Contact.findById(id,callback);
}

module.exports.findallContact=function(callback){
	Contact.find(callback);
}


