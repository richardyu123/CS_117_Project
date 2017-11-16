var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.post('/classes', function(req, res){
	var name = req.body.name;
	var url = req.body.url;

	req.checkBody('name', 'Class name is required').notEmpty();
	req.checkBody('url', 'Class url is required').notEmpty();

	var errors = req.validationErrors();
	if (errors){
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

module.exports = router;