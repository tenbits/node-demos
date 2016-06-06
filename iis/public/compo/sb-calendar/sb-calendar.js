include 
	.load('sb-calendar.mask::Template') 
	.css('sb-calendar.less') //
	.done(function(resp){

		var select_WEEK = 'week',
			select_DAY  = 'day',
			select_MONTH = 'month'
			;
			
		var MONTH = [
			'Januar',
			'Februar',
			'März',
			'April',
			'Mai',
			'Juni',
			'Juli',
			'August',
			'September',
			'Oktober',
			'November',
			'Dezember',
		];
		
		var DAYS =  [
			'Mo',
			'Di',
			'Mi',
			'Do',
			'Fr',
			'Sa',
			'So',
		];
		
		var _today = new Date;
			
		mask.registerHandler(':sb-calendar', Compo({
			template: resp.load.Template,

			selectType: select_WEEK,
			month: null,
			date: null,
			
			events: {
				'click: .-scl-cell': function(event){
					var $td = $(event.currentTarget),
						date = new Date($td.data('date'));
					
					if ($td.hasClass('__selected')) 
						return;
					
					var diff = this.navigationDiff(date);
					if (diff) 
						this.navigate(diff);
					
					
					Compo.pipe('calendar').emit('doRangeShow', this, null, date);
					
					//if (this.select(select_DAY, date)){
					//	this.emitOut('calendar_Select', date);
					//}
				},
				'click: .-scl-nav': function(event){
					
					
				}
			},
			pipes: {
				calendar: {
					rangeChange: function(calendar, from, to, type){
						
						if ('year' === type) 
							return this.disable();
						
						this.selectRange(from, to);
					}
				}
			},
			slots: {
				navLeft: function(event){
					event.stopPropagation();
					this.navigate(-1);
				},
				navRight: function(event){
					event.stopPropagation();
					this.navigate(1);
				}
			},
			
	        onRenderStart: function(model, cntx, container){
	            
				this.model = {
					calendars: this.getCalendarsMatrix(_today)
				};
				
				this.month = new Date(_today);
				this.date = new Date(_today);
				this.type = select_WEEK;
				
				
	        },
	        onRenderEnd: function(elements, cntx, container){
	            
				var range = ruqq.date.getWeekRange(this.date);
				
				this.selectRange(range.from, range.to);
				Model
					.Appointments
					.resolveMonth(this.getMonthes())
					.done(this._highlightMonth.bind(this))
					;
	        },
			
			getMonthes: function(){
				return this
					.model
					.calendars
					.map(function(x){
						return x.date;
					});
			},
			
			navigate: function(diff){
				
				if (this.disabled) 
					return;
				
				var cl = this.model.calendars,
					
					rmFn,
					addFn,
					anchorMonth,
					dStep
					;
					
				
				if (diff < 0) {
					addFn = 'unshift';
					rmFn = 'pop';
					anchorMonth = cl[0].date;
					dStep = -1;
				} else{
					
					addFn = 'push';
					rmFn = 'shift';
					anchorMonth = cl[cl.length - 1].date;
					dStep = 1;
				}

				var count = Math.abs(diff),
					i = count,
					monthes = []
					;
				while (--i > -1) 
					cl[rmFn]();
				
				
				i = count;
				while (monthes.length < 2 && --i > -1) {
					monthes.push(ruqq.date.math_Month(anchorMonth, diff));
					diff += dStep;
				}
				
				i = monthes.length;
				
				while (--i > -1) {
					cl[addFn](this.getDaysMatrix(monthes[i]));
				}
				
				
				//this.month.setMonth(this.month.getMonth() + diff);
				//
				//var month = this.month.getMonth(),
				//	year = this.month.getFullYear()
				//	;
				//	
				//this.model.month = MONTH[month];
				//this.model.year = year;
				//this.model.days = this.getDaysMatrix(year, month);
				
				this.select();
				
				Model
					.Appointments
					.resolveMonthes(this.getMonthes())
					.done(this._highlightMonth.bind(this))
					;
			},
			navigationDiff: function(date){
				
				var cl = this.model.calendars,
					diff;
				
				diff = ruqq.date.diff_Month(cl[0].date, date);
				if (diff < 0) 
					return diff;
				
				diff = ruqq.date.diff_Month(cl[cl.length - 1].date, date);
				
				if (diff > 0) 
					return diff;
				
				return 0;
			},
			select: function(type, date){
				
				this.type = type = (type || this.type);
				this.date = date = (date || this.date);
				
				var selector = String.format(
					'[data-date="%1-%2-%3"]',
					date.getMonth() + 1,
					date.getDate(),
					date.getFullYear()
				);
				
				var $el = this.$.find(selector),
					class_SEL = '__selected';
				
				if ($el.length === 0) 
					return false;
				
				this.$
					.find('.'+ class_SEL)
					.removeClass(class_SEL);
				
				switch(type){
					case select_WEEK:
						var $tr = $el.parent();
						if ($tr.hasClass(class_SEL)) 
							return false;
						
						$tr.addClass(class_SEL);
						break;
					case select_DAY:
						if ($el.hasClass(class_SEL)) {
							return false;
						}
						$el.addClass(class_SEL);
						break;
				}
				
				return true;
			},
			
			disabled: false,
			disable: function(){
				if (this.disabled)
					return;
				
				this.disabled = true;
				this.$.addClass('disabled');
			},
			
			enable: function(){
				this.disabled = false;
				this.$.removeClass('disabled');
			},
			
			selectRange: function(from, to){
				
				if (this.disabled) 
					this.enable();
				
				
				var class_SEL = '__selected';
				
				var fromDiff = this.navigationDiff(from),
					toDiff = to
						? this.navigationDiff(to)
						: fromDiff
						;
						
				if (fromDiff !== 0 && fromDiff === toDiff) {
					this.navigate(fromDiff);
				}
				
				
				this.$
					.find('.'+ class_SEL)
					.removeClass(class_SEL);
				
				if (to == null || from > to)
					return this._select(from);
				
				var start = new Date(from);
				
				while(!ruqq.date.isSameDay(start, to)){
					this._select(start);
					
					start.setDate(start.getDate() + 1);
				}
				this._select(start);
			},
			
			_select: function(date){
				var selector =  this._getSelector(date);
				
				var $el = this.$.find(selector),
					class_SEL = '__selected';
				
				$el.addClass(class_SEL);
			},
			_highlight: function(date){
				var selector = this._getSelector(date),
					$el = this.$.find(selector),
					clss_SEL = '__highlighted'
					;
				$el.addClass('__highlighted');
			},
			
			_getSelector: function(date){
				return String.format(
					'[data-date="%1-%2-%3"]',
					date.getMonth() + 1,
					date.getDate(),
					date.getFullYear()
				);
			},
			
			getCalendarsMatrix: function(date){
				var dm = /*date.getDate() < 14 ? -1 : */1,
					next = ruqq.date.math_Month(date, dm)
					;
				
				var arr = [
					this.getDaysMatrix(date),
					this.getDaysMatrix(next)
				];
				
				if (dm === -1) 
					arr.reverse();
				
				return arr;
			},
			
			getDaysMatrix: function(monthDate){
				
				var year = monthDate.getFullYear(),
					month = monthDate.getMonth()
					;
				
				var date = ruqq.date.create(year, month, 1),
					day = ruqq.date.getDay(date),
					days = ruqq.date.getDaysInMonth(date);
					
				var week_DAYS = 7,
					i = 0,
					j = 0
					;
					
				var array = [],
					row = [];
				
				var offset = ruqq.date.math_Day(date, -day),
					offsetStart = offset.getDate();
				for(i = 0; i < day; i++){
					row[i] = new DayInfo(offset, offsetStart++, 'offset');
				}
				
				day = 0;
				while(++day <= days){
					
					if (i > week_DAYS - 1) {
						array.push(row);
						row = [];
						i = 0;
					}
					
					row[i++] = new DayInfo(date, day);
				}
				
				offset = ruqq.date.math_Month(date, 1);
				day = 0;
				while(i < week_DAYS){
					row[i++] = new DayInfo(offset, ++day, 'offset');
				}
				
				array.push(row);
				
				return {
					date: monthDate,
					month: MONTH[month],
					year: year,
					days: array,
					dayNames: DAYS
				};
			},
			
			_highlightMonth: function(model){
				var termine = ruqq
					.arr
					.distinct(model.termine, function(a, b){
						return ruqq.date.isSameDay(a.start, b.start);
					});
				
				for (var i = 0, imax = termine.length; i < imax; i++){
					this._highlight(termine[i].start);
				}
			}
		}));

		function DayInfo(date, day, type){
			this.date = date;
			this.day = day;
			this.month = date.getMonth() + 1,
			this.year = date.getFullYear(),
			this.type = type || '';
			
			
			if (is_Today(this.year, this.month - 1, day))
				this.type += ' today';
			
			
			
		}

		function is_Today(year, month, day){
			return year 	=== _today.getFullYear()
				&& month 	=== _today.getMonth()
				&& day 		=== _today.getDate()
				;
		}
	});
