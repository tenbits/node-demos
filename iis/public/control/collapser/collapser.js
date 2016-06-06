
include
	.css('./collapser.less')
	.done(function(){
				
		mask.registerHandler(':collapser', Compo({
			
			compos: {
				$content: '$: .-collapser-content',
				$header: '$: .-collapser-header'
			},
			events: {
				'click: ._do_collapse': function(event){
					var CLASS = '__collapsed'
						;
					
					var opened = !this
						.compos
						.$header
						.toggleClass(CLASS)
						.hasClass(CLASS);
					
					this.toggleContent(opened);
				}
			},
			
			
			toggleContent: function(state){
				
				var id = state ? 'show' : 'hide',
					animator = this.find('#collapser-' + id);
				
				if (animator) {
					
					animator.start(null, this.compos.$content.get(0));
					return;
				}
				
				this.compos.$content.toggle(state);
			}
		}));
		
	});
	