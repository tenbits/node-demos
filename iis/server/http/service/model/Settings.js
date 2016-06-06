include.exports = atma.server.HttpService({

	

	'$get /': function(req, res, params){
		
		setts_resolveSingle(this);
	},
	
	'$put /': function(req, res, params){
		
		setts_save(this, req, res, params);
	},
	
	'$post /': function(req, res, params){
		
		setts_save(this, req, res, params);
	}
});

function setts_save(service, req, res, params){
	var settings = new Model.Settings(req.body);
	
	settings
		.save()
		.done(function(){
			
			
			service.resolve(settings)
		})
		.fail(function(error){
			service.reject(error);
		});
}

function setts_resolveSingle(service){
	Model
		.Settings
		.fetch({})
		.done(function(settings){
			
			service.resolve(settings);
		});
}