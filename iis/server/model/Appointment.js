var Appointment = include.exports = Class('Appointment', {
	Static: {
		
		getCalendars: function(user, calendars){
			if (calendars == null) 
				return [user.username];
			
			if (calendars === 'all') {
				return ruqq
					.arr
					.map(user.getCalendars(), function(x){
						return x.username;
					});
			}
			
			
			calendars = calendars.split(',');
				
			ruqq.arr.remove(calendars, function(x){
				var index = ruqq
					.arr
					.indexOf(user.getCalendars(), function(cal){
						return cal.username === x;
					});
				
				index === -1 && logger.warn('<dienst:filter> user has no calendar', x);
				
				return index === -1;
			});
				
			return calendars;
		},
		getRange: function(from, to){
			var from = ruqq.date.fromString(from),
				to = ruqq.date.fromString(to)
				;
			
			if (!from && !to) 
				return ruqq.date.getWeekRange();
				
			return {
				from: from,
				to: to
			};
		},
		checkWriteAccess: function(appointment, user){
			if (user.isInRole('admin'))
				return;
						
			if (!appointment.createdById) 
				return '"Appointment" not found or createdBy property not valid';
				
			if (appointment.createdById.toString() !== user._id.toString()) 
				return 'Only users, who created the Appointment, can remove it';
			
			var usernames, cal;
			
			if (appointment.username) 
				usernames = [appointment.username];
			
			if (appointment.usernames) 
				usernames = appointment.usernames;
			
			for (var i = 0, username, imax = usernames.length; i < imax; i++){
				username = usernames[i];
				
				cal = ruqq
					.arr
					.first(user.getCalendars(), function(x){
						return x.username === username;
					});
				
				if (cal == null) 
					return '<Access violation> - does not own the calendar:' + x; 
				
			}
			
		},
		searchDienste: function(Collection, user, params, callback){
			
			var range = this.getRange(params.from, params.to),
				calendars = this.getCalendars(user, params.calendars)
				;
			
			var $query = {
				date: {
					$gte: range.from,
					$lte: range.to
				},
				username: {
					$in: calendars
				}
			};
			return Collection
				.fetch({
					$query: $query
				})
				.done(function(coll){
					callback && callback(null, coll)
				})
				.fail(callback);
			
		},
		
		searchTermine: function(Collection, user, params, callback){
			var range = this.getRange(params.from, params.to),
				calendars = this.getCalendars(user, params.calendars)
				;
			
			var $query = {
				start: {
					$gte: range.from,
					$lte: range.to
				},
				usernames: {
					$elemMatch: {
						$in: calendars
					}
				}
			};
			
			var all = new Model.Termine,
				await = new Class.Await()
				;
			
			var termine = Model
				.Termine
				.fetch({
					$query: $query
				})
				.always(await.delegate('', false))
				;
			
			
			var rtermine = this
				.searchRTermine(range, calendars)
				.always(await.delegate('', false))
				;
				
			await
				.always(function(){
					
					var _termine = termine._resolved && termine._resolved[0],
						_rtermine = rtermine._resolved && rtermine._resolved[0]
						;
					
					all.push.apply(all, _termine);
					all.push.apply(all, _rtermine);
					
					if (await._rejected) {
						logger.error('<get:termine>', await._rejected);
					}
					
					
					callback && callback(await._rejected, all);
					all.resolve();
				});
				
			return all;
			
		},
		
		del: function(Ctor, user, id, callback){
			if (!id) 
				return callback('`Termin` ID is not defined');
			
			var termin = Ctor
				.fetch({_id: id})
				.done(checkAndRemove)
				.fail(callback)
				;
			
			function checkAndRemove(_termin){
				
				var err;
				
				if ((err = Appointment.checkWriteAccess(termin, user))) 
					return callback(err);
				
				termin
					.del()
					.done(function(){
						callback();
					})
					.fail(function(error){
						callback(error);
					});
			}
		},
		
		searchRTermine: function(range, calendars, callback){
			
			var days = [],
				dates = [],
				monthes = []
				;
			
			var start = new Date(range.from),
				i_day = -1,
				i_date = -1,
				i_month = -1,
				month
				;
				
			while (start < range.to) {
				
				if (i_day < 6) 
					days[++i_day] = start.getDay();
				
				if (i_date < 30) 
					dates[++i_date] = start.getDate();
				
				if (i_month < 11) {
					month = start.getMonth();
					if (monthes[i_month] !== month) 
						monthes[++i_month] = month;
				}
				
				start.setDate(start.getDate() + 1);
			}
			
			var query = {
				
				usernames: {
					$elemMatch: {
						$in: calendars
					}
				},
					
				$or: [
					{
						repeat: 'day'
					}, {
						repeat: 'week',
						repeatVal: {
							$in: days /* week days */
						}
					},{
						repeat: 'month',
						repeatVal: {
							$in: dates /* month date */
						}
					}, {
						repeat: 'year',
						repeatVal: {
							$in: monthes
						}
					}
				]
			};
			
			//logger.log('query', query);
			
			var dfr = new Class.Deferred();
			Model
				.RTermine
				.fetch({
					$query: query
				})
				.done(function(coll){
					
					
					var array = [],
						imax = coll.length,
						i = -1,
						
						termin, first
						;
					
					while ( ++i < imax ) {
						termin = coll[i];
						
						array = array.concat(Model.RTermin.repeat(termin, range));
					}
					
					var rtermine = new Model.RTermine(array);
					
					dfr.resolve(rtermine);
				})
				.fail(dfr.rejectDelegate())
				;
			
			return dfr;
		}
		
	}
});


function splitTermine(coll) {
	var i = -1,
		imax = coll.length;
	while (++i < imax) {
		
		if (coll[i].isOneDay()) 
			continue;
		
		var arr = coll[i].split();
		
		coll.splice.apply(coll, [i, 1].concat(arr));
		imax = coll.length;
	}
}
