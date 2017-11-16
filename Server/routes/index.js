var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/classes', function(req, res){
	res.render('index', {classes:req.user.classes});
});

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.redirect('/classes');
});

router.post('/classes', function(req, res){
	var name = req.body.name;
	var url = req.body.url;

	req.checkBody('name', 'Class name is required').notEmpty();
	req.checkBody('url', 'Class url is required').notEmpty();

	var errors = req.validationErrors();
	if(errors){
		res.render('index',{
			errors:errors,
			classes:req.user.classes
		});
	}
	else {
		console.log(req.body);
		if ('add-class' in req.body) {
			User.addClass(req.user._id, name, url,
				function(err, model) {
		        	if (err) console.log(err);
		        	res.redirect('/classes');
		    	});	
		}
		else if ('delete-class' in req.body) {
			res.redirect('/classes');
		}
	}
});

// Get Homepage
router.get('/settings', function(req, res){
	res.render('settings');
});

router.post('/settings',  function(req, res){

});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.render('home');
	}
}

module.exports = router;