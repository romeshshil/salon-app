var express = require('express');
var path = require('path');
var router = express.Router();
var multer = require('multer');
// var upload = multer({ dest: 'uploads/'});

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, 'public/uploads/')
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})
var upload = multer({ storage: storage })




//model
var Setting = require('../models/setting');

router.get('/update', function(req, res){
	Setting.findOne({_id:'58fe47f46d7c45d4bb4fb584'}, function(err, setting){
		if(err)
			res.send(err);
		res.render('setting/update',{setting:setting});
	});
});


router.get('/find', function(req, res){
	Setting.findOne({_id:'58fe47f46d7c45d4bb4fb584'},function(err, seting){
		if(err) throw err;
		res.json(seting);
	});
});




// Register Setting
router.post('/update', upload.single('salon_logo_path'), function(req, res){
	console.log(req.body); //form fields
	/* example output:
	{ title: 'abc' }
	 */
	console.log(req.file); //form files
	console.log(req.file.filename); //form files
	var _id = req.body._id;

	var salon_name = req.body.salon_name;
	var salon_email = req.body.salon_email;
	var salon_facebook = req.body.salon_facebook;
	var salon_twitter = req.body.salon_twitter;
	var salon_contactinfo = req.body.salon_contactinfo;
	var salon_logo_path = req.file.filename;
	var salon_phone = req.body.salon_phone;
	var salon_maplat = req.body.salon_maplat;
	var salon_maplong = req.body.salon_maplong;

	// Validation
	req.checkBody('salon_name', 'Name is required').notEmpty();
	req.checkBody('salon_email', 'Email is required').isEmail();


	var errors = req.validationErrors();

	if(errors){
		console.log('e');
		res.render('setting/update',{
			errors:errors
		});
	} else {
		console.log('su');
		var newSetting = new Setting({
			salon_name: salon_name,
			salon_email:salon_email,
			salon_facebook:salon_facebook,
			salon_twitter:salon_twitter,
			salon_contactinfo:salon_contactinfo,
			salon_logo_path:salon_logo_path,
			salon_phone:salon_phone,
			salon_maplat:salon_maplat,
			salon_maplong:salon_maplong,
			_id:_id
		});

		console.log(newSetting);

		Setting.updateSetting({_id:_id},newSetting, function(err, Setting){
			if(err) throw err;
			console.log(Setting);
		});

		req.flash('success_msg', 'You data update');

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
		res.redirect('/Settings/login');
	}
}


router.get('/api/find/', function(req, res){
	Setting.findSetting({_id:'58fe47f46d7c45d4bb4fb584'}, function(err, setting){
		if(err) throw err;
		res.json(setting);
	});
});





module.exports = router;