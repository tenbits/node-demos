(function(){
	
	
	Class('settings.DienstType', {
		Base: Class.Serializable,
		
		name: '',
		color: '#83BA1F', 
		
		Validate: {
			name: function(value){
				
				if (!(value && value.length > 1 && value.length < 4)) 
					return 'Diest name ist nicht korrekt';
			},
			color: function(value){
				
				if (/^#[\w\d]{6}$/.test(value) === false)
					return 'Farbe is vom nicht korrektem Type';
			}
		}
	});
	
	Class.Collection('settings.DienstTypes', Model.settings.DienstType, {
		Base: Class.Serializable
	});
	
	Class('settings.DienstTag', {
		Base: Class.Serializable,
		
		name: '',
		color: '#83BA1F', 
		
		Validate: {
			name: function(value){
				
				if (!(value && value.length > 1 && value.length < 50)) 
					return 'Diest tag ist nicht korrekt';
			},
			color: function(value){
				
				if (/^#[\w\d]{6}$/.test(value) === false)
					return 'Farbe is vom nicht korrektem Type';
			}
		}
	});
	
	Class.Collection('settings.DienstTags', Model.settings.DienstTag, {
		Base: Class.Serializable
	});
	
	
	Class('settings.Dienst', {
		Base: Class.Serializable({
			types: Model.settings.DienstTypes,
			tags: Model.settings.DienstTags
		}),
		
		types: new Model.settings.DienstTypes,
		tags: new Model.settings.DienstTags
	})
	
	
	Class('Settings', {
		Base: Class.Serializable({
			dienst: Model.settings.Dienst
		}),
		Store: include.isBrowser
			? Class.Remote('/rest/settings')
			: null
			,
		
		dienst: new Model.settings.Dienst,
		users: []
		
	});
	
}());