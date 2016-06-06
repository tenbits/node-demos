include.exports = atma.server.HttpService({

	

	'$get /rtermine': function(req, res, params){

		termin_resolveColl(req.user, this, params);
	},
	
	'$get /rtermine/:id': function(req, res, params){
		
		termin_resolveSingle(this, { _id : params.id });
	},
	
	'$post /rtermin': function(req){
		
		var that = this;
		
		Model
			.RTermin
			.save(req.user, req.body, function(error, termin){
				if (error) 
					return that.reject({ error: error });
				
				return that.resolve(termin);
			});
	},
	
	'$delete /rtermin': function(req){
		var that = this;
		
		Model
			.Appointment
			.del(Model.RTermin, req.user, req.body._id, function(error){
				if (error) 
					return that.reject(error);
				
				that.resolve({success: 'Gelöscht'})
			})
			;
		
	},
	
	'$put /rtermin/:id': function(req){
		if (!req.body._id) 
			return this.reject({ error: 'Termin ID is not defined' });
		
		var that = this;
		
		Mode
			.RTermin
			.save(req.user, req.body, function(error, termin){
				if (error) 
					return that.reject({ error: error });
				
				that.resolve(termin);
			})
	},
	
	'$delete /rtermin/:id': function(req, res, params){
		
		var that = this;
		
		
		new Model
			.RTermin({ _id: params.id })
			.del()
			.done(function(){
				that.resolve({ success: 'Termin deleted' })
			})
			.fail(function(error){
				that.reject(error);
			})
			;
			
	}

	
});


function termin_resolveColl(user, service, params){
	Model
		.RTermine
		.search(user, params, function(error, coll){
			if (error) 
				return service.reject(error);
			
			service.resolve(coll);
		});
		
}

function termin_resolveSingle(service, $query){
	Model
		.Termin
		.fetch($query)
		.done(function(termin){
			if (!termin._id) 
				return service.reject({ error: 'Termin not found' }, 404);
			
			service.resolve(termin);
		});
}