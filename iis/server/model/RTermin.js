(function(resp){
		
	
	Class.patch('RTermin', {
		
		Store: Class.MongoStore.Single('rtermine'),
		
		Static: {
			
			save: Model.Termin.save
			
		}
	});
		
	
	Class.Collection('RTermine', Class('RTermin'), {
		Base: Class.Serializable,
		
		Store: Class.MongoStore.Collection('rtermine')
	});

}());