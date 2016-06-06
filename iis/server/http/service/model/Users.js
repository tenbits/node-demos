include.exports = atma.server.HttpService({

	

	'$get /users': function(){
		
		user_resolveColl(this, {});
	},
	
	'$get /user': function(req){
		
		this.resolve(req.user);
	},
	'$get /user/:id': function(req, res, params){
		
		user_resolveSingle(this, { _id : params.id });
	},
	
	'$post /user': function(req){
		
		var that = this;
		
		Model
			.User
			.save(req.body, function(error, user){
				if (error) 
					return that.reject({ error: error });
				
				return that.resolve(user);
			});
	},
	
	'$patch /user/:id': function(req, res, params){
		var that  = this;
		
		new Model
			.User({ _id: params.id })
			.patch(req.body)
			.done(function(user){
				
				user_updateCalendars(user, that);
			})
			.fail(this.rejectDelegate())
			;
	},
	
	'$post /user/calendar': function(req){
		var that = this;
		
		if (req.user.hasCalendar(req.body.username)) {
			return this.reject({ error: 'Calendar already present' });
		}
		
		Model
			.User
			.fetch({
				username: req.body.username,
				password: req.body.password
			})
			.done(function(user){
				if (!user._id)
					return that.reject({ error: 'Account not found. Check the credentials' })
				
				var calendar = {
					_id: user._id,
					username: user.username,
					name: user.name,
					surname: user.surname,
					color: user.calendar.color || ruqq.color.randomRGB()
				};
				
				req
					.user
					.patch({
						$push: {
							calendars: calendar
						}
					})
					.done(function(){
						that.resolve(calendar);
					})
					.fail(function(error){
						that.reject(error);
					})
				
			})
	},
	
	'$put /user/:id': function(req, res, params){
		var object = req.body;
		
		if (!object._id)
			object._id = params.id;
		
		
		var that = this;
		
		Model
			.User
			.save(object, function(error, user){
				if (error) 
					return that.reject({ error: error });
				
				
				user_updateCalendars(user, that);
			})
	},
	
	'$delete /user/:id': function(req, res, params){
		
		var that = this;
		
		Model
			.User
			.del(params.id, function(error){
				if (error) 
					return that.reject({ error: error });
				
				that.resolve({ success: 'User deleted' });
			})
		
	}

	
});


function user_resolveColl(service, $query){
	Model
		.Users
		.fetch($query)
		.done(function(coll){
			service.resolve(coll);
		});
}

function user_resolveSingle(service, $query){
	Model
		.User
		.fetch($query)
		.done(function(user){
			if (!user._id) 
				return service.reject({ error: 'User not found' }, 404);
			
			service.resolve(user);
		});
}

function user_updateCalendars(user, service){
	
	Model
		.Users
		.updateWithCalendar(user, function(error){
			if (error) {
				service.reject(error)
				return;
			}
			
			service.resolve(user);
		})
		
	//
	//Model
	//	.Users
	//	.getWithCalendar(user._id)
	//	.done(function(users){
	//		
	//		if (users.length === 0) {
	//			service.resolve(user);
	//			return;
	//		}
	//		
	//		var await = new Class.Await();
	//		users.forEach(function(owner){
	//			Model
	//				.User
	//				.updateCalendarInfo(owner, user, await.deferred())
	//				;
	//		});
	//		
	//		await
	//			.done(function(){
	//				service.resolve(user);
	//			});
	//		
	//		await.fail(service.failDelegate());
	//	});
	//
	//service.resolve(user);
}

