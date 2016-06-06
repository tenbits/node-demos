include
	.js(
		'../filereader-input/filereader-input.js',
		'/node_modules/ical/ical.js'
	)
	.load('ical-importer.mask::Template') 
	.css('ical-importer.less') //
	.done(function(resp){
		
		function ical_getProperty(obj, property) {
			
			var param,
				param_i = property.indexOf(';');
			if (param_i !== -1) {
				param = property.slice(param_i + 1);
				property = property.substring(0, param_i);
			}
			
			var parts = property.split('.'),
				imax = parts.length,
				i = -1,
				val = obj
				;
			
			while(++i < imax){
				val = val[parts[i]];
				
				if (val == null) 
					return null;
			}
			
			if (param) {
				return typeof val === 'object'
					? val.params && val.params[param]
					: null;
			}
			
			return typeof val === 'object'
				? val.val
				: val
				;
		}

		mask.registerHandler(':ical-importer', Compo({
			template: resp.load.Template,

			compos: {
				'dialog': 'compo: :dialog'
			},
			
			busy: false,
			newDienste: null,
			
			slots: {
				fileReader_onRead: function(sender, source){
					
					if (this.busy) 
						return;
					
					var calendar = ical.parseICS(source);
					if (calendar== null || Array.isArray(calendar.VEVENT) === false) {
						sender.model.message = 'Invalid format';
						return;
					}
					
					if (calendar.VEVENT.length < 1) {
						sender.model.message = 'Schichte wurden nicht gefunden';
						return;
					}
					
					this.busy = true;
					
					var dienste = ruqq.arr.map(calendar.VEVENT, function(event){
						var dienst = new Model.Dienst()
						
						dienst.username = ical_getProperty(event, 'ATTENDEE');
						var CN = ical_getProperty(event, 'ATTENDEE;CN');
						if (CN) {
							CN = CN.split(' ');
							dienst.name = CN[0];
							dienst.surname = CN[1];
						}
						
						dienst.type = ical_getProperty(event, 'SUBJECT');
						dienst.date = event.start;
						
						return dienst;
					});
					
					dienste = new Model.Dienste(dienste);
					
					var that = this;
					Model
						.Dienste
						.import(dienste)
						.done(function(statuses){
							
							var json = new Model.Dienste(statuses);
							
							that.resolveImport(json);
						});
					
					
				},
				
				dialogCancel: function(){
					
					if (this.newDienste) 
						window.location.reload();
				}
			},
			
			show: function(){
				this.compos.dialog.show();
			},
			//pipes: {
			//
			//},
			//constructor: function(){
			//
			//},

			onRenderStart: function(model, ctx, container){
				// ..
			},
			onRenderEnd: function(elements, model, ctx, container){
				// ..
			},
			
			resolveImport: function(status){
				this
					.$
					.find('.statuses')
					.emptyAndDispose()
					.appendMask(':import #import-statuses;', {
						statuses: status
					});
				
				this.busy = false;
				
				this.newDienste = ruqq.arr.any(status, function(x){
					return x.status === 'success';
				});
				////
				////if (hasDienste) {
				////	this.emitOut('icalImporter_saved');
				////}
			}
			
		}));


	});
