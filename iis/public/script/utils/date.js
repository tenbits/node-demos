(function(global){
	
	
	if (global.ruqq == null) 
		global.ruqq = {};
	
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
	
	var MONTH_SHORT = [
		'Jan',
		'Feb',
		'Mrz',
		'Apr',
		'Mai',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Okt',
		'Nov',
		'Dez',
	];
	
	var DAYS_SHORT =  [
		'So',
		'Mo',
		'Di',
		'Mi',
		'Do',
		'Fr',
		'Sa',
	];
	var DAYS = [
		'Sonntag',
		'Montag',
		'Dienstag',
		'Mittwoch',
		'Donnerstag',
		'Freitag',
		'Samstag',
	];
	
	var _today = new Date;
	
	global.ruqq.date = {
		_today: _today,
		getWeekRange: function(date){
			
			if (date == null) 
				date = new Date();
			else
				date = new Date(date);
			
			date.setDate(date.getDate() - this.getDay(date));
			date.setMilliseconds(0);
			date.setSeconds(0);
			date.setMinutes(0);
			date.setHours(0);
			
			
			var end = new Date(date);
			end.setDate(end.getDate() + 7);
			end.setSeconds(end.getSeconds() - 1);
			
			return {
				from: date,
				to: end
			};
		},
		
		getMonthRange: function(date){
			if (date == null) 
				date = new Date()
			else
				date = new Date(date);
				
			var start = new Date(date),
				end = new Date(date)
				;
					
			start.setDate(1);
			start.setMinutes(0);
			start.setSeconds(0);
			start.setMilliseconds(0);
			start.setHours(0);
			
			
			end = new Date(start);
			end.setMonth(end.getMonth() + 1);
			end.setDate(end.getDate() - 1);
			end.setHours(23);
			end.setMinutes(59);
			end.setSeconds(59);
			end.setMilliseconds(999);
			
			return {
				from: start,
				to: end
			};
		},
		
		getDayRange: function(date){
			var start = new Date(date),
				end = new Date(date)
				;
			
			start.setHours(0);
			start.setMinutes(0);
			start.setSeconds(0);
			start.setMilliseconds(0);
			
			end.setHours(23);
			end.setMinutes(59);
			end.setSeconds(59);
			end.setMilliseconds(999);
			
			return {
				from: start,
				to: end
			};
		},
		
		getYearRange: function(year){
			
			if (typeof year !== 'number' && year.getFullYear) {
				year = year.getFullYear();
			}
			
			var start = new Date(year, 0, 1),
				end = new Date(year, 11, 31, 23, 59);
			
			return {
				from: start,
				to: end
			};
		},
		
		create: function(year, month, day){
			var today = new Date;
			
			if (year == null) 
				year = today.getFullYear();	
			
			if (month == null) 
				month = today.getMonth();
			
			if (day == null) 
				day = today.getDate();
			
			return new Date(year, month, day);
		},
		
		getDay: function(date){
			var day = date.getDay();
			if (day === 0) 
				return 6;
			
			return day - 1;
		},
		
		getDayOfYear: function(date){
			var d= new Date(date.getFullYear(), 0, 0);
			
			return Math.floor( (date - d) / 86400000 );
		},
		
		getDaysInMonth: function(date){
			return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
		},
		
		getMiddnight: function(date){
			var x = new Date(date);
			x.setHours(0);
			x.setMinutes(0);
			x.setSeconds(0);
			return x;
		},
		
		setTime: function(date, hh, mm, ss){
			date.setHours(hh || 0);
			date.setMinutes(mm || 0);
			date.setSeconds(ss || 0);
			
			return date;
		},
		
		toTimestamp: function(date){
			return Math.round(+date / 1000);
		},
		
		fromTimestamp: function(timestamp){
			return new Date(timestamp * 1000);
		},
		fromString: function(str){
			if (!str) 
				return null;
			
			var date = new Date(str);
			
			return isNaN(date.getDay())
				 ? null
				 : date;
		},
		math_Day: function(date, days){
			var x = new Date(date);
			
			x.setDate(date.getDate() + days);
			return x;
		},
		math_Month: function(date, months){
			var x = new Date(date);
			
			x.setMonth(date.getMonth() + months);
			return x;
		},
		math_Minute: function(date, mins){
			var x = new Date(date);
			
			x.setMinutes(x.getMinutes() + mins);
			return x;
		},
		
		diff_Month: function(a, b){
			return b.getMonth() - a.getMonth() + (12 * (b.getFullYear() - a.getFullYear()));
		},
		
		diff_Minutes: function(a, b){
			return (b - a) / (60 * 1000) | 0
		},
		
		diff_Days: function(a, b){
			return Math.round((this.getMiddnight(b) - this.getMiddnight(a)) / (24 * 60 * 60 * 1000));
		},
		
		format: function(date, format){
			
			var _year = date.getFullYear(),
				_month = date.getMonth(),
				_date = date.getDate(),
				_day = date.getDay(),
				_hour = date.getHours(),
				_min = date.getMinutes(),
				_sec = date.getSeconds()
				;
			
			format = format
				.replace('Mm', MONTH_SHORT[_month])
				.replace('MMM', MONTH[_month])
				.replace('MM', pad(_month + 1))
				.replace('yyyy', _year)
				.replace('yy', _year % 100)
				.replace('dd', pad(_date))
				.replace('Dd', DAYS_SHORT[_day])
				.replace('DD', DAYS[_day])
				.replace('HH', pad(_hour))
				.replace('hh', pad(_hour))
				.replace('mm', pad(_min))
				.replace('ss', pad(_sec))
				;
			
			return format;

		},
		
		isToday: function(date){
			return date.getDate() === _today.getDate()
				&& date.getMonth() === _today.getMonth()
				&& date.getFullYear() === _today.getFullYear()
				;
		},
		isThisMonth: function(date){
			return date.getMonth() === _today.getMonth()
				&& date.getFullYear() === _today.getFullYear()
				;
		},
		isSameDay: function(a, b){
			return a.getDate() === b.getDate()
				&& a.getMonth() === b.getMonth()
				&& a.getFullYear() === b.getFullYear()
				;
		},
		isSameMonth: function(a, b){
			return a.getMonth() === b.getMonth()
				&& a.getFullYear() === b.getFullYear()
				;
		},
		
		next_Day: function(date, wDay){
			var current = date.getDay();
			if (current <= wDay) 
				return wDay - current;
			
			return 7 - current + wDay;
		},
		
		next_Date: function(date, mDate) {
			var current = date.getDate();
			if (current <= mDate) 
				return mDate - current;
			
			var days = ruqq.date.getDaysInMonth(date);
			
			return days - current + mDate;
		}
	};
	
	function pad(value) {
		return value > 9 ? value : '0' + value;
	}
	
}(typeof window !== 'undefined' ? window : global));