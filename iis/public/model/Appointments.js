(function(){
		
	
	var Termine = Class('Termine'),
		RTermin = Class('RTermin'),
		RTermine = Class('RTermine'),
		Dienste = Class('Dienste')
		;
	
	function Id(date){
		
		return date.getFullYear() + '-' + date.getMonth();
	}
	
	
	var Store = Class({
		Construct: function(Collection){
			this.Coll = Collection
			this.store = {};
		},
		
		resolveMonth: function(date){
			var id = Id(date);
			
			if (this.store[id]) 
				return this.store[id];
			
			
			var Collection = this.Coll,
				range,
				coll
				;
			
			range = ruqq.date.getMonthRange(date);
			range.calendars = 'all';
			
			
			return (this.store[id] = Collection.fetch(range));
		},
		
		putMonth: function(date, collection){
			this.store[Id(date)] = collection;
		},
		
		putAppointment: function(appointment){
			var date = appointment.date || appointment.start,
				id = Id(date);
			
			var store = this.store[id];
			if (store == null) 
				return;
			
			var i = -1,
				imax = store.length;
			
			while ( ++i < imax ) {
				if (store[i]._id === appointment._id) 
					return;
			}
			
			store.push(appointment);
		},
		getById: function(id){
			var arr, ap;
			function selector(ap){
				return ap._id.toString() === id.toString();	
			}
			
			for (var month in this.store){
				arr = this.store[month];
				ap = ruqq.arr.first(arr, selector);
				
				if (ap) 
					return ap;
			}
		},
		
		getRepeated: function(appointment){
			var out = [],
				key, arr;
			function selector(item) {
				return item._id === appointment._id && (item !== appointment);
			}
			
			for (var month in this.store) {
				out = out.concat(ruqq.arr.where(this.store[month], selector));
			}
			
			return out;
		},
		
		remove: function(ap){
			function matcher(x){
				return x._id.toString() === ap._id.toString();	
			}
			
			for (var month in this.store){
				ruqq.arr.remove(this.store[month], matcher)
			}
		}
	});
	
	var _dienste = new Store(Dienste),
		_termine = new Store(Termine),
		_months = {}
		
		;
	
	var Appointments = Class('Appointments', {
		Static: {
			resolveMonthes: function(arr, type){
				var await = new Class.Await(),
					i = arr.length,
					dfr = new Class.Deferred()
					;
				var termine = new Termine,
					dienste = new Dienste
					;
				while (--i) {
					this
						.resolveMonth(arr[i], type)
						.done(function(model){
							termine = termine.push.apply(termine, model.termine);
							dienste = dienste.push.apply(dienste, model.dienste);
						})
						.always(await.delegate())
				}
				
				await.always(function(){
					dfr.termine = termine;
					dfr.dienste = dienste;
					dfr.resolve(dfr);
				});
				
				return dfr;
			},
			resolveMonth: function(date, type){
				
				if (Array.isArray(date)) 
					return this.resolveMonthes(date, type);
				
				var id = Id(date);
				if (_months[id]) 
					return _months[id];
				
				var await = new Class.Await(),
					dfr = new Class.Deferred(),
					
					termine, dienste;
					
				if (type !== 'dienste') 
					termine = _termine.resolveMonth(date);
					
				if (type !== 'termine') 
					dienste = _dienste.resolveMonth(date);
					
				
				if (type == null) 
					_months[id] = dfr;
				
				
				termine &&
					termine.always(await.delegate());
				
				dienste &&
					dienste.always(await.delegate());
				
				await.always(function(){
					
					var model = {
						termine: termine,
						dienste: dienste
					};
					
					dfr.termine = termine;
					dfr.dienste = dienste;
					dfr.resolve(dfr);
				})
				
				return dfr;
			},
			
			resolveRange: function(start, end){
				var await = new Class.Await(),
					dfr = new Class.Deferred(),
					startModel = this.resolveMonth(start),
					endModel = end && this.resolveMonth(end)
					;
				
				startModel
					.always(await.delegate());
				
				
				endModel && endModel
					.always(await.delegate());
				
				await.always(function(){
					var termine,
						dienste
						;
					
					function terminSelector(termin){
						return end 
							? termin.start >= start && termin.start <= end
							: ruqq.date.isSameDay(termin.start, start)
							;
					}
					function dienstSelector(dienst){
						return end
							? dienst.date >= start && dienst.date <= end
							: ruqq.date.isSameDay(dienst.date, start)
							;
					}
					
					termine = ruqq.arr.where(startModel.termine, terminSelector);
					dienste = ruqq.arr.where(startModel.dienste, dienstSelector);
					
					if (endModel && startModel !== endModel) {
						termine = termine.concat(
							ruqq.arr.where(endModel.termine, terminSelector)
						);
						
						dienste = dienste.concat(
							ruqq.arr.where(endModel.dienste, dienstSelector)
						);
					}
					
					dfr.resolve({
						termine: termine,
						dienste: dienste
					});
				});
				
				return dfr;
				
			},
			
			registerMonth: function(type, date, coll){
				var _coll = type === 'dienste'
					? _dienste
					: _termine
					;
				
				if ('termine' === type) 
					coll.splitTermine();
				
				_coll.putMonth(date, coll);
			},
			
			add: function(type, appointment){
				switch(type){
					case 'dienst':
						_dienste.putAppointment(appointment);
						break;
					case 'termin':
						_termine.putAppointment(appointment);
						break;
					default:
						alert(type);
						return;
				}
			},
			change: function(type, appointment){
				
				if ('termin' === type && appointment.repeat) {
					var cloneTime = Model.RTermin.Util.cloneTime;
					_termine
						.getRepeated(appointment)
						.forEach(function(cloned){
							cloneTime(cloned.start, appointment.start);
							cloneTime(cloned.end, appointment.end);
						});
						
					return;
				}
				
			},
			getById: function(type, id){
				var coll = type === 'termin'
					? _termine
					: _dienste
					;
				
				return coll.getById(id);
			},
			ensureWritePrevs: function(appointment){
				
				if (Current.user._id === appointment.createdById) 
					return true
				
				window.compo.Notification.warn('Keine Berechtigung');
				return false;
			},
			remove: function(type, id){
				var coll, Collection;
				
				if ('termin' === type) {
					coll = _termine;
					Collection = Model.Termin;
				} else {
					coll = _dienste;
					Collection = Model.Dienst;
				}
				
				var appointment = coll.getById(id);
				
				if (appointment == null) 
					return false;
				
				if (this.ensureWritePrevs(appointment) === false) 
					return false;
				
				appointment
					.del()
					.done(function(){
						compo.Notification.success('Deleted');
					})
					;
				
				coll.remove(appointment);
				return true;
			}
		}
	});
	
	
	if (include.isBrowser) {
		
		RTermin.on('save', function(termin){
			
			Appointments.change('termin', termin);
		});
	}
	
}());
