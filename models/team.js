var mongoose = require('mongoose');

// Team Schema
var TeamSchema = mongoose.Schema({
	name: {
		type: String,
		index:true
	},
	designation: {
		type: String
	},
	facebook_link: {
		type: String
	},
	twitter_link: {
		type: String
	},
	linkind_link: {
		type: String
	},
	team_image_path: {
		type: String
	},
	created_date: {
		 type: Date, default: Date.now
	}
});

 	// db.teams.insert({
	 // name:"New Alon",designation:"sdafsdf@gmail.com",facebook_link:"safsdf",twitter_link:"sdfksajfds",
 	// linkind_link:"Conmtact fino",image_path:"sdafsdfsdaf.jpg", created_date:ISODate("2014-10-01T00:00:00Z")});


var Team = module.exports = mongoose.model('Team', TeamSchema);

module.exports.createTeam = function(newTeam, callback){
	        newTeam.save(callback);
	   }

module.exports.updateTeam=function(id,newTeam,callback){
	Team.findByIdAndUpdate(id,newTeam,callback);
}




module.exports.deleteTeam=function(id,callback){
	Team.findOneAndRemove(id,callback);
}

// Delete data

module.exports.findTeambyId=function(id,callback){
	Team.findById(id,callback);
}

module.exports.findallTeam=function(callback){
	Team.find(callback);
}


