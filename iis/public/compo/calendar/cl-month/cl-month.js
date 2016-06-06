include 
	.load('cl-month.mask::Template') 
	.css('cl-month.less') //
	.done(function(resp){

		mask.registerHandler(':cl-month', Compo({
			template: resp.load.Template,

			//compos: {
			//
			//},
			//events: {
			//
			//},
			//slots: {
			//
			//},
			//pipes: {
			//
			//},
			//constructor: function(){
			//
			//},
			
			_month: new Date,
			onRenderStart: function(model, ctx, container){
				
				var resume = Compo.pause(this, ctx);
				
					
				this.model = [{
					days: this.getDays(),
					calendars: model.calendars
				}];
				
				this._model = Model
					.Appointments
					.resolveMonth(this._month)
					.done(resume)
					;
			},
			
			setMonth: function(month){
				this._month = new Date(month);
				
				var that = this;
				
				Model
					.Appointments
					.resolveMonth(this._month)
					.done(function(model){
								
						that._model = model;
						that.model.splice(0, 1, {
							days: that.getDays(),
							calendars: Current.calendars
						});
					})
					;
				
			},
			
			getDays: function(){
				var range = ruqq.date.getMonthRange(this._month),
					start = range.from,
					arr = [];
				
				while(start < range.to){
					arr.push({
						number: start.getDate(),
						date: new Date(start)
					});
					
					start.setDate(start.getDate() + 1);
				}
				
				return arr;
			},
			getDienste: function(username){
				
				var arr = ruqq.arr.where(this._model.dienste, function(dienst){
					return dienst.username === username;
				});
				
				var model = this.model[0],
					days = [],
					day = [],
					settings = Current.settings.dienst.types;
					;
				
				for (var i = 0, x, imax = model.days.length; i < imax; i++){
					x = model.days[i];
					
					var dienste = ruqq.arr.where(arr, function(dienst){
						
						return ruqq.date.isSameDay(dienst.date, x.date)
							&& Current.filter.dienst.indexOf(dienst.type || dienst.tag) === -1;
					}).map(function(dienst){
						
						return dienst.toDisplay();
					});
					
					days.push(dienste);
					
				}
				
				return days;
			}
	
			//dispose: function(){
			//
			//}
		}));


	});
