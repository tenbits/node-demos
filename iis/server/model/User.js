
(function(){
	
		
	var User = Class.patch('User', {
		
		Store: Class.MongoStore.Single('users'),
		
		Static: {
			authenticate: function(username, password, callback){
				this
					.fetch({ username: username })
					.fail(function(error){
						if ('admin' === username && username === password) {
								
							callback(null, new User({
								username: 'admin',
								password: 'admin',
								role: 'admin'
							}));
							return;
						}
						callback('Invalid username');
					})
					.done(function(user){
						if (user.password !== password) 
							return callback('Invalid password');
						return callback(null, user);
					});
			},
			
			save: function(object, callback){
				var user = new User(object),
					err;
					
				if ((err = Class.validate(user))) 
					return callback(err);
				
				user
					.save()
					.done(function(){
						
						callback(null, user);
					})
					.fail(callback)
					;
			},
			
			del: function(id, callback){
				if (!id) 
					return callback('User ID is not defined');
				
				Model
					.User
					.fetch({
						_id: id
					})
					.done(process)
					.fail(callback);
				
				function process(user){
					
					new User({ _id: id })
						.del()
						.done(function(){
							callback();
						})
						.fail(function(error){
							callback(error);
						});
					
					// remove data
					
					Model
						.Dienst
						.resolveCollection()
						.done(function(DbDienste){
							DbDienste.remove({ createdById: id }, function(){});
						});
						
					Model
						.User
						.resolveCollection()
						.done(function(DbUser){
							
							DbUser.update({}, { $pull: {
								calendars: {
									_id: Class.MongoStore.createId(id)
								}
							}}, function(){});
						});
					
					Model
						.Termin
						.resolveCollection()
						.done(function(DbTermin){
							DbTermin.remove({ createdById: id }, function(){});
							
							DbTermin.update({}, { $pull: {
								usernames: user.username
							}}, function(){});
						});
				}
			},
			
			updateCalendarInfo: function(owner, userCal, dfr) {
				
			}
		}
	});
		
	Class.Collection('Users', User, {
		Base: Class('Users'),
		Store: Class.MongoStore.Collection('users'),
		
		Static: {
			
			updateWithCalendar: function(user, done){
				
				Class('User')
					.resolveCollection()
					.done(function(coll){
						
						coll.update({
							calendars: {
								$elemMatch: {
									_id: Class.MongoStore.createId(user._id)
								}
							}
						}, {
							$set: {
								'calendars.$.username': user.username,
								'calendars.$.name': user.name,
								'calendars.$.surname': user.surname
							}
						}, function(error, mix) {
							
							done(error);
						})
					})
			}
		}
	});
	
		
}());
