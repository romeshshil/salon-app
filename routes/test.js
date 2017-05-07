var express = require('express');
var router = express.Router();
var Promise = require('promise');


var Team = require('../models/team');
var Service = require('../models/service');
var resp;
var response;
var teams;
var services;
router.get('/', function(req, res){

var promise = new Promise(function (resolve, reject) {
  Team.count({},function(err, teams){
  		if(err) reject(err);
    	else resolve(teams);
	});
}).then(setTeams)
.then(getServices)
.then(setServices);

res.render('index',{title:'Dashboard Heres ',teams,services});

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

function setServices(data){
	services = data;
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