include 
	.load('cl-year.mask::Template') 
	.css('cl-year.less')
	.js('cl-year-month/cl-year-month.js')
	.done(function(resp){
		
		var _today = new Date;
	
		mask.registerHandler(':cl-year', Compo({
			template: resp.load.Template,

			_year: null, //new Date().getFullYear(),
			onRenderStart: function(model, ctx, container){
				
				
				var days = ruqq.date.getDaysInMonth(_today),
					percent = (_today.getDate() - 1) / days * 100
					;
				var time = (100 / 31) * (_today.getHours() / 24)
					;
				this.model = {
					cells: this._getCells(),
					calendars: model.calendars,
					year: [],
					now: {
						top:  percent + time
					}
				};
				
			},
			
			setYear: function(year){
				var dfr = new Class.Deferred(),
					that = this;
				
				
				//if (year === this._year) 
				//	return dfr.resolve(this.dienste);
				
				this._year = year;
					
					
				var monthes = this._getMonthDates(),
					that = this
					;
				
				Model
					.Appointments
					.resolveMonthes(monthes, 'dienste')
					.done(function(dienste){
						
					
					var year = that.model.year,
						dienste = that._groupByMonth(dienste.dienste)
						;
						
					var model = dienste;
						
					if (year.length === 0) 
						year.push(model);
					
					else
						year.splice(0, 1, model);
					
					dfr.resolve(dienste);
					
					that.emitOut('compo_Resize');
				})
				;
				return dfr;
			},
			
			onRenderEnd: function(elements, model, ctx, container){
				// ..
			},
	
			_calculateSize: function(termine) {
				
				termine.sort(function(a, b){
					if (a.start < b.start)
						return -1;
					
					if (a.start - b.start < 1000) 
						return 0; // equal
					
					return 1;
				});
				
				var groups = [],
					group = [],
					max;
					
				for (var i = 0, termin, imax = termine.length; i < imax; i++){
					termin = termine[i];
					
					if (max == null || max < termin.end) 
						max = termin.end;
					
					
					group.push(termin);
					
					if (i === imax - 1) 
						continue;
					
					if (max < termine[i+1].start) {
						max = null;
						groups.push(group);
						group = [];
						continue;
					}
				}
				
				groups.push(group);
				
				ruqq.arr.each(groups, termin_positionGroup);
			},
			
			_groupByMonth: function(dienste){
				var year = [];
				
				this
					._getMonthDates()
					.forEach(function(date){
						
						var array = ruqq.arr.where(dienste, function(dienst){
							return ruqq.date.isSameMonth(dienst.date, date);
						});
						
						
						year.push({
							title: ruqq.date.format(date, 'Mm yyyy'),
							date: date,
							dienste: array
						});
					});
				
				return year;
			},
			
			_getCells: function(){
				var arr = [],
					i = 0;
				
				while ( ++i < 32) 
					arr.push({
						time: i
					});
				
				return arr;
			},
			
			_getMonthDates: function(){
				var start = new Date(this._year, 0, 1),
					arr = [],
					i = 0;
				
				do {
					
					arr.push(new Date(start));
					start.setMonth(start.getMonth() + 1);
					
				} while (++i < 12);
				
				return arr;
			}
		}));
		
		
		function dienst_getCalendar(dienst, calendars){
			return ruqq.arr.first(calendars, function(calendar){
				return calendar.username === dienst.username;
			});
		}
		
		
		function dienst_getDienste(dienste, calendar, date){
			
			return ruqq
				.arr
				.where(dienste, function(dienst){
					return dienst.username === calendar.username
						&& day_equal(dienst.date, date)
						;
				});
			
		}
		
		function termin_positionGroup(arr){
			var width = 99.5 / arr.length,
				left = 0;
			
			for (var i = 0, x, imax = arr.length; i < imax; i++){
				x = arr[i];
				
				x._display.width = width;
				x._display.left = left;
				
				left += width;
			}
		}
		
		function termin_Display(calendars, termin, cellHeight, startHours, endHours){
			var start = new Date(termin.start),
				end = new Date(termin.start),
				
				height = cellHeight * (endHours - startHours),
				diff
				;
				
			start.setMinutes(0);
			start.setSeconds(0);
			start.setHours(startHours);
			end.setMinutes(0);
			end.setSeconds(0);
			end.setHours(endHours);
			
			diff = termin.start - start;
			
			
			if (diff < 0 || end < termin.start) {
				return {
					klass: 'hidden'
				};
			}
			
			var _top, _height;
			
			_top = diff / (end - start) * 100;
			
			diff = termin.end - start;
			_height = diff / (end - start) * 100 - _top;
			
			var min_height = 18 / height * 100;
			
			if (_height < min_height) {
				_height = min_height;
			}
			
			var calendar = ruqq.arr.first(calendars, function(calendar){
				return termin.usernames.indexOf(calendar.username) !== -1;
			});
			
			return {
				width: 95,
				height: _height,
				
				top: _top,
				period: ruqq.date.format(termin.start, 'HH:mm')
					+ '-'
					+ ruqq.date.format(termin.end, 'HH:mm'),
					
				color: termin.color || ruqq.color.randomRGB(),
				userColor: calendar.color
			};
		}
		
		function day_equal(a, b){
			return a.getDate() === b.getDate()
				&& a.getMonth() === b.getMonth()
				&& a.getFullYear() === b.getFullYear()
				;
		}
		
		function day_toString(date){
			return ruqq.date.format(date, 'Dd dd/MM');
		}

	});
