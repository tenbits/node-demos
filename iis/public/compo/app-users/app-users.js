include 
	.load('app-users.mask::Template') 
	.css('app-users.less') //
	.done(function(resp){

		mask.registerHandler(':app-users', Compo({
			template: resp.load.Template,
			
			model: 'client:all',
			compos: {
				dialogEditor: 'compo: :dialog'
			},
			events: {
				'click: .btnUserEdit': function(event){
					
					this.model.user = $(event.currentTarget).model();
					this.model.dialogTitle = 'Mitarbeiter Editiren';
					this.model.dialogMode = 'edit';
					
					this.compos.dialogEditor.show();
				},
				
				'click: .btnUserRemove': function(event){
					
					var user = $(event.currentTarget)
						.model();
					
					var input = prompt('Es werden Profil und alle Daten gelöscht. \nBitte `OK` eingeben');
					if (input === 'OK') {
						
						var index = this.model.users.indexOf(user);
						
						if (index !== -1) {
							
							user.del();
									
							this.model.users.splice(index, 1);
						}
					} else if (input != null) {
						setTimeout(function(){
							alert('`OK` wurde erwartet. \nEingegeben: `' + input + '`');
						});
					}
				},
			},
			slots: {
				userCreateNew: function(){
					
					this.model.user = new Model.User();
					this.model.dialogTitle = 'Neuer Mitarbeiter';
					this.model.dialogMode = 'new';
					this.compos.dialogEditor.show();
				},
				
				dialogSave: function(){
					
					var err,
						that = this,
						model = this.model,
						compos = this.compos,
						isNew = !model.user._id
						;
					if ((err = Class.validate(model.user)))
						return Notify.restError(err);
					
					model.user.role = this.$.find('#chbIsAdmin').is(':checked')
						? 'admin'
						: ''
						;
					that.signalState('dialogSave', false);
					
					var user = model
						.user
						.save()
						.done(function(user){
							
						
							if (isNew)	
								model
									.users
									.push(new Model.User(user));
								
							compos.dialogEditor.hide();
						})
						.always(function(){
							that.signalState('dialogSave', true);
						})
						
				},
				
				viewPassword: function(event){
					var $this = $(event.currentTarget),
						$input = $this.prev();
					
					var doOpen = $this
						.toggleClass('glyphicon-eye-open glyphicon-eye-close')
						.hasClass('glyphicon-eye-close')
						;
					
					$input.get(0).type = doOpen
						? 'text'
						: 'password'
						;
				}
			},
			//pipes: {
			//
			//},
			//constructor: function(){
			//
			//},

	        onRenderStart: function(model, cntx, container){
	            
				var resume = Compo.pause(this, cntx);
				
				this.model = {
					users: Model
						.Users
						.fetch()
						.done(resume),
						
					user: new Model.User(),
					
					dialogTitle: '',
					dialogMode: ''
				};
	        },
	        onRenderEnd: function(elements, cntx, container){
	            // ..
	        }
		}));


	});
