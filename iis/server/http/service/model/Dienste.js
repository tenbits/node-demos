include.exports = atma.server.HttpService({

	

	'$get /dienste': function(req, res, params){
		
		////for (var key in req.query) 
		////	params[key] = req.query[key];
		
		dienst_resolveColl(req.user, this, params);
	},
	
	'$put /dienste': function(req, res, params){
		var collection = new Model.Dienste(req.body),
			that = this;
			
		if (collection.length === 0) 
			return this.reject('Dienst collection is empty');
		
		Model
			.Dienste
			.save(req.user, collection)
			.done(function(){
				
				var coll = collection.map(function(x){
					return { _id: x._id };
				});
				that.resolve(coll);
			})
			.fail(function(error){
				
				that.reject(error);
			});
	},
	
	'$get /dienst/:id': function(req, res, params){
		
		dienst_resolveSingle(this, { _id : params.id });
	},
	
	'$post /dienst': function(req){
		
		var that = this;
		
		Model
			.Dienst
			.save(req.user, req.body, function(error, dienst){
				if (error) 
					return that.reject({ error: error });
				
				return that.resolve(dienst);
			});
	},
	
	'$put /dienst/:id': function(req){
		if (!req.body._id) 
			return this.reject({ error: 'Dienst ID is not defined' });
		
		var that = this;
		
		Model
			.Dienst
			.save(req.user, req.body, function(error, dienst){
				if (error) 
					return that.reject({ error: error });
				
				that.resolve(dienst);
			})
	},
	
	'$delete /dienst/:id': function(req, res, params){
		
		var that = this;
		
		Model
			.Dienst
			.del(req.user, params.id, function(error){
				if (error) 
					return that.reject(error);
				
				that.resolve({ success: 'Dienst deleted' })
			});
	},
	
	'$post /dienste/import': function(req, res) {
		
		new DienstImporter(req.body, req.user)
			.done(this.resolveDelegate())
			.fail(this.rejectDelegate())
			;
	}

	
});


function dienst_resolveColl(user, service, params){
	Model
		.Dienste
		.search(user, params, function(error, coll){
			if (error) 
				return service.reject(error);
			
			service.resolve(coll);
		});
		
}

function dienst_resolveSingle(service, $query){
	Model
		.Dienst
		.fetch($query)
		.done(function(dienst){
			if (!dienst._id) 
				return service.reject({ error: 'Dienst not found' }, 404);
			
			service.resolve(dienst);
		});
}


var DienstImporter = Class({
	Base: Class.Deferred,
	Construct: function(array, currentUser) {
		this.user = currentUser;
		this.dienste = array;
		
		this.status = [];
		this.index = -1;
		this.users = [];
		
		this.types = null;
		this.settings = null;
		
		this.process();
	},
	
	Self: {
		process: function(){
			
			if (++this.index >= this.dienste.length) {
				this.resolve(this.status);
				return;
			}
			
			var self = this,
				await = new Class.Await(),
				dienst = new Model.Dienst(this.dienste[this.index]);
			
			if (dienst.date instanceof Date === false) {
				this.pushStatus(dienst, 'error', 'Invalid date');
				this.process();
				return;
			}
			
			if (dienst.username == null || dienst.username.length < 1) {
				this.pushStatus(dienst, 'error', 'Invalid username');
				this.process();
				return;
			}
			
			if (dienst.type == null || dienst.type < 1) {
				this.pushStatus(dienst, 'error', 'Invalid `Schicht`');
				this.process();
				return;
			}
			
			
			dienst.createdById = this.user._id;
			dienst.createdBy = this.user.username;
			
			this._ensureUser(dienst, await.delegate());
			this._ensureType(dienst, await.delegate());
			this._ensureNotExists(dienst, await.delegate());
			
			await
				.fail(this.process)
				.done(function(){
					
					dienst
						.save()
						.done(function(){
							self.pushStatus(dienst, 'success');
							self.process()
						})
						.fail(function(error){
							self.pushStatus(dienst, 'error', 'Dienst not saved: ' + error);
							self.process()
						})
				})
				
		},
		
		_ensureUser: function(dienst, callback) {
			var self = this;
			var user = ruqq.arr.first(this.users, function(user){
				return user.username === dienst.username;
			});
			
			if (user) {
				if (user.found === false){
					notFound();
					return;
				}
				found(user);
				return;
			}
			
			Model
				.User
				.fetch({
					username: dienst.username
				})
				.done(function(user){
					if (user._id == null) {
						notFound();
						return;
					}
					
					self.users.push(user);
					found(user);
				})
				.fail(notFound)
				;
			
			function found(user) {
				
				dienst.username = user.username;
				dienst.name = user.name;
				dienst.surname = user.username;
				
				callback(null, user);
			}
			
			function notFound(){
				if (user == null) {
					user = {
						username: dienst.username,
						found: false
					};
					self.users.push(user);
				}
				
				self.pushStatus(dienst, 'error', 'User Not Found: ' + dienst.username);
				callback('User Not Found');
			}
		},
		
		_ensureType: function(dienst, callback){
			var self = this;
			
			if (this.settings == null) {
				Model
					.Settings
					.fetch({})
					.done(function(settings){
						
						self.settings = settings._id
							? settings
							: new Model.Settings()
							;
						
						ensureType();
					})
					.fail(function(){
						
						self.settings = new Model.Settings();
						ensureType();
					})
				return;
			}
			
			ensureType();
			
			function ensureType(){
				
				var type = ruqq.arr.first(self.settings.dienst.types, function(type){
					return type.name === dienst.type;
				});
				
				if (type) {
					callback();
					return;
				}
				
				self.settings.dienst.types.push({
					name: dienst.type,
					color: ruqq.color.randomRGB()
				});
				
				self
					.settings
					.save()
					.done(function(){
						callback();
					})
					.fail(function(){
						self.pushStatus(dienst, 'error', 'Type not saved');
						callback('Type not saved');
					});
			}
		},
		
		_ensureNotExists: function(dienst, callback){
			var range = ruqq.date.getDayRange(dienst.date),
				self = this;
			
			Model
				.Dienst
				.fetch({
					$query: {
						username: dienst.username,
						type: dienst.type,
						date: {
							$gte: range.from,
							$lte: range.to
						}
					}
				})
				.done(function(dienst){
					
					if (dienst == null || dienst._id) {
						self.pushStatus(dienst, 'error', 'Already exists');
						callback('Exists');
						return;
					}
					callback();
				})
				.fail(function(error){
					callback();
				});
		},
		
		pushStatus: function(dienst, status, message) {
			var json = dienst.toJSON();
			json.status = status;
			json.message = message;
			
			this.status.push(json);
		}
	}
})