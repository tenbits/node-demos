include 
	.load('editor-appointment.mask::Template') 
	.css('editor-appointment.less') //
	.done(function(resp){

		mask.registerHandler(':editor-appointment', Compo({
			template: resp.load.Template,

			compos: {
				tabTypes: 'compo: #tabTypes',
				radioTypes: 'compo: #radioTypes',
				dienstUntil_Datepicker: 'compo: #dienstUntil_Datepicker'
				
			},
			events: {
				'change: .entryType': function(event, button){
					
					this.compos.tabTypes.setActive(button.name);
				}
			},
			slots: {
				btnDienstSave: function(){
					
					var dienst = this.model.dienst,
						type = this.model.dienstInfo.type
						;
					
					if (type === '') {
						debugger;
					}
					var property = 'type';
					if (ruqq.arr.any(Current.settings.dienst.tags, 'name', '==', type)) {
						property = 'tag';
					}
					
					dienst[property] = type;
					
					this.save('dienst', dienst);
				},
				
				btnTerminSave: function(){
					
					var appointment = this.model.termin;
					
					
					appointment.repeat = this.model.repeat.active
						? this.model.repeat.type
						: null
						;
					
					appointment = new Model
						.Termin(appointment.serialize())
						;
						
					if (appointment.repeat) 
						appointment.ensureRepeatVal();
					
					this.save('termin', appointment);
				},
				
				terminStartChange: function(){
					var termin = this.model.termin;
					if (termin.end <= termin.start) 
						termin.end = ruqq.date.math_Minute(termin.start, 15);
					
					this._calcTerminDuration();
				},
				terminEndChange: function(){
					var termin = this.model.termin;
					if (termin.start >= termin.end) {
						termin.end = ruqq.date.math_Minute(termin.start, 15);
					}
					this._calcTerminDuration();
				},
				
				dienstUntil_activeChanged: function(state){
					
					this.compos.dienstUntil_Datepicker.toggle(state);
				}
			},
			
			save: function(type, appointment){
				var that = this,
					err;
				
				if ((err = Class.validate(appointment))) 
					return compo.Notification.error(err);
				
				if (type === 'dienst' && this.model.dienstUntil.active) {
					var end = this.model.dienstUntil.end,
						days = ruqq.date.diff_Days(appointment.date, end)
						;
					
					if (days < 1) 
						return compo.Notification.error('Dienst Dauer nicht korrekt');
					
					var i = -1,
						coll = new Model.Dienste(),
						clone;
					while( ++i <= days ) {
						clone = appointment.clone();
						clone.date = ruqq.date.math_Day(appointment.date, i);
						coll.push(clone);
					}
					
					appointment = coll;
				}
				
				this.signalState('btnDienstSave', false);
				this.signalState('btnTerminSave', false);
				
				appointment
					.save()
					.done(function(str){
						
						appointment = typeof str === 'string'
							? new appointment.constructor(str)
							: str
							;
						
						if (appointment.each) {
							appointment.each(function(x){
								that.emitOut('editor_Created', type, x);
							});
							
						} else{
							
							that.emitOut('editor_Created', type, appointment);
						}
						
						return compo.Notification.success('Gespeichert');
					})
					.always(function(){
						that.signalState('btnDienstSave', true);
						that.signalState('btnTerminSave', true);
					});
			},
			

	        onRenderStart: function(model, cntx, container){
				
				var dienst = new Model.Dienst({
						username: Current.user.username
					}),
					termin = new Model.Termin({
						usernames: [Current.user.username]
					});
				
	            this.model = {
					dienst: dienst,
					termin: termin,
					
					user: Current.user,
					settings: Current.settings,
					
					repeat: {
						active: false,
						type: 'week'
					},
					
					dienstUntil: {
						active: false,
						end: new Date
					},
					dienstInfo: {
						type: dienst.type
					}
				};
				
				var dienstType = model.settings.dienst.types[0];
				this.defaultDienstType = dienstType && dienstType.name;
				
				if (model.terminStart) 
					this.model.termin.start = model.terminStart;
				
				if (model.terminEnd)
					this.model.termin.end = model.terminEnd;
				
				this._calcTerminDuration();
	        },
			
			reset: function(){
				
				this.model.dienst = new Model.Dienst({
					username: Current.user.username
				});
				this.model.termin = new Model.Termin({
					usernames: [Current.user.username]
				});
				
				this.showType('dienst');
				return this;
			},
	        
			editTermin: function(termin){
				
				this.model.termin = termin;
				
				
				this.model.repeat.active = termin.repeat;
				this.model.repeat.type = termin.repeat;
				
				
				this.showType('termin');
				return this;
			},
			
			editDienst: function(dienst){
				
				this.model.dienst = dienst;
				this.model.dienstUntil.active = false;
				this.model.dienstInfo.type = dienst.type || dienst.tag;
				 
				this.showType('dienst');
				return this;	
			},
			
			setTerminRange: function(from, to, username){
				var termin = this.model.termin;
				
				termin.start = from;
				termin.end = to;
				
				this._calcTerminDuration();
				
				return this;
			},
			
			setTermin: function(from, to, username){
				var termin = new Model.Termin({
					usernames: [username || Current.user.username],
					start: from,
					end: to
				});
				
				this.model.termin = termin;
				this._calcTerminDuration();
				
				return this;
			},
			
			setDienst: function(from, to, username){
				var dienst = new Model.Dienst({
					username: username || Current.user.username,
					date: from
				});
				
				if (to) {
					this.model.dienstUntil.active = true;
					this.model.dienstUntil.end = to;
				}
				
				this.model.dienst = dienst;
				
				var type = dienst.type || dienst.tag || this.defaultDienstType;
				this.model.dienstInfo.type = type;
				return this;
			},
			
			showType: function(type /* termin | dienst */){
				
				this.compos.tabTypes.setActive(type);
				this.compos.radioTypes.setActive(type);
				
				return this;
			},
			
			_calcTerminDuration: function(){
				var start = this.model.termin.start,
					end = this.model.termin.end
					;
				
				var MIN = 60 * 1000,
					HOUR = 60 * MIN,
					DAY = 24 * HOUR
					;
				
				var diff = end - start,
					days = (diff / DAY) >> 0,
					hours = (diff - days * DAY) / HOUR >> 0,
					mins = (diff - days * DAY - hours * HOUR) / MIN >> 0
					;
				
				var msg = '';
				
				if (days)
					msg += days + ' T. ';
				
				if (hours)
					msg += hours + ' Std. ';
					
				if (mins)
					msg += mins + ' Min. ';
				
				this.model.terminDuration = msg;
			}
		}));


	});
