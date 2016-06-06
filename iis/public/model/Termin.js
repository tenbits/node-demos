(function(){
	
		
	var Termin = Class('Termin',{
		Base: Class.Serializable({
			start: Date,
			end: Date
		}),
		Store: include.isBrowser
			? Class.Remote('/rest/termin/?:id')
			: null
			,
		
		Construct: function(json){
			
			if (json) {
				
				if (json.repeat && this.constructor === Termin) 
					return new Model.RTermin(json);
				
				if (!json.repeat) {
					delete json.repeat;
					delete json.repeatVal;
				}
			
				if (!json.start) 
					this.start = minutes_round(ruqq.date._today, 15);
				
				if (!json.end)	
					this.end = minutes_round(ruqq.date._today, 30);
					
			}
			
		},
		
		// hold `start` and `end` properties for a multiple-day termin 
		_split: null,
		
		usernames: [],
		start: null,
		end: null,
		
		title: '',
		description: '',
		location: '',
		
		tags: [],
		createdById: null,
		createdBy: '',
		createdOn: null,
		
		Validate: function(){
			if (!(this.usernames && this.usernames.length))
				return 'No calendars for the `Termin`';
			
		},
		
		isOneDay: function(){
			
			return this.start.getMonth() === this.end.getMonth()
				&& this.start.getDate() === this.end.getDate()
				;
		},
		
		split: function(){
			// split multiple day termine
			
			var start = new Date(this.start),
				end = new Date(this.end),
				
				termin_start = new Date(this.start),
				termin_end = new Date(this.end),
				
				arr = [],
				termin
				;
			
			function getSplitMeta(hasBottom, hasTop) {
				return {
					start: new Date(termin_start),
					end: new Date(termin_end),
					hasBottom: hasBottom,
					hasTop: hasTop
				};
			}
			
			termin = this.clone();
			termin._split = getSplitMeta(false, true);
			termin.start = new Date(start);
			termin.end = ruqq.date.setTime(new Date(start), 23, 59, 59);
			
			arr.push(termin);
			
			start.setDate(start.getDate() + 1);
			while (!ruqq.date.isSameDay(start, end)) {
				
				termin = this.clone();
				termin._split = getSplitMeta(true, true);
				termin.start = ruqq.date.setTime(new Date(start), 0, 0, 0);
				termin.end = ruqq.date.setTime(new Date(start), 23, 59, 59);
				
				arr.push(termin);
				start.setDate(start.getDate() + 1);
			};
			
			termin = this.clone();
			termin._split = getSplitMeta(true, false);
			termin.start = ruqq.date.setTime(new Date(start), 0, 0, 0);
			
			arr.push(termin);
			
			return arr;
		},
		
		formatPeriod: function(){
			var start = this.start,
				end = this.end;
			
			if (this._split) {
				start = this._split.start;
				end = this._split.end;
			}
			
			return ruqq.date.format(start, 'HH:mm')
				+ '-'
				+ ruqq.date.format(end, 'HH:mm')
				;
		},
		
		periodInMinutes: function(){
			return ruqq.date.diff_Minutes(this.start, this.end);
		},
		
		clone: function(){
			var Ctor = this.constructor;
			
			return new Ctor(this.serialize());
		}
	});
	
	
		
	Class.Collection('Termine', Class('Termin'), {
		Base: Class.Serializable,
		Store: include.isBrowser
			? Class.Remote('/rest/termine?from=:from&to=:to&calendars=:calendars')
			: null,
		
		splitTermine: function(){
			splitTermine(this);
			
			return this;
		},
		
		Override: {
			
			fetch: function(){
				
				this
					.super(arguments)
					.done(splitTermine)
					;
				
				return this;
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
	
	function minutes_round(date, diff) {
		date = new Date(date);
		
		var mins;
				
		mins = date.getMinutes();
		mins = mins - mins % 15 + diff;
		date.setMinutes(mins);
		
		return date;
	}
}());