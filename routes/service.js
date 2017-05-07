var express = require('express');
var path = require('path');
var router = express.Router();
var multer = require('multer');
// var upload = multer({ dest: 'uploads/'});

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, 'public/uploads/service/')
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})
var upload = multer({ storage: storage })




//model
var Service = require('../models/service');

router.get('/find', function(req, res){
	Service.findallService(function(err, services){
		if(err) throw err;
		res.render('service/index',{title:'Service  List ',services});
	});
});




router.get('/delete/:_id',function(req,res){
	Service.deleteService(req.params._id, function(err,Services){
		if(err) throw err;
		req.flash('success_msg', 'Service Delete Sucessfully');
		 backURL=req.header('Referer') || '/';
		// do your thang
		res.redirect(backURL);

	});
});


router.get('/create',function(req,res){
	var title="Create Service ";
	res.render('service/create',{title});
});




// Register Service
router.post('/create', upload.single('service_image_path'), function(req, res){
	console.log(req.body); //form fields
	/* example output:
	{ title: 'abc' }
	 */
	console.log(req.file); //form files
	console.log(req.file.filename); //form files
	var _id = req.body._id;

	var service_name = req.body.service_name;
	var service_desc = req.body.service_desc;
	var service_min = req.body.service_min;
	var service_price = req.body.service_price;
	var service_stylists = req.body.service_stylists;
	var service_icon = req.body.service_icon;
	var service_image_path = req.file.filename;



	// Validation
	req.checkBody('service_name', 'Service Name is required').notEmpty();
	// req.checkBody('designation', 'Designation is required').isEmail();


	var errors = req.validationErrors();

	if(errors){
		console.log('e');
		res.render('service/create',{
			errors:errors
		});
	} else {
		console.log('su');
		var newService = new Service({
			service_name: service_name,
			service_desc:service_desc,
			service_min:service_min,
			service_price:service_price,
			service_stylists:service_stylists,
			service_icon:service_icon,
			service_image_path:service_image_path
		});

		console.log(newService);

		Service.createService(newService, function(err, service){
			if(err) throw err;
			console.log(service);
		});

		req.flash('success_msg', 'Service  Create Sucessfully');

		 backURL=req.header('Referer') || '/';
			  // do your thang
		res.redirect(backURL);
	}
});


router.get('/edit/:_id', function(req, res){
	Service.findServicebyId(req.params._id, function(err, service){
		if(err)
			res.send(err);
		res.render('service/edit',{service,title:"Edit Service "});
	});
});


router.post('/update', upload.single('service_image_path'), function(req, res){
	console.log(req.body); //form fields
	/* example output:
	{ title: 'abc' }
	 */
	console.log(req.file); //form files
	console.log(req.file.filename); //form files
	var _id = req.body._id;

	var service_name = req.body.service_name;
	var service_desc = req.body.service_desc;
	var service_min = req.body.service_min;
	var service_price = req.body.service_price;
	var service_stylists = req.body.service_stylists;
	var service_icon = req.body.service_icon;
	var service_image_path = req.file.filename;



	// Validation
	req.checkBody('service_name', 'Name is required').notEmpty();



	var errors = req.validationErrors();

	if(errors){
		console.log('e');
		res.render('service/create',{
			errors:errors
		});
	} else {
		console.log('su');
		var newService = new Service({
			service_name: service_name,
			service_desc:service_desc,
			service_min:service_min,
			service_price:service_price,
			service_stylists:service_stylists,
			service_icon:service_icon,
			service_image_path:service_image_path,
			_id:_id
		});


		console.log(newService);

		Service.updateService({_id:_id}, newService, function(err, service){
			if(err) throw err;
			console.log(service);
		});

		req.flash('success_msg', 'Service Update Sucessfully');

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
		res.redirect('/Services/login');
	}
}

// Service Api

router.get('/api/find', function(req, res){
	Service.findallService(function(err, services){
		if(err) throw err;
		res.json(services);
	});
});

router.get('/api/view/:_id', function(req, res){
	Service.findServicebyId(req.params._id, function(err, service){
		if(err) throw err;
		res.json(service);
	});
});


module.exports = router;

