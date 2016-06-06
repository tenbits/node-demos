include 
	.load('app.mask::Template') 
	.css('app.less') //
	.done(function(resp){
		var _today = new Date;
		
		mask.registerHandler(':app', Compo({
			template: resp.load.Template,
			mode: 'client',
			compos: {
				calendar: 'compo: :calendar'
			},
			events: {
				'change: #calendar-view-type': function(event, button){
					
					ruta.navigate(button.name);
					//this.compos.calendar.setView(button.name);
				}
			},
			pipes: {
				calendar: {
					dayShow: function(event){
						this.find('#calendar-view-type').setActive('day');
					},
					rangeChange: function(calendar, start, end){
						var _start = ruqq.date.format(start, 'Mm dd, yyyy'),
							_end = end && ruqq.date.format(end, 'Mm dd, yyyy')
							;
						
						var msg = _start;
						if (_end) {
							if (start.getFullYear() === end.getFullYear()) {
								_start = _start.substring(0, _start.indexOf(','))
							}
							if (start.getMonth() === end.getMonth()) {
								_end = _end.substring(_end.indexOf(' ') + 1);
							}
							
							msg = _start + ' - ' + _end;
						}
							
							
						this.model.titleCalendarRange = msg;
						this.model.todayIsInRange = this.isTodayInRange(start, end);
					}
				}
			},
			
			slots: {
				navNext: function(){
					this.emitIn('calendarNavNext');
				},
				navPrev: function(){
					this.emitIn('calendarNavPrev');
				},
				navToday: function(){
					this.emitIn('calendarNavToday');
				},
				
				termin_Create: function(){
					this
						.find('#dialog-create')
						.show()
						.find(':editor-appointment')
						.reset()
						;
						
				},
				
				termin_Edit: function(sender, termin){
					
					if (Model.Appointments.ensureWritePrevs(termin) === false) 
						return;
					
					
					this
						.find('#dialog-create')
						.show()
						.find(':editor-appointment')
						.editTermin(termin)
						;
				},
				
				dienst_Edit: function(sender, dienst){
					
					if (Model.Appointments.ensureWritePrevs(dienst) === false) 
						return;
					
					this
						.find('#dialog-create')
						.show()
						.find(':editor-appointment')
						.editDienst(dienst)
						;
				},
				
				timeline_selectRange: function(sender, startTime, endTime, username){
					
					this
						.find('#dialog-create')
						.show()
						.find(':editor-appointment')
						.reset()
						.setTermin(startTime, endTime, username)
						.showType('termin')
						;
				},
				
				timeline_selectRangeMonth: function(sender, startTime, endTime, username){
					this
						.find('#dialog-create')
						.show()
						.find(':editor-appointment')
						.reset()
						.setDienst(startTime, endTime, username)
						.showType('dienst')
						;
				},
				
				editor_Created: function(sender, type, appointment){
					this.find('#dialog-create').hide();
					
					Model
						.Appointments
						.add(type, appointment);
					
					this.emitIn('calendarRefresh');
				},
				
				gearImport: function(){
					
					this
						.find(':ical-importer')
						.show();
				},
				
				icalImporter_saved: function(){
					
					//window.location.reload();
				}
			},
			
	        onRenderStart: function(model, ctx, container){
				
				ruta
					.setRouterType('hash')
					.add('/?:range', this.applyFilter.bind(this))
					;
					
				var route = ruta.current();
				
				
				model.range = route.current.params.range || 'week';
	            model.todayIsInRange = true;
	        },
			onRenderStartClient: function(){
				
			},
	        onRenderEnd: function(elements, cntx, container){
	            
	        },
			
			applyFilter: function(route){
				
				this.compos.calendar.setView(route.current.params.range);
			},
			
			isTodayInRange: function(from, to){
				if (to == null) 
					return ruqq.date.isToday(from);
				
				
				return _today >= from && _today <= to;
			}
		}));


	});
