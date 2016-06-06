include 
	.load(
		  'calendar.mask::Template',
		  'template-termin.mask::Termin',
		  'template-dienst.mask::Dienst'
	) 
	.css('calendar.less') 
	.js(
		'termin/termin.js',
		'cl-day/cl-day.js',
		'cl-singleday/cl-singleday.js',
		'cl-month/cl-month.js',
		'cl-timeline/cl-timeline.js',
		'cl-year/cl-year.js',
		'handler/resize-handler.js',
		'handler/day-sizer.js',
		'handler/double-scroller.js'
	)
	.done(function(resp){

		var cell_HEIGHT = 40;
	
		mask.registerHandler(':calendar', Compo({
			template: resp.load.Template,

			compos: {
				//$calendarDays: '$: .-calendar-days',
				
				popover: 'compo: #termin-popover',
				month: 'compo: :cl-month',
				year: 'compo: :cl-year',
				typesTab: 'compo: #types-tab',
				
				//$days: '$: .-calendar-each',
				//$month: '$: .-calendar-month'
			},
			events: {
				'click: .-cl-termin': function(event){
					
					var id = $(event.currentTarget).data('termin'),
						termin = ruqq.arr.first(this.model.termine, '_id', '==', id);
					
					
					this
						.compos
						.popover
						.show(event, resp.load.Termin, termin);
				},
				
				'click: .-cl-dienst-type': function(event){
					var $td = $(event.currentTarget),
						id = $td.data('dienst');
					if (id == null) 
						id = $td.parent().data('dienst');
					
					
					var dienst = ruqq
							.arr
							.first(this.model.dienste, '_id', '==', id)
							.toDisplay()
						;
					
					this
						.compos
						.popover
						.show(event, resp.load.Dienst, dienst);
				},
				
				'click: .-cl-day-hidden-termine': function(event){
					this._forceFullCal = 1;
					this.setView();
				}
			},
			
			//constructor: function(){
			//
			//},
			
			pipes: {
				calendar: {
					dayShow: function(event, date){
						if (date == null) {
							date = $(event.currentTarget).compo().date;
						}
						
						this._activeDate = date;
						this.setView('day');
					},
					doRangeShow: function(sender, range, date){
						this.setView(range, date);
					},
					doCalendarToggle: function(calendar, state){
						var cals = this.model.calendars;
						if (state) {
							cals.push(calendar);
						}else{
							ruqq.arr.remove(cals, function(cal){
								return cal.username === calendar.username;
							})
						}
						
						this.setView();
						//this.compos.find(':cl-timeline').setCalendars(cals);
					},
					filterRefresh: function(){
						
						this.setView();
					},
					
					refresh: function(){
						this.setView();
					}
				}
			},
			
			slots: {
				calendarNavNext: function(){
					this.navigate(1);
				},
				calendarNavPrev: function(){
					this.navigate(-1);
				},
				calendarNavToday: function(){
					this._activeDate = new Date;
					this.setView();
				},
				calendarRefresh: function(){
					this.setView();
				},
				
				pop_terminRemove: function(event){
					var id = $(event.currentTarget)
						.closest('.-termin-pop')
						.data('termin')
						;
					
					if (Model.Appointments.remove('termin', id)){
						this.setView();
					}
				},
				pop_terminEdit: function(){
					var id = $(event.currentTarget)
						.closest('.-termin-pop')
						.data('termin')
						;
					var termin = Model
						.Appointments
						.getById('termin', id)
						;
						
					if (termin._split) {
						
						var start = termin._split.start,
							end = termin._split.end
							;
						
						termin = termin.clone();
						termin.start = new Date(start);
						termin.end = new Date(end);
					}
					
					this.emitOut('termin_Edit', termin);
					return false;
				},
				
				pop_dienstRemove: function(event){
					var id = $(event.currentTarget)
						.closest('.-dienst-pop')
						.data('dienst')
						;
					
					if (Model.Appointments.remove('dienst', id)){
						this.setView();
					}
				},
				pop_dienstEdit: function(){
					var id = $(event.currentTarget)
						.closest('.-dienst-pop')
						.data('dienst')
						;
					var dienst = Model
						.Appointments
						.getById('dienst', id)
						;
						
					
					this.emitOut('dienst_Edit', dienst);
					return false;
				}
			},
			
			_activeDate: new Date,
			_range: null,
			_forceFullCal: -1,
			onRenderStart: function(model, cntx, container){
				
				this._range = model.range || 'week';
				
				var calStart = model.user.settings.calStart,
					calEnd = model.user.settings.calEnd
					;
				
				var timeline = time_timelineInfo(calStart, calEnd, cell_HEIGHT);
				
				
				this.model = {
					cells: timeline.cells,
					dienste: model.dienste,
					termine: model.termine,
					calendars: Current.calendars,
					now: timeline.now,
					
					days: [this._activeDate],
					week: [],
					
					range: this._range,
					cellHeight: cell_HEIGHT,
					
					calStart: calStart,
					calEnd: calEnd
				};
				
			},
			onRenderEnd: function(elements, cntx, container){
				this.setView();
			},
			
			setView: function(type, date){
				if (type) 
					this._range = type;	
				
				if (date) 
					this._activeDate = date;
				
				var days = [],
					from,
					to,
					prop
					;
				
				this
					.compos
					.typesTab
					.setActive(this._range)
					;
				
				switch(this._range){
					case 'week':
						var range = ruqq.date.getWeekRange(this._activeDate),
							
							_from = range.from,
							_fromDate = _from.getDate()
							;
						
						for (var i = 0; i < 7; i++){
							var x = new Date(_from);
							x.setDate(_fromDate + i);
							
							days.push(x);
						}
						from = range.from;
						to = range.to;
						prop = 'week';
						break;
					case 'day':
						from = new Date(this._activeDate);
						days = [from];
						prop = 'days';
						
						break;
					case 'month':
						this.compos.month.setMonth(this._activeDate);
						
						var range = ruqq.date.getMonthRange(this._activeDate);
						Compo.pipe('calendar').emit('rangeChange', that, range.from, range.to, this._range);
						return;
					case 'year':
						var range = ruqq.date.getYearRange(this._activeDate);
						
						this.compos.year.setYear(this._activeDate.getFullYear());
						Compo.pipe('calendar').emit('rangeChange', that, range.from, range.to, this._range);
						return;
				}
				
				
				if (this._forceFullCal !== -1) {
					this._forceFullCal--;
					
					var calStart = this._forceFullCal === 0
						? 0
						: Current.user.settings.calStart
						;
					var calEnd = this._forceFullCal === 0
						? 24
						: Current.user.settings.calEnd
						;
						
					this.model.calStart = calStart;
					this.model.calEnd = calEnd;
					
					var timeline = time_timelineInfo(calStart, calEnd);
					this.model.cells = timeline.cells;
					this.model.now = timeline.now;
				}
				
				
				
				var that = this;
				Model
					.Appointments
					.resolveRange(from, to)
					.done(function(model){
						that.model.dienste = model.dienste;
						that.model.termine = model.termine;
						
						if (prop) {
							that.model[prop] = days;	
						}
						
						Compo.pipe('calendar').emit('rangeChange', that, from, to, that._range);
					});
				
			},
			
			navigate: function(direction){
				switch(this._range){
					case 'day':
						this._activeDate.setDate(this._activeDate.getDate() + direction);
						this.setView();
						break;
					case 'week':
						var range = ruqq.date.getWeekRange(this._activeDate),
							next = direction === 1 ? range.to : range.from;
						
						next.setDate(next.getDate() + direction);
						
						this._activeDate = next;
						this.setView();
						break;
					case 'month':
						this._activeDate = ruqq.date.math_Month(this._activeDate, direction);
						this.setView();
						break;
				}
			}
		}));

		function time_timelineInfo(start, end) {
			var START = start;
			
			var cells = []
				;
			
			for(; start < end; start++){
				cells.push({
					time: time_format(start)
				});
			}
			
			return {
				cells: cells,
				now: time_Now(cell_HEIGHT, START, end),
			};
			
		}
		
		function time_format(time){
			if (time < 10) 
				return '0' + time + ':00';
			
			return time + ':00';
		}
		
		function time_Now(cellHeight, startHours, endHours){
			var now = new Date(),
				start = new Date(),
				end = new Date(),
				
				height = cellHeight * (endHours - startHours),
				diff
				;
			
			start.setMinutes(0);
			start.setHours(startHours);
			end.setMinutes(0);
			end.setHours(endHours);
			
			diff = now - start;
			
			
			if (diff < 0 || end < now) {
				return {
					klass: 'hidden'
				};
			}
			
			var percent = ((diff / (end - start) * 100));
			
			return {
				top: percent
			};
		}
	});
