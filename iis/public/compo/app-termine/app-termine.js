include 
	.load('app-termine.mask::Template') 
	.css('app-termine.less') //
	.done(function(resp){

		mask.registerHandler(':app-termine', Compo({
			template: resp.load.Template,
			
			model: 'client:all',
			compos: {
				dialogEditor: 'compo: :dialog'
			},
			events: {
				'click: .btnUserEdit': function(event){
					
					this.model.user = $(event.currentTarget).model();
					this.compos.dialogEditor.show();
				},
				
				'click: .btnUserRemove': function(event){
					
					var user = $(event.currentTarget).model();
					
					if (confirm('Termin löschen ?')) {
						
						var index = this.model.users.indexOf(user);
						
						if (index !== -1) {
							
							user
								.del()
								//.fail(Noty.error)
								;
								
							this.model.users.splice(index, 1);
						}
					}
					
				},
				
				
			},
			slots: {
				userCreateNew: function(){
					
					this.model.user = new Model.User();
					this.compos.dialogEditor.show();
				},
				
				dialogSave: function(){
					
					var err, that = this;
					
					if ((err = Class.validate(this.model.user)) == null){
						
						that.signalState('dialogSave', false);
						
						var user = this
							.model
							.user
							.save()
							.done(function(){
								that.model.users.push(user);
								that.compos.dialogEditor.hide();
								
							})
							.always(function(){
								that.signalState('dialogSave', true);
							})
							
					} else{
						console.error('<save>', err);
					}
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
					termine: Model
						.Users
						.fetch()
						.done(resume),
						
					termin: new Model.Termin()
				};
	        },
	        onRenderEnd: function(elements, cntx, container){
	            // ..
	        }
		}));


	});
