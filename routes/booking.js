var express = require('express');
var path = require('path');
var router = express.Router();


//model
var Team = require('../models/team');
var Service = require('../models/service');
var Booking = require('../models/booking');

// router.get('/find', function(req, res){
// 	Booking.findallBooking(function(err, Bookings){
// 		if(err) throw err;
// 		res.render('Booking/index',{title:'Booking  List ',Bookings});
// 	});
// });




// router.get('/delete/:_id',function(req,res){
// 	Booking.deleteBooking(req.params._id, function(err,Bookings){
// 		if(err) throw err;
// 		req.flash('success_msg', 'Booking Delete Sucessfully');
// 		 backURL=req.header('Referer') || '/';
// 		// do your thang
// 		res.redirect(backURL);

// 	});
// });


router.get('/create',function(req,res){
	var title="Create Booking ";
	var TotalObject  = { teams: null }
	function getTeamMember( callback ){ 	
	 Team.find({}, 'name', function(err, teams){
	      if(err) return next(err);
	       callback(err,teams);
	       console.log("Member oboject: ", teams );
	    });	
	}
	
  	getTeamMember( function(err, members ){
  		var AllMembers = members.map(( team )=> {
  			return { 'name':team.name, 'id': team.id }
  		} )
  		TotalObject.teams = AllMembers ;
		//console.log( "Member is ", member );
	 }) 


  	console.log("all: ", TotalObject ); // null bola vi 
  	//Hmm evabe Aschronuse data bahire newa jai na 

});







// Register Booking
router.post('/create',  function(req, res){
	console.log(req.body); //form fields
	/* example output:
	{ title: 'abc' }
	 */
	console.log(req.file); //form files
	console.log(req.file.filename); //form files
	var _id = req.body._id;

	var Booking_name = req.body.Booking_name;
	var Booking_desc = req.body.Booking_desc;
	var Booking_min = req.body.Booking_min;
	var Booking_price = req.body.Booking_price;
	var Booking_stylists = req.body.Booking_stylists;
	var Booking_icon = req.body.Booking_icon;
	var Booking_image_path = req.file.filename;



	// Validation
	req.checkBody('Booking_name', 'Booking Name is required').notEmpty();
	// req.checkBody('designation', 'Designation is required').isEmail();


	var errors = req.validationErrors();

	if(errors){
		console.log('e');
		res.render('Booking/create',{
			errors:errors
		});
	} else {
		console.log('su');
		var newBooking = new Booking({
			Booking_name: Booking_name,
			Booking_desc:Booking_desc,
			Booking_min:Booking_min,
			Booking_price:Booking_price,
			Booking_stylists:Booking_stylists,
			Booking_icon:Booking_icon,
			Booking_image_path:Booking_image_path
		});

		console.log(newBooking);

		Booking.createBooking(newBooking, function(err, Booking){
			if(err) throw err;
			console.log(Booking);
		});

		req.flash('success_msg', 'Booking  Create Sucessfully');

		 backURL=req.header('Referer') || '/';
			  // do your thang
		res.redirect(backURL);
	}
});


router.get('/edit/:_id', function(req, res){
	Booking.findBookingbyId(req.params._id, function(err, Booking){
		if(err)
			res.send(err);
		res.render('Booking/edit',{Booking,title:"Edit Booking "});
	});
});


router.post('/update',  function(req, res){
	console.log(req.body); //form fields
	/* example output:
	{ title: 'abc' }
	 */
	console.log(req.file); //form files
	console.log(req.file.filename); //form files
	var _id = req.body._id;

	var Booking_name = req.body.Booking_name;
	var Booking_desc = req.body.Booking_desc;
	var Booking_min = req.body.Booking_min;
	var Booking_price = req.body.Booking_price;
	var Booking_stylists = req.body.Booking_stylists;
	var Booking_icon = req.body.Booking_icon;
	var Booking_image_path = req.file.filename;



	// Validation
	req.checkBody('Booking_name', 'Name is required').notEmpty();



	var errors = req.validationErrors();

	if(errors){
		console.log('e');
		res.render('Booking/create',{
			errors:errors
		});
	} else {
		console.log('su');
		var newBooking = new Booking({
			Booking_name: Booking_name,
			Booking_desc:Booking_desc,
			Booking_min:Booking_min,
			Booking_price:Booking_price,
			Booking_stylists:Booking_stylists,
			Booking_icon:Booking_icon,
			Booking_image_path:Booking_image_path,
			_id:_id
		});


		console.log(newBooking);

		Booking.updateBooking({_id:_id}, newBooking, function(err, Booking){
			if(err) throw err;
			console.log(Booking);
		});

		req.flash('success_msg', 'Booking Update Sucessfully');

		 backURL=req.header('Referer') || '/';
			  // do your thang
		res.redirect(backURL);
	}
});





function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/Booking/login');
	}
}

module.exports = router;