
include
	.js(
		'./Appointment.js'
	)
	.done(function(resp){
		
		Class.patch('Termin', {
			
			Store: Class.MongoStore.Single('termine'),
			
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
					
								
					var Ctor = this,
						termin = new Ctor(object),
						err;
						
					if ((err = Class.validate(termin))) 
						return callback(err);
					
					
					if ((err = resp.Appointment.checkWriteAccess(termin, currentUser)))
						return callback(err);
					
					termin
						.save()
						.done(function(termin){
							callback(null, termin);
						})
						.fail(callback)
						;
				},
				
				del: function(currentUser, id, callback){
					
					resp.Appointment.del(this, currentUser, id, callback); 
				}
			}
		});
		
		Class.Collection('Termine', Class('Termin'), {
			Base: Class('Termine'),
			Store: Class.MongoStore.Collection('termine'),
			
			Static: {
				
				search: function(currentUser, params, callback){
					
					return resp
						.Appointment
						.searchTermine(
							Model.Termine,
							currentUser,
							params,
							callback
						);
				}
			}
		});
		
	});
