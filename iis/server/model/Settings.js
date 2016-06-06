
(function(){
		
		
		Class.patch('Settings', {
			
			Store: Class.MongoStore.Single('settings'),
			
			Static: {
				
				save: function(object, callback){
								
					var settings = new Model.Settings(object),
						err;
						
					if ((err = Class.validate(settings))) 
						return callback(err);
					
					settings
						.save()
						.done(function(){
							callback(null, settings);
						})
						.fail(callback)
						;
				}
			}
		});
		
		
}());
