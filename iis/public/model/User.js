(function(){
	

	
	Class('User', {
		Base: Class.Serializable,
		Store: include.isBrowser
			? Class.Remote('/rest/user/?:_id')
			: null
			,
			
		Construct: function(object){
			
			if (!(object && object.calendars)) {
				this.calendars = [];
			}
			
			
			if (!(object && object.calendar && object.calendar.color)) 
				this.calendar.color = ruqq.color.randomRGB();
				
			
			
		},
		
		username: '',
		password: '',
		
		name: '',
		surname: '',
		
		role: '',
		email: '',
		
		calendars: null,
		calendar: {
			color: null
		},
		
		settings: {
			theme: '',
			calStart: 6,
			calEnd: 24
		},
					
		isInRole: function(role){
			return this.role === role;
		},
		
		getCalendars: function(){
			var array;
			
			array = this.calendars.slice(0);
			array.unshift({
				username: this.username,
				name: this.name,
				surname: this.surname,
				color: this.calendar.color
			});
			
			return array;
		},
		
		Validate: {
			username: function(value){
				if (!value) 
					return 'Name fehlt';
				
				if (value.length < 2)
					return 'Kennung ist zu kurz';
				
				if (value.length > 5) 
					return 'Kennung ist zu gross'
				
			},
			password: function(value){
				if (!(value && value.length > 3)) 
					return 'Passwort ist zu kurz';
			},
			
			name: function(value){
				if (!(value && value.length > 1))
					return 'Vorname ist zu kurz';
			},
			surname: function(value){
				if (!(value && value.length > 1))
					return 'Nachname ist zu kurz';
			},
			
			email: function(value){
				if (!value) 
					return 'Email fehlt';
					
				if (!/^[^@]+@[^@]+\.\w{2,6}$/.test(value))
					return 'Email ist vom nicht validen Format';
			}
		},
		
		hasCalendar: function(username){
			if (this.username === username) 
				return true;
			
			return ruqq.arr.any(this.calendars, function(cal){
				return cal.username === username;
			});
		},
		addCalendar: function(username, password){
			var dfr = new Class.Deferred;
			
			$
				.ajax({
					type: 'POST',
					url: '/rest/user/calendar',
					data: {
						username: username,
						password: password
					}
				})
				.done(function(user){
					dfr.resolve(user)
				})
				.fail(function(xhr){
					compo.Notification.error(xhr.responseText);
					dfr.reject(xhr.responseText);
				})
				;
			
			return dfr;
		}
	});
		
	Class.Collection('Users', Class('User'), {
		Store: include.isBrowser
			? Class.Remote('/rest/users')
			: null
	});
	


}());