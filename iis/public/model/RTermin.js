(function(){
		
		var _emitter = new Class.EventEmitter;
		
		var TYPES = [
			'day',
			'week',
			'month',
			'year'
		];
			
		
			
		Class('RTermin', {
			Base: Model.Termin,
			
			Store: include.isBrowser
				? Class.Remote('/rest/rtermin/?:id')
				: null
				,
			
			repeat: null,
			repeatVal: null,
			
			ensureRepeatVal: function(){
				
				switch (this.repeat) {
					case 'week':
						this.repeatVal = this.start.getDay();
						break;
					case 'month':
						this.repeatVal = this.start.getDate();
						break;
					case 'year':
						this.repeatVal = this.start.getMonth();
						break;
				}
				
				return this;
			},
			
			match: function(date){
				var _start = this.start;
				
				switch (this.repeat) {
					case 'day':
						return true;
					case 'week':
						return _start.getDay() === date.getDay();
					case 'month':
						return _start.getDate() === date.getDate();
					case 'year':
						return _start.getDate() === date.getDate()
							&& _start.getMonth() === date.getMonth()
				}
				
				console.error('<repeatedtermin> not valid repeat type', this.repeat);
			},
			
			Override: {
				save: function(){
					
					_emitter.trigger('save', this);
					
					return this.super();
				}
			},
			
			Static: {
				on: _emitter.on.bind(_emitter),
				repeat: function(termin, range){
					var arr = [],
						start = new Date(range.from),
						minutes = termin.periodInMinutes(),
						
						cloned
						;
						
					var step = 1;
					
					clone_time(start, termin.start);
					
					switch (termin.repeat) {
						case 'week':
							var day = termin.start.getDay(),
								dday = ruqq.date.next_Day(start, day);
						
							start.setDate(start.getDate() + dday);
							step = 7;
							/* break through */
						case 'day':
							
							logger.log('>> day', start);
							
							while (start < range.to) {
								cloned = termin.clone();
								cloned.start = new Date(start);
								cloned.end = ruqq.date.math_Minute(start, minutes);
								
								arr.push(cloned);
								
								start.setDate(start.getDate() + step);
							}
							return arr;
					}
					
					if ('month' === termin.repeat) {
						var date = termin.start.getDate();
						while (true) {
							if (date <= 28) 
								break;
							
							var days = ruqq.date.getDaysInMonth(start);
							if (days > date) 
								break;
							
							start.setMonth(start.getMonth() + 1);
							start.setDate(1);
							
							if (start > rage.to) 
								return [];
						}
						
						
						var ddate = ruqq.date.next_Date(start, date);
						
						start.setDate(start.getDate() + ddate);
						while (start < range.to) {
							cloned = termin.clone();
							cloned.start = new Date(start);
							cloned.end = ruqq.date.math_Minute(start, minutes);
							
							arr.push(cloned);
							
							start.setDate(start.getMonth() + 1);
							
							if (date <= 28) 
								continue;
							
							while (start.getDate() !== date && start < range.to) {
								start.setDate(date);
							}
						}
						
						return arr;
					}
					
					if ('year' === termin.repeat) {
						
						cloned = termin.clone();
						
						while (start < range.to) {
							// termin can only be present once
							
							if (termin.start.getMonth() === start.getMonth()) {
								cloned.start = new Date(start);
								cloned.end = ruqq.date.math_Minute(start, minutes);
								
								arr.push(cloned);
								break;
							}
							
							start.setDate(start.getMonth() + 1);
						}
						
						return arr;
					}
					
					
					function clone_time(target, source) {
						target.setHours(source.getHours());
						target.setMinutes(source.getMinutes());
						target.setSeconds(source.getSeconds());
					}
				},
				
				Util: {
					cloneTime: function(target, source){
						target.setHours(source.getHours());
						target.setMinutes(source.getMinutes());
						target.setSeconds(source.getSeconds());
					}
				}
			}
		});
			
		
		Class.Collection('RTermine', Class('RTermin'), {
			Store: include.isBrowser
				? Class.Remote('/rest/rtermine/from=:from&to=:to&calendars=:calendars')
				: null
		});
		
		
}());