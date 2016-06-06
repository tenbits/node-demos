include 
	.load('cl-year-month.mask::Template') 
	.css('cl-year-month.less') //
	.done(function(resp){

		mask.registerHandler(':cl-year-month', Compo({
			template: resp.load.Template,

			onRenderStart: function(model, ctx, container, controller){
				
				var dienste;
				
				var calModel = this.closest(':calendar').model,
					yearModel = this.closest(':cl-year').model,
					calendars = calModel.calendars,
					date = model.date,
					that = this,
					
					monthModel = ruqq.arr.first(yearModel.year[0], function(monthModel){
						return date.getMonth() === monthModel.date.getMonth()
					}),
					dienste = monthModel.dienste
					;
				
				
				dienste = ruqq.arr.aggr(calModel.calendars, [], function(calendar, aggr){
					
					//var _dienste = dienst_getDienste(dienste, calendar, date);
					var _filters = Current.filter.dienst,
						_dienste = dienste
							.filter(function(dienst){
								return dienst.username === calendar.username;
							})
							.filter(function(dienst){
								return _filters.indexOf(dienst.tag || dienst.type) === -1;
							})
							;
					
					var groups = ruqq
						.arr
						.groupBy(_dienste, function(a, b){
							return ruqq.date.isSameDay(a.date, b.date);
						});
					
					
					groups
						.forEach(function(group){
							group.forEach(function(dienst, index){
								
								var type = dienst.toDisplay();
								
								dienst._display = dienst_Display( dienst, index, group.length );
								dienst._display.color = type.color;
							})
						});
					
					
					aggr.push({
						user: calendar,
						dienste: _dienste
					});
				});
				
				
				this.date = date;
				this.model = {
					dienste: dienste,
					cells: yearModel.cells,
					title: month_toString(date),
					todayClass: ruqq.date.isThisMonth(date) ? '__today' : '',
					now:  yearModel.now
				};
				
			},
			onRenderEnd: function(elements, model, ctx, container){
				// ..
			},
	
			_calculateSize: function(dienste) {
				
				dienste.sort(function(a, b){
					if (a.date < b.date)
						return -1;
					
					if (a.date - b.date < 1000) 
						return 0; // equal
					
					return 1;
				});
				
				var groups = [],
					group = [],
					max;
					
				for (var i = 0, dienst, imax = dienste.length; i < imax; i++){
					dienst = dienste[i];
					
					if (max == null || max < dienst.date) 
						max = dienst.date;
					
					
					group.push(dienst);
					
					if (i === imax - 1) 
						continue;
					
					if (max < dienste[i+1].date) {
						max = null;
						groups.push(group);
						group = [];
						continue;
					}
				}
				
				groups.push(group);
				
				ruqq.arr.each(groups, dienst_positionGroup);
			}
		}));
		
		
		function dienst_getCalendar(dienst, calendars){
			return ruqq.arr.first(calendars, function(calendar){
				return calendar.username === dienst.username;
			});
		}
		
		function dienst_getType(dienst, setts){
			return ruqq.arr.first(setts.types, 'name', '==', dienst.type);
		}
		
		function dienst_getDienste(dienste, calendar, date){
			
			return ruqq
				.arr
				.where(dienste, function(dienst){
					return dienst.username === calendar.username
						&& month_equal(dienst.date, date)
						;
				});
			
		}
		
		function dienst_positionGroup(arr){
			var width = 99.5 / arr.length,
				left = 0;
			
			for (var i = 0, x, imax = arr.length; i < imax; i++){
				x = arr[i];
				
				x._display.width = width;
				x._display.left = left;
				
				left += width;
			}
		}
		
		function dienst_Display(dienst, index, count){
			
			var top = (dienst.date.getDate() - 1) / 31 * 100;
			
			return {
				top: top,
				height: 100 / 31,
				width: 100 / count,
				left: (100 / count) * index
			};
		}
		
		function month_equal(a, b){
			return a.getMonth() === b.getMonth()
				&& a.getFullYear() === b.getFullYear()
				;
		}
		
		function month_toString(date){
			return ruqq.date.format(date, 'Mm yy');
		}

	});
