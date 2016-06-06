include 
	.load('cl-singleday.mask::Template') 
	.css('cl-singleday.less') //
	.done(function(resp){

		mask.registerHandler(':cl-singleday', Compo({
			template: resp.load.Template,

			onRenderStart: function(date, ctx, container){
				
				//var date = calendarModel.days[0];
				
				var dienste,
					termine;
				
				var model = this.closest(':calendar').model,
					calendars = model.calendars,
					that = this
					;
				
				this.hiddenBottom = 0;
				this.hiddenTop = 0;
				
				dienste = ruqq.arr.aggr(model.calendars, [], function(calendar, aggr){
					
					var arr = model.dienste.toArray
						? model.dienste.toArray()
						: model.dienste
						;
					
					var dienste = arr
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
				
				termine = ruqq
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
					
				termine = ruqq
					.cal
					.group_terminePerCalendar(termine, model.calendars)
					;
				
				
				termine
					.forEach(ruqq.cal.group_positionTermine)
					;
				
				this.date = date;
				this.model = {
					dienste: dienste,
					termine: termine,
					cells: model.cells,
					title: ruqq.date.format(date, 'Dd dd/MM'),
					todayClass: ruqq.date.isToday(date) ? '__today' : '',
					now:  model.now,
					
					hiddenBottom: this.hiddenBottom,
					hiddenTop: this.hiddenTop,
					
					date: date.toJSON()
				};
				
			},
			onRenderEnd: function(elements, model, ctx, container){
				// ..
			},
	
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
						&& ruqq.date.isSameDay(dienst.date, date)
						;
				});
			
		}
		
	});
