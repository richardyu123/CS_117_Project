var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	email: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	phone: {
		type: String
	},
	provider: {
		type: String
	},
	classes: {
		type: Array
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByEmail = function(email, callback){
	var query = {email: email};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

module.exports.addClass = function(id, name, url, callback){
	var classToAdd = {'name':name, 'url':url};
	User.findByIdAndUpdate(id, {$push: {classes: classToAdd}}, {safe: true, upsert: true}, callback);
}