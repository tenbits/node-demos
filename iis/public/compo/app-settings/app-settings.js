include 
	.load('app-settings.mask::Template') 
	.css('app-settings.less') 
	.done(function(resp){
		
		var _setts;
		
		var DienstPaletteDelegate = {
			create: function(art /* Type | Tag */) {
				
				return function(event) {
					var $palette = $(event.currentTarget);
						if ($palette.hasClass('__edit')) 
							return;
						
						
						this
							.model
							.editor['dienst' + art] = new Model.settings['Dienst' + art];
						
						$palette.addClass('__edit');
				};
			},
			
			save: function(art) {
				return function(event){
					
					event.stopPropagation();
					
					var $palette = $(event.currentTarget).closest('li');
					
					var type = this
						.model
						.editor
						['dienst' + art];
						
					var that = this,
						error;
						
					if ((error = Class.validate(type))) {
						alert(error);
						return;
					}
					
					var setts = Current.settings.dienst,
						exists = ruqq.arr.any(setts.types, 'name', '==', type.name);
					
					if (exists === false) 
						exists = ruqq.arr.any(setts.tags, 'name', '==', type.name);
					
					
					if (exists) {
						alert('Der Name ist schon vorhanden');
						return;
					}
					
					
					
					function signals(state){
						that.signalState('palette_Editor_Cancel', state);
						that.signalState('dienst' + art + '_Editor_Save', state);
					}
					
					signals(false);
					
					_setts
						.dienst
						[art.toLowerCase() + 's']
						.push(type);
					
					_setts
						.save()
						.done(function(){
							signals(true);
							$palette.removeClass('__edit');
						})
						;
					
				};
			},
			
			remove: function(art){
				return function(event){
					var type = $(event.currentTarget).closest('li').model(),
						types = _setts
						.dienst
						[art.toLowerCase() + 's'];
					
					var index = types.indexOf(type);
					
					if (confirm('Löschen ' + type.name + '?')) {
						
						types.splice(index, 1);
						
						_setts.save();	
					}
					
					
				};
			}
		}; // DienstPaletteHelper

	

		mask.registerHandler(':app-settings', Compo({
			template: resp.load.Template,

			compos: {
				'settsTabs': 'compo: #tabs-settings'
			},
			events: {
				'change: #radio-settings': function(event, $li){
					
					this
						.compos
						.settsTabs
						.setActive($li.getAttribute('name'))
						;
				},
				
				'change: .setts-calendar-range': function(event, data){
					
					Current
						.user
						.patch({
							$set: {
								'settings.calStart': data.from,
								'settings.calEnd': data.to
							}
						})
						.always(Notify.restStatus)
						;
				}
			},
			slots: {
				palette_Editor_Cancel: function(event){
					
					event.stopPropagation();
					
					$(event.currentTarget)
						.closest('li')
						.removeClass('__edit');
						
					
				},
				
				dienstType_Editor_New: DienstPaletteDelegate.create('Type'),
				dienstType_Editor_Save: DienstPaletteDelegate.save('Type'),
				dienstType_Editor_Remove: DienstPaletteDelegate.remove('Type'),
				
				dienstTag_Editor_New: DienstPaletteDelegate.create('Tag'),
				dienstTag_Editor_Save: DienstPaletteDelegate.save('Tag'),
				dienstTag_Editor_Remove: DienstPaletteDelegate.remove('Tag'),
				
				
				theme_Selected: function(theme){
					var user = Current.user;
					if (user._id == null) 
						return;
					user
						.patch({
							$set: {
								'settings.theme': theme
							}
						});
				}
				
			},
			//pipes: {
			//
			//},
			//constructor: function(){
			//
			//},

	        onRenderStart: function(model, cntx, container){
				
				this.model = {
					settings: _setts = model.settings,
						
					editor: {
						dienstType: {}
					},
					
					config: model.config,
					user: model.user
				};
				
	        },
	        onRenderEnd: function(elements, cntx, container){
	            // ..
	        }
		}));



});
