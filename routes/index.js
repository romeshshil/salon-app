var express = require('express');
var router = express.Router();
var Promise = require('promise');


var Team = require('../models/team');
var Service = require('../models/service');
var Forecast = require('../models/weather');
var Contact = require('../models/contact');
var resp;
var response;
var teams;
var services;
var weathers;
var contacts
router.get('/', function(req, res){

var promise = new Promise(function (resolve, reject) {
  Team.count({},function(err, teams){
  		if(err) reject(err);
    	else resolve(teams);
	});
}).then(setTeams)
.then(getServices)
.then(setServices)
.then(getWeathers)
.then(setWeathers)
.then(getContacts)
.then(setContacts)

res.render('index',{title:'Dashboard Heres ',teams,weathers,services,contacts});

});

function setTeams(data){
	teams = data;
}

function getServices(data){
	return new Promise(function (resolve, reject) {
  		Service.count({},function(err, services){
		if(err) reject(err);
    	else resolve(services);
		});
	});
}

function getContacts(data){
	return new Promise(function (resolve, reject) {
  		Contact.count({},function(err, contacts){
		if(err) reject(err);
    	else resolve(contacts);
		});
	});
}



function getWeathers(data){
	return new Promise(function (resolve, reject) {
	Forecast.get([23.8103, 90.4125], true, function(err, weathers) {
	  if(err) reject(err);
    	else resolve(weathers);
		});
	});
}

function setServices(data){
	services = data;
}

function setWeathers(data){
	weathers = data;
}

function setContacts(data){
	contacts = data;
}



// Get Homepage
router.get('/', function(req, res){

	res.render('index');


});


router.get('/rom', ensureAuthenticated, function(req, res){
	res.send("Hello romesh shil");
});



function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;