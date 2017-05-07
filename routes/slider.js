var express = require('express');
var path = require('path');
var router = express.Router();
var multer = require('multer');
// var upload = multer({ dest: 'uploads/'});

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, 'public/uploads/slider/')
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})
var upload = multer({ storage: storage })



//model
var Slider = require('../models/slider');

router.get('/find', function(req, res){
	Slider.findallSlider(function(err, sliders){
		if(err) throw err;
		res.render('slider/index',{title:'slider List ',sliders});
	});
});




router.get('/delete/:_id',function(req,res){
	Slider.deleteSlider(req.params._id, function(err,sliders){
		if(err) throw err;
		req.flash('success_msg', 'Slider Member Delete Sucessfully');
		 backURL=req.header('Referer') || '/';
		// do your thang
		res.redirect(backURL);

	});
});


router.get('/create',function(req,res){
	var title="Create Slider Image";
	res.render('slider/create',{title});
});




// Register Slider
router.post('/create', upload.single('slider_image_path'), function(req, res){
	console.log(req.body); //form fields
	/* example output:
	{ title: 'abc' }
	 */
	console.log(req.file); //form files
	console.log(req.file.filename); //form files
	var _id = req.body._id;

	var slider_title = req.body.slider_title;
	var slider_desc = req.body.slider_desc;
	var slider_image_path = req.file.filename;



	// Validation
	req.checkBody('slider_title', 'Name is required').notEmpty();
	// req.checkBody('designation', 'Designation is required').isEmail();


	var errors = req.validationErrors();

	if(errors){
		console.log('e');
		res.render('slider/create',{
			errors:errors
		});
	} else {
		console.log('su');
		var newSlider = new Slider({
			slider_title: slider_title,
			slider_desc:slider_desc,
			slider_image_path:slider_image_path
		});

		console.log(newSlider);

		Slider.createSlider(newSlider, function(err, Slider){
			if(err) throw err;
			console.log(Slider);
		});

		req.flash('success_msg', 'Slider Image Insert Sucessfully');

		 backURL=req.header('Referer') || '/';
			  // do your thang
		res.redirect(backURL);
	}
});


router.get('/edit/:_id', function(req, res){
	Slider.findSliderbyId(req.params._id, function(err, slider){
		if(err)
			res.send(err);
		res.render('slider/edit',{slider,title:"Edit Slider Memeber"});
	});
});


router.post('/update', upload.single('slider_image_path'), function(req, res){
	console.log(req.body); //form fields
	/* example output:
	{ title: 'abc' }
	 */
	console.log(req.file); //form files
	console.log(req.file.filename); //form files
	var _id = req.body._id;

	var slider_title = req.body.slider_title;
	var slider_desc = req.body.slider_desc;
	var slider_image_path = req.file.filename;



	// Validation
	req.checkBody('slider_title', 'slider name is required').notEmpty();
	// req.checkBody('designation', 'Designation is required').isEmail();


	var errors = req.validationErrors();

	if(errors){
		console.log('e');
		res.render('slider/create',{
			errors:errors
		});
	} else {
		console.log('su');
		var newSlider = new Slider({
			slider_title: slider_title,
			slider_desc:slider_desc,
			slider_image_path:slider_image_path,
			_id:_id
		});

		console.log(newSlider);

		Slider.updateSlider({_id:_id}, newSlider, function(err, slider){
			if(err) throw err;
			console.log(slider);
		});

		req.flash('success_msg', 'Slider Member Update Sucessfully');

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
		res.redirect('/sliders/login');
	}
}


/// Api 

// router.get('/api/find', function(req, res){
// 	Slider.findallSlider(function(err, sliders){
// 		if(err) throw err;
// 		res.json(sliders);
// 	});
// });


module.exports = router;