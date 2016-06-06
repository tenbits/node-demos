(function(){
	
	var Dients = Class('Dienst', {
		Base: Class.Serializable({
			date: Date
		}),
		Store: include.isBrowser
			? Class.Remote('/rest/dienst/?:_id')
			: null
			,
		
		Construct: function(object){
			if (object && object.createdOn == null) 
				this.createdOn = Date.now();
			
		},
		
		_id: null,
		
		username: '',
		name: '',
		surname: '',
		
		date: new Date,
		type: '',
		tag: '',
		
		createdById: null,
		createdBy: '',
		createdOn: Date.now(),
		
		Validate: {
			username: function(value){
				if (!value) 
					return 'User Calendar is not specified';
			},
			
			type: function(value){
				if (!value && !this.tag) 
					return 'Type is not specified';
			},
			date: function(value){
				if (value instanceof Date === false && isNaN(value)) 
					return 'Date should be of the DateTime value';
			}
		},
		
		clone: function(){
			var Ctor = this.constructor;
			
			return new Ctor(this.serialize());
		},
		
		toDisplay: function(){
			var info,
				dienste = Current.settings.dienst;
			if (this.tag) {
				info = ruqq.arr.first(dienste.tags, 'name', '==', this.tag);
			}
			if (this.type) {
				info = ruqq.arr.first(dienste.types, 'name', '==', this.type);
			}
			
			return Object.extend(this.toJSON(), info);
		}
	});
	
	Class.Collection('Dienste', Class('Dienst'), {
		Base: Class.Serializable,
		Store: include.isBrowser
			? Class.Remote('/rest/dienste?from={?from}&to={?to}&calendars={?calendars}')
			: null,
			
		Static: {
			import: function(dienste) {
				
				
				return Class
					.Remote
					.post('/rest/dienste/import', dienste);
				
			}
		}
	});
	
}());