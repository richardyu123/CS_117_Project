var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.post('/', function(request, response){
  console.log(request.body);      // your JSON
  response.send(request.body);    // echo the result back
});

// Register User
router.post('/register', function(req, res){
	var email = req.body.email;
	var phone = req.body.phone;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('phone', 'Phone Number is required').notEmpty();
	req.checkBody('phone', 'Phone Number is not valid').isMobilePhone('en-US');
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		res.status(400).send('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			email: email,
			password: password,
			phone: phone,
			classes: []
		});

		User.getUserByEmail(email, function(err, user){
			if(err) throw err;
			if(!user){
				User.createUser(newUser, function(err, user){
					if(err) throw err;
					console.log(user);
				});

				res.status(200).send('Created user');
			} else {
				res.status(400).send('User already exists');
			}
		});
	}
});

router.post('/login', function(req, res) {
	var username = req.body.email;
	var password = req.body.password;
	User.getUserByEmail(username, function(err, user){
		if(err) throw err;
		if(!user){
			res.status(404).send('User not found');
		}

		User.comparePassword(password, user.password, function(err, isMatch){
			if(err) throw err;
			if(isMatch){
				res.status(200).send(user);
			} else {
				res.status(401).send('Invalid credentials');
			}
		});
	});
});

module.exports = router;