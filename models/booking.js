var mongoose = require('mongoose');

// booking Schema
var bookingSchema = mongoose.Schema({
	booking_date: {
		type: Date,
	},
	booking_time: {
		type: String
	},
	booking_service: {
		type: String
	},
	booking_person: {
		type: String
	},
	booking_user_name: {
		type: String
	},
	booking_phone: {
		type: String
	},
	booking_email: {
		type: String
	},
	created_date: {
		 type: Date, default: Date.now
	}
});

 	// db.bookings.insert({
	 // name:"New Alon",designation:"sdafsdf@gmail.com",facebook_link:"safsdf",twitter_link:"sdfksajfds",
 	// linkind_link:"Conmtact fino",image_path:"sdafsdfsdaf.jpg", created_date:ISODate("2014-10-01T00:00:00Z")});


var booking = module.exports = mongoose.model('booking', bookingSchema);

module.exports.createbooking = function(newbooking, callback){
	        newbooking.save(callback);
	   }

module.exports.updatebooking=function(id,newbooking,callback){
	booking.findByIdAndUpdate(id,newbooking,callback);
}




module.exports.deletebooking=function(id,callback){
	booking.findOneAndRemove(id,callback);
}

// Delete data

module.exports.findbookingbyId=function(id,callback){
	booking.findById(id,callback);
}

module.exports.findallbooking=function(callback){
	booking.find(callback);
}

