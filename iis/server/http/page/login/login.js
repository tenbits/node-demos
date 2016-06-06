
include
	.load('login.mask')
	.done(function(resp){
		
		include.exports = mask.Compo({
			mode: 'server',
			template: resp.load.login,
			onRenderStart: function(model, ctx){
				
				if (ctx.req.url === '/logout') {
					
					ctx.req.session.destroy();
					ctx.redirect('/login');
					return;
				}
				
				
				model = this.model = {};
				
				if (ctx.req.method === 'POST') {
					
					var error,
						user = new Model.User({
							username: ctx.req.body.inputUsername, 
							password: ctx.req.body.inputPassword 
						});
					
					if ((error = Class.validate(user, 'username', 'password'))) {
						model.error = error;
						return;
					}
					
					var resume = Compo.pause(this, ctx);
					Model
						.User
						.authenticate(user.username, user.password, function(err, user){
							if (err) {
								model.error = err;
								resume();
								return;
							}
							ctx
								.req
								.login(user, function(error){
									if (error) 
										model.error = error;
									else
										ctx.redirect('/');
									
									resume();
								});
							
						});
						
				
					return;
				}
				
				var user = ctx.req.user;
				logger.log('<login> current', user && user.username);
			}
		});
		
	})
