include 
	.js({'atma_compo': 'notification'})
	.done(function(resp){

		window.Notify = {
			restError: function(response){
				console.log('<Notify.error>', response);
				
				window.compo.Notification.error(response);
			},
			
			restStatus: function(){
				var Notification = window.compo.Notification;
				
				
				if (this._rejected) 
					Notification.error.apply(Notification, this._rejected);
				
				if (this._resolved) 
					Notification.success('Completed');
				
			},
		};
		
	});
