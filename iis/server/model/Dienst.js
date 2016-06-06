
include
	.js(
		'Appointment.js'
	)
	.done(function(resp){
		
		Class.patch('Dienst', {
			
			Store: Class.MongoStore.Single('dienste'),
			
			Static: {
				
				save: function(currentUser, object, callback){
					
					if (object._id == null) {
						object.createdById = currentUser._id;
						object.createdBy = String.format(
							'%1 %2 (%3)',
							currentUser.name,
							currentUser.surname,
							currentUser.username
						);
						
					}
					
					var dienst = new Model.Dienst(object),
						err;
						
					if ((err = Class.validate(dienst))) 
						return callback(err);
					
					if ((err = resp.Appointment.checkWriteAccess(dienst, currentUser)))
						return callback(err);
					
					dienst
						.save()
						.done(function(){
							callback(null, dienst);
						})
						.fail(callback)
						;
				},
				
				del: function(currentUser, id, callback){
					if (!id) 
						return callback('Dienst ID is not defined');
					
					var dienst = Model
						.Dienst
						.fetch({_id: id})
						.done(checkAndRemove)
						.fail(callback)
						;
					
					
					function checkAndRemove(dienst){
						
						var err;
						
						if ((err = resp.Appointment.checkWriteAccess(dienst, currentUser))) 
							return callback(err);
						
						dienst
							.del()
							.done(function(){
								callback();
							})
							.fail(function(error){
								callback(error);
							});
					}
				}
			}
		});
			
		
		Class.Collection('Dienste', Class('Dienst'), {
			Base: Class('Dienste'),
			Store: Class.MongoStore.Collection('dienste'),
			
			Static: {
				search: function(currentUser, params, callback){
					return resp
						.Appointment
						.searchDienste(
							Model.Dienste,
							currentUser,
							params,
							callback
						);
				},
				save: function(currentUser, collection){
					collection.forEach(function(x){
						if (x._id == null) {
							x.createdById = currentUser._id;
							x.createdBy = String.format(
								'%1 %2 (%3)',
								currentUser.name,
								currentUser.surname,
								currentUser.username
							);
						}
					});
					
					return collection.save();
				}
			}
		});
		
		
	});
