include 
	.load('cl-day.mask::Template') 
	.css('cl-day.less') //
	.done(function(resp){

		mask.registerHandler(':cl-day', Compo({
			template: resp.load.Template,

			onRenderStart: function(date, ctx, container, controller){
				
				var dienste,
					termine;
				
				var model = this.closest(':calendar').model,
					calendars = model.calendars,
					that = this
					;
				
				
				dienste = ruqq.arr.aggr(model.calendars, [], function(calendar, aggr){
					
					
					var dienste = model
						.dienste
						.filter(function(dienst) {
							
							return dienst.username === calendar.username
								&& ruqq.date.isSameDay(dienst.date, date)
								;
						})
						.filter(function(dienst){
							return Current.filter.dienst.indexOf(dienst.tag || dienst.type) === -1;
						})
						.map(function (dienst) {
							return dienst.toDisplay()
						})
						;
						
					aggr.push({
						user: calendar,
						dienste: dienste
					});
				});
				
				termine =  ruqq
					.cal
					.filter_terminePerDay(date, model.termine, calendars)
					;
				
				termine.forEach(function(termin){
						
					termin._display = ruqq.cal.getTerminDisplay(
						calendars,
						termin,
						model.cellHeight,
						model.calStart,
						model.calEnd,
						that
					);
				});
					
				//-this._calculateSize(termine);
				ruqq.cal.group_positionTermine({ termine: termine })
				
				
				this.date = date;
				this.model = {
					dienste: dienste,
					termine: termine,
					cells: model.cells,
					title: day_toString(date),
					todayClass: ruqq.date.isToday(date) ? '__today' : '',
					now:  model.now,
					
					date: date.toJSON()
				};
				
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
			}
		}));
		
		
		function dienst_getCalendar(dienst, calendars){
			return ruqq.arr.first(calendars, function(calendar){
				return calendar.username === dienst.username;
			});
		}
		
		function dienst_getType(dienst, setts){
			return dienst.toDisplay();
		
			//var arr = {
			//		_id: dienst._id
			//	},
			//	info;
			//
			//info = !dienst.tag 
			//	? ruqq.arr.first(setts.types, 'name', '==', dienst.type)
			//	: ruqq.arr.first(setts.tags, 'name', '==', dienst.tag)
			//	;
			//
			//
			//
			//return Object.extend({
			//	_id: dienst._id
			//});
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
				period: termin.formatPeriod(),
					
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
