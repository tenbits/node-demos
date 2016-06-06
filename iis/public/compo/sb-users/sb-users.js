include 
	.load('sb-users.mask::Template') 
	.css('sb-users.less') //
	.done(function(resp){

		mask.registerHandler(':sb-users', Compo({
			template: resp.load.Template,

			//compos: {
			//
			//},
			events: {
				'click: .-sbu-checkbox': function(event){
					var $checkbox = $(event.currentTarget).children().first(),
						$user = $checkbox.closest('.-sbu-user'),
						username = $user.data('username'),
						show = $checkbox.toggle().is(':visible')
						;
					
					var calendar = ruqq.arr.first(this.model.user.getCalendars(), function(calendar){
						return calendar.username === username;
					});
					
					if (calendar == null) {
						debugger
					}
					
					Compo.pipe('calendar').emit('doCalendarToggle', calendar, show);
				}
			},
			slots: {
				
				addCalendar: function(event){
					this.find('#createNew').show();
				},
				dialog_addCalendar: function(event){
					
				
					var $inputs = this.find(':dialog').$.find('input'),
						$username = $inputs.filter('[name="inputUsername"]'),
						$password = $inputs.filter('[name="inputPassword"]')
						;
					
					var username = $username.val(),
						password = $password.val();
					
					if (username.length < 2 || username.length > 8) {
						return compo.Notification.error('Kennung nicht valid');
					}
					if (password.length < 2) {
						return compo.Notification.error('Password nicht valid');
					}
					
					var model = this.model,
						that = this;
					
					
				
					model
						.user
						.addCalendar(username, password)
						.done(function(calendar){
							that.emitIn('dialogCancel');
							
							Compo.pipe('calendar').emit('doCalendarToggle', calendar, true);
							model.user.calendars.push(calendar);
						})
						
					
				}
			},
			//pipes: {
			//
			//},
			//constructor: function(){
			//
			//},

	        onRenderStart: function(model, cntx, container){
	            
	        },
	        onRenderEnd: function(elements, cntx, container){
	            // ..
	        }
		}));


	});
