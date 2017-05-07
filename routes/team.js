var express = require('express');
var path = require('path');
var router = express.Router();
var multer = require('multer');
// var upload = multer({ dest: 'uploads/'});

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, 'public/uploads/team/')
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})
var upload = multer({ storage: storage })



//model
var Team = require('../models/team');

// Team.count({}, function( err, count){
//     console.log( "Number of users:", count );
// })


router.get('/find', function(req, res){
	Team.findallTeam(function(err, teams){
		if(err) throw err;
		res.render('team/index',{title:'Team Member List ',teams});
	});
});




router.get('/delete/:_id',function(req,res){
	Team.deleteTeam(req.params._id, function(err,Teams){
		if(err) throw err;
		req.flash('success_msg', 'Team Member Delete Sucessfully');
		 backURL=req.header('Referer') || '/';
		// do your thang
		res.redirect(backURL);

	});
});


router.get('/create',function(req,res){
	var title="Create Team Member";
	res.render('team/create',{title});
});




// Register Team
router.post('/create', upload.single('team_image_path'), function(req, res){
	console.log(req.body); //form fields
	/* example output:
	{ title: 'abc' }
	 */
	console.log(req.file); //form files
	console.log(req.file.filename); //form files
	var _id = req.body._id;

	var name = req.body.name;
	var designation = req.body.designation;
	var facebook_link = req.body.facebook_link;
	var twitter_link = req.body.twitter_link;
	var linkind_link = req.body.linkind_link;
	var team_image_path = req.file.filename;



	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	// req.checkBody('designation', 'Designation is required').isEmail();


	var errors = req.validationErrors();

	if(errors){
		console.log('e');
		res.render('team/create',{
			errors:errors
		});
	} else {
		console.log('su');
		var newTeam = new Team({
			name: name,
			designation:designation,
			facebook_link:facebook_link,
			twitter_link:twitter_link,
			linkind_link:linkind_link,
			team_image_path:team_image_path
		});

		console.log(newTeam);

		Team.createTeam(newTeam, function(err, team){
			if(err) throw err;
			console.log(team);
		});

		req.flash('success_msg', 'Team Member Insert Sucessfully');

		 backURL=req.header('Referer') || '/';
			  // do your thang
		res.redirect(backURL);
	}
});


router.get('/edit/:_id', function(req, res){
	Team.findTeambyId(req.params._id, function(err, team){
		if(err)
			res.send(err);
		res.render('team/edit',{team,title:"Edit Team Memeber"});
	});
});


router.post('/update', upload.single('team_image_path'), function(req, res){
	console.log(req.body); //form fields
	/* example output:
	{ title: 'abc' }
	 */
	console.log(req.file); //form files
	console.log(req.file.filename); //form files
	var _id = req.body._id;

	var name = req.body.name;
	var designation = req.body.designation;
	var facebook_link = req.body.facebook_link;
	var twitter_link = req.body.twitter_link;
	var linkind_link = req.body.linkind_link;
	var team_image_path = req.file.filename;



	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	// req.checkBody('designation', 'Designation is required').isEmail();


	var errors = req.validationErrors();

	if(errors){
		console.log('e');
		res.render('team/create',{
			errors:errors
		});
	} else {
		console.log('su');
		var newTeam = new Team({
			name: name,
			designation:designation,
			facebook_link:facebook_link,
			twitter_link:twitter_link,
			linkind_link:linkind_link,
			team_image_path:team_image_path,
			_id:_id
		});

		console.log(newTeam);

		Team.updateTeam({_id:_id}, newTeam, function(err, team){
			if(err) throw err;
			console.log(team);
		});

		req.flash('success_msg', 'Team Member Update Sucessfully');

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
		res.redirect('/Teams/login');
	}
}


/// Api 

router.get('/api/find', function(req, res){
	Team.findallTeam(function(err, teams){
		if(err) throw err;
		res.json(teams);
	});
});


module.exports = router;