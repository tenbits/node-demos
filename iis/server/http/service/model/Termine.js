include.exports = atma.server.HttpService({

	

	'$get /termine': function(req, res, params){

		termin_resolveColl(req.user, this, params);
	},
	
	'$get /termine/:id': function(req, res, params){
		
		termin_resolveSingle(this, { _id : params.id });
	},
	
	'$post /termin': function(req){
		
		var that = this;
		
		Model
			.Termin
			.save(req.user, req.body, function(error, termin){
				if (error) 
					return that.reject({ error: error });
				
				return that.resolve(termin);
			});
	},
	
	'$delete /termin': function(req){
		var that = this;
		
		Model
			.Appointment
			.del(Model.Termin, req.user, req.body._id, function(error){
				if (error) 
					return that.reject(error);
				
				that.resolve({success: 'Gelöscht'})
			})
			;
		
	},
	
	'$put /termin/:id': function(req){
		if (!req.body._id) 
			return this.reject({ error: 'Termin ID is not defined' });
		
		var that = this;
		
		Mode
			.Termin
			.save(req.user, req.body, function(error, termin){
				if (error) 
					return that.reject({ error: error });
				
				that.resolve(termin);
			})
	},
	
	'$delete /termin/:id': function(req, res, params){
		
		var that = this;
		
		
		new Model
			.Termin({ _id: params.id })
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
		.Termine
		.search(user, params, function(error, coll){
			if (error) 
				return service.reject(error);
			
			var error = 0;
			coll.each(function(x){
				
				if (x.isOneDay()) 
					return;
				
				error++;
				
			});
			
			
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