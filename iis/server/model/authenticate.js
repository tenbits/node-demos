var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;
	

passport.use(new LocalStrategy(function(username, password, done) {
	
	Model
		.User
		.authenticate(username, password, done)
		;
}));


passport.serializeUser(function(user, done) {
	done(null, user.username);
});

passport.deserializeUser(function(username, done) {

	Model
		.User
		.fetch({ username: username })
		.fail(function(error){
			if ('admin' === username) {
				// no admin user
				done(null, new Model.User({
					username: 'admin',
					password: 'admin',
					role: 'admin'
				}));
				return;
			}
			callback(error);
		})
		.done(function(user){
			
			if ('admin' === username && user.username !== username) {
				// no admin user still
				user.username = 'admin';
				user.role = 'admin';
				
				return done(null, user);
			}
			
			done(null, user);
		});
});
