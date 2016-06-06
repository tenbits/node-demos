include 
	.css('/.reference/vendor/bootstrap-select/bootstrap-select.min.css')
	.js(
		'/.reference/vendor/bootstrap-select/bootstrap-select.min.js'
	) 
	.done(function(resp){

		
		mask.registerHandler(':select', Compo({
			tagName: 'select',
			
			isRendered_: false,
			value_: null,
			
			slots: {
				domInsert: function(){
					if (this.attr.multiple) {
						var $ = this.$;
						setTimeout(function(){
							$.selectpicker('refresh');
						});
					}
				}
			},
			
			onRenderEnd: function(elements, cntx, container){
				
				var mobile;
				
				if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) )
					mobile = 'mobile';
					
				
				$.fn.selectpicker.defaults.noneSelectedText = 'Bitte wählen';
				this
					.$
					.selectpicker(mobile)
					//.on('change', this.changed.bind(this));
				
				this.isRendered_ = true;
					
				if (this.value_) {
					this.setValue(this.value_);
				}
	        },
			
			changed: function(event){
				//event.stopPropagation();
				//event.preventDefault();
				
				//this.$.trigger('value-change', this.getValue());
				//return false;
			},
			
			setValue: function(value, deferred){
				
				if (deferred !== true) {
					
					var that = this;
					setTimeout(function(){
						
						if (value === 'Urlaub') {
							//that.$.selectpicker('val', value);
							//return;
							
						}
						
						that.setValue(value, true);
					})
					
					return;
				}
				
				if (!value) 
					return;
				
				if (this.isRendered_ !== true) {
					this.value_ = value;
					return;
				}
				
				
				var values = typeof value === 'string'
					? [ value ]
					: value
					;
			
				
				var arr = [];
				this
					.$
					.filter('select')
					.find('option')
					.each(function(){
						
						if (ruqq.arr.isIn(values, this.getAttribute('name')))
							arr.push(this.textContent);
					});
				
				var x = this.attr.multiple
					? arr
					: arr[0]
					;
				this.$.selectpicker('val', x);
			},
			
			getValue: function(){
				var val = this
					.$
					.selectpicker('val')
					;
					
				if (val instanceof Array === false) 
					val = [ val ];
				
				var arr = [];
				this
					.$
					.filter('select')
					.find('option')
					.each(function(){
						if (ruqq.arr.isIn(val, this.textContent))
							arr.push(this.getAttribute('name'));
					});
				
				
				return this.attr.multiple
					? arr
					: arr[0]
					;
			}
		}));


	});
