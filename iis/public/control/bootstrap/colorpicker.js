include 
	.css('/.reference/vendor/bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css')
	.js(
		'/.reference/vendor/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js'
	) 
	.done(function(resp){

		var Template = ".form-group > \
				.input-group.colorpicker-component data-color='~[color]' {\
					input.form-control type=text readonly placeholder=Color;\
					span.input-group-addon > \
						i style='background-color: ~[color]';\
				}";
		
		mask.registerHandler(':colorpicker', Compo({
			
			$picker: null,
			color: null,
	        onRenderStart: function(model){
				
				if (this.nodes) {
					this.nodes = jmask(Template)
						.children()
						.append(this.nodes);
				} else{
					
					this.nodes = jmask(Template)
				}
				
	        },
	        onRenderEnd: function(elements, cntx, container){
				this.$picker = this
					.$
					.filter('.input-group')
					.colorpicker()
					;
	        },
			
			// dateChanged: function(event){
				
			// 	this.$.trigger('change', this.getColor());
			// 	return false;
			// },
			
			setColor: function(color){
				
				if (this.color === color)
					return;
				
				this.color = color;
				
				if (this.$picker == null) 
					return;
				
				
				this
					.$picker
					.colorpicker('setValue', color)
					;
			},
			
			getColor: function(){
				
				return this
					.$
					.find('input')
					.get(0)
					.value
					;
			}
		}));


	});
