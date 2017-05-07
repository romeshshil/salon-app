var mongoose = require('mongoose');

// Slider Schema
var SliderSchema = mongoose.Schema({
	slider_title: {
		type: String,
		index:true
	},
	slider_desc: {
		type: String
	},
	slider_image_path: {
		type: String
	},
	created_date: {
		 type: Date, default: Date.now
	}
});

 	// db.Sliders.insert({
	 // name:"New Alon",designation:"sdafsdf@gmail.com",facebook_link:"safsdf",twitter_link:"sdfksajfds",
 	// linkind_link:"Conmtact fino",image_path:"sdafsdfsdaf.jpg", created_date:ISODate("2014-10-01T00:00:00Z")});


var Slider = module.exports = mongoose.model('Slider', SliderSchema);

module.exports.createSlider = function(newSlider, callback){
	        newSlider.save(callback);
	   }

module.exports.updateSlider=function(id,newSlider,callback){
	Slider.findByIdAndUpdate(id,newSlider,callback);
}




module.exports.deleteSlider=function(id,callback){
	Slider.findOneAndRemove(id,callback);
}

// Delete data

module.exports.findSliderbyId=function(id,callback){
	Slider.findById(id,callback);
}

module.exports.findallSlider=function(callback){
	Slider.find(callback);
}


