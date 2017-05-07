var express = require('express');
var path = require('path');
var router = express.Router();


//model
var Contact = require('../models/contact');

router.get('/find', function(req, res){
	Contact.findallContact(function(err, contacts){
		if(err) throw err;
		res.render('contact/index',{title:'contact List ',contacts});
	});
});


router.get('/test', function(req, res){
	Contact.count({},function(err, contacts) {
		if(err) throw err;
		res.render('contact/index',{title:'contact List ',contacts});
	});
});


router.get('/delete/:_id',function(req,res){
	Contact.deleteContact(req.params._id, function(err,contacts){
		if(err) throw err;
		req.flash('success_msg', 'Contact  Delete Sucessfully');
		 backURL=req.header('Referer') || '/';
		// do your thang
		res.redirect(backURL);

	});
});


router.get('/create',function(req,res){
	var title="Create Contact Inforamtion";
	res.render('contact/create',{title});
});




//  Contact
router.post('/create', function(req, res){

	var name = req.body.name;
	var email = req.body.email;
	var subject = req.body.subject;
	var message = req.body.message;

	// Validation
	// req.checkBody('name', 'Name is required').notEmpty();
	// req.checkBody('designation', 'Designation is required').isEmail();


	var errors = req.validationErrors();

	if(errors){
		console.log('e');
		res.render('contact/create',{
			errors:errors
		});
	} else {
		console.log('su');
		var newContact = new Contact({
			name: name,
			email:email,
			subject:subject,
			message:message
		});

		console.log(newContact);

		Contact.createContact(newContact, function(err, contact){
			if(err) throw err;
			console.log(contact);
		});

		req.flash('success_msg', 'Contact Informaiton Added Sucessfully');

		 backURL=req.header('Referer') || '/';
			  // do your thang
		res.redirect(backURL);
	}
});


router.get('/edit/:_id', function(req, res){
	Contact.findContactbyId(req.params._id, function(err, contact){
		if(err)
			res.send(err);
		res.render('contact/edit',{contact,title:"Edit Contact Memeber"});
	});
});


router.post('/update', function(req, res){

	var _id = req.body._id;
	var name = req.body.name;
	var email = req.body.email;
	var subject = req.body.subject;
	var message = req.body.message;



	// Validation
	req.checkBody('name', 'Contact name is required').notEmpty();
	// req.checkBody('designation', 'Designation is required').isEmail();


	var errors = req.validationErrors();

	if(errors){
		console.log('e');
		res.render('contact/create',{
			errors:errors
		});
	} else {
		console.log('su');
		var newContact = new Contact({
			name: name,
			email:email,
			subject:subject,
			message:message,
			_id:_id
		});

		console.log(newContact);

		Contact.updateContact({_id:_id}, newContact, function(err, Contact){
			if(err) throw err;
			console.log(Contact);
		});

		req.flash('success_msg', 'Contact Informaiton Update Sucessfully');

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
		res.redirect('/Contacts/login');
	}
}


/// Api 

router.post('/api/create',function(req,res){

	var newContact= {
		 name:req.body.name,
		 email:req.body.email,
		 subject:req.body.subject,
		 message:req.body.message
	}

	Contact.createContact(newContact, function(err, contact){
		if(err) throw err;
		res.json(contact);
	});
});


module.exports = router;