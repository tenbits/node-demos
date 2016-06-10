var passport = require('passport'),
	LocalStrategy = require('passport-local'),
	store = require('../store/IUsersStore'),
	md5 = require('crypto').createHash('md5');


passport.use(new LocalStrategy(function(username, password, done){
	console.log(username);
	store.findUserByName(username).then(function(user) {
		console.log('Passport got', user);
		if (user == null) {
			done(null, false, { message: 'User not found'});
		}
		if (user.password !== md5.update(password)) {
			done(null, false, { message: 'Password is not correct'});			
		}
		done(null, user)
	}, (eror) => done(error)).catch(exception => done(exception));
}))