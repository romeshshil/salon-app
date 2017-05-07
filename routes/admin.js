var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('data', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/d', function(req, res, next) {
   res.render('users/login', { layout: false, title: 'Login' });
});
// GET home page. 
router.get('/data', function(req, res, next) {
   res.render('users/login', { title: 'Express' });
});

module.exports = router;
