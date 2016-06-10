var driver = require('./db/mongoose');
var EventEmitter = require('events');  
var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
	name: String,
	password: String 
});
var User = mongoose.model('users', UserSchema);


class UserStore extends EventEmitter {

	getAll() {
		return User.find();
	}
	
	getUserById (id) {
		return User.findOnce({ _id: id });
	}

	getUserByName (name) {
		return User.findOnce({ name });
	}

	upsert (userData) {
		console.log(userData);
		var isNew = userData.id == null;
		var user = new User(userData);
		return user.save().then(user => { 
			this.emit('new', user);
			return user;
		});
	}
};

module.exports = UserStore;