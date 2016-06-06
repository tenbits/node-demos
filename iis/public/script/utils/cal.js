(function(global){
	
	
	if (global.ruqq == null) 
		global.ruqq = {};
	
	global.ruqq.cal = {
		
		roundTopPos: function(top, containerHeight, calStart, calEnd){
			
			if (calStart == null) {
				calStart = Current.user.settings.calStart;
				calEnd = Current.user.settings.calEnd;
			}
			
			var percent = top / containerHeight,
				minutes = (calEnd - calStart) * 60,
				total = minutes;
				
			minutes *= percent;
			minutes = ruqq.math.roundToDivisor(minutes, 15);
			percent = minutes / total;
			
			return percent * 100;
		},
		
		minutesFromPercent: function(percent, height){
			var calStart = Current.user.settings.calStart,
				calEnd = Current.user.settings.calEnd
				;
			
			return (calEnd - calStart) * 60 * percent / 100;
		},
		
		getTerminDisplay: function (calendars, termin, cellHeight, startHours, endHours, $day){
			var cal_start = ruqq.date.setTime(new Date(termin.start), startHours, 0, 0),
				end = ruqq.date.setTime(new Date(termin.start), endHours, 0, 0),
				
				termin_start = termin.start,
				termin_end = termin.end,
				
				cal_height = cellHeight * (endHours - startHours)
				;
				
			
			
			if (cal_start > termin_start) {
				$day.hiddenBottom++;
				termin_start = cal_start
			}
			
			if (cal_start > termin_end) {
				return { klass: 'hidden' };
			}
			
			if (end < termin_end) {
				$day.hiddenTop++;
				termin_end = end;
			}
			
			if (end < termin_start) { 
				return { klass: 'hidden' };
			}
			
			
			var diff = termin_start - cal_start,
				
				top,
				height,
				min_height;
			
			top = diff / (end - cal_start) * 100;
			
			diff = termin_end - cal_start
			height = diff / (end - cal_start) * 100 - top;
			
			min_height = 18 / cal_height * 100;
			
			if (height < min_height) {
				height = min_height;
			}
			
			var calendar = ruqq.arr.first(calendars, function(calendar){
				return termin.usernames.indexOf(calendar.username) !== -1;
			});
			
			var klass = '';
			if (termin._split) {
				
				if (termin._split.hasBottom) 
					klass += ' cl-termin-split-hasBottom';
				
				if (termin._split.hasTop) 
					klass += ' cl-termin-split-hasTop';
				
			}
			
			return {
				width: 95,
				height: height,
				
				top: top,
				period: termin.formatPeriod(),
					
				color: termin.color || ruqq.color.randomRGB(),
				userColor: calendar.color,
				
				klass: klass
			};
		},
		
		
		group_terminePerCalendar: function(termine, calendars){
			return ruqq.arr.aggr(calendars, [], function(calendar, aggr){
					
				aggr.push({
					
					username: calendar.username,	
					termine:  ruqq.arr.where(termine, function(termin){
						return termin.usernames.indexOf(calendar.username) !== -1;
					})
				});
			});
		},
		
		group_positionTermine: function(group){
			var termine = group.termine;
			
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
				
				if (max < termine[i + 1].start) {
					max = null;
					groups.push(group);
					group = [];
					continue;
				}
			}
			
			groups.push(group);
			
			ruqq.arr.each(groups, termin_positionGroup);
		},
		
		filter_terminePerDay: function(date, termine, calendars){
			return ruqq.arr.where(termine, function(termin){
				if (!ruqq.date.isSameDay(date, termin.start))
					return false;
				
				if (!ruqq.arr.any(calendars, function(cal){
						return termin.usernames.indexOf(cal.username) !== -1
					})) {
					
					return false;
				}
				
				return true;
			});
		}
	};
	
	
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
	
}(typeof window !== 'undefined' ? window : global));