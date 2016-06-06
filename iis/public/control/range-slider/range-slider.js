include 
	.css(
		'/.reference/vendor/ion.rangeSlider/css/ion.rangeSlider.css',
		'/.reference/vendor/ion.rangeSlider/css/ion.rangeSlider.skinFlat.css'
	)
	.js(
		'/.reference/vendor/ion.rangeSlider/js/ion.rangeSlider.min.js'
	) 
	.done(function(resp){
		
		mask.registerHandler(':range-slider', Compo({
			tagName: 'input',
			
			slots: {
				domInsert: function(){
			
					var that = this;
					
					this.slider = this
						.$
						.ionRangeSlider({
							
							min: this.attr.min,
							max: this.attr.max,
							from: +this.attr.from,
							to: +this.attr.to,
							type: 'double',
							postfix: 'Uhr',
							
							onFinish: function(obj){
								
								that.$.trigger('change', {
									from: obj.fromNumber,
									to: obj.toNumber
								});
							}
						})
						;
				}
			}
		}));

	});
