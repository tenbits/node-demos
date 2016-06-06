include 
	.css('/.reference/vendor/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css')
	.js(
		'/.reference/vendor/bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js',
		'/.reference/vendor/bootstrap-datetimepicker/src/js/locales/bootstrap-datetimepicker.de.js'
	) 
	.done(function(resp){
		
		var pattern_NAMES = {
			'yyyy': 'FullYear',
			'MM': 'Month',
			'dd': 'Date',
			'mm': 'Minutes',
			'hh': 'Hours'
		};
		
		var key_UP = 38,
			key_DOWN = 40,
			key_LEFT = 37,
			key_RIGHT = 39,
			key_TAB = 9
			;
		
		var Template = ".form-group > \
				.input-group.date{\
					input.form-control type=text;\
					span.input-group-addon > \
						span.glyphicon.glyphicon-calendar;\
				}";
		
		$
			.fn
			.datetimepicker
			.defaults
			.pickSeconds = false;
		
		mask.registerHandler(':datepicker', Compo({
			
			events: {
				'focus: input': function(event){
					var that = this;
					
					setTimeout(function(){
						that.range_Select(event.target);
					});
					
				},
				
				'click: input': function(event){
					this.range_Select(event.target);
				},
				
				'keydown: input': function(event){
					var which = event.which,
						input = event.target,
						
						nav,
						diff
						;
					
					if (key_TAB === which) {
						which = event.shiftKey
							? key_LEFT
							: key_RIGHT
							;
					}
					
					if (key_LEFT === which) 
						nav = this.range.start - 2;
						
					
					if (key_RIGHT === which) 
						nav = this.range.start + this.range.name.length + 2;
					
					
					if (nav == null && key_UP === which) 
						diff = 1;
					
					if (nav == null && key_DOWN === which) 
						diff = -1;
						
					if (nav == null && diff == null) 
						return;
					
					
					if (diff != null)		
						this.range_Increment(input, diff);
					
					if (nav != null) 
						this.range_Select(input, nav);
					
					event.preventDefault();
					event.stopPropagation();
			
				}
			},
			
			
			range_Select: function(input, index){
				var data = range_getRange(input, index, this);
				
				input.selectionStart = data.start;
				input.selectionEnd = data.end;
				
				this.range = data;
			},
			
			range_Increment: function(input, diff){
				var fn = this.range.fn,
					date = this.range.date
					;
				
				if (fn === 'Minutes') 
					diff *= 15;
				
					
				date['set' + fn](date['get' + fn]() + diff);
				input.value = ruqq.date.format(date, this.format);
				input.selectionStart = this.range.start;
				input.selectionEnd = this.range.end;
				
				this.setDate(this.range.date);
				
				this.$.trigger('change', this.getDate());
			},
			
			
			datepicker: null,
			date: null,
	        onRenderStart: function(model){
				
				var $template = jmask(Template);
				
				this.format = this.attr.format || 'dd/MM/yyyy hh:mm';
	            this.model = model;
				
				
				if (this.attr.disabled) {
					$template.attr('disabled', 'disabled');
				}
				
				this.nodes = this.nodes 
					? jmask(this.nodes).append($template)
					: $template
					;
	        },
			slots: {
				domInsert: function(){
					
					this.datepicker = this
						.$
						.find('.input-group')
						.datetimepicker({
							language: 'de',
							
							format: this.format,
							pickDate: this.attr.pickTime ? false : true,
							defaultDate: this.date,
							viewMode: 0
						})
						.on('changeDate', this.dateChanged.bind(this))
						.data('datetimepicker')
						;
				}
			},
	        
			dateChanged: function(event){
				
				this.$.trigger('change', this.getDate());
				return false;
			},
			
			setDate: function(date){
				date = time_toUTC(date);
				
				if (this.datepicker == null) {
					this.date = date;
					return;
				}
				
				this
					.datepicker
					.setDate(date)
					;
			},
			
			getDate: function(){
				var date = this
					.datepicker
					.getDate()
					;
				
				return time_fromUTC(date);
			},
			
			toggle: function(state){
				
				if (!state) 
					this.$.attr('disabled', 'disabled');
				else
					this.$.removeAttr('disabled');
			}
			
		}));

		function time_toUTC(date) {
			var x = new Date(Date.UTC(
				date.getUTCFullYear(),
				date.getUTCMonth(),
				date.getUTCDate(),
				date.getUTCHours(),
				date.getUTCMinutes(),
				date.getUTCSeconds()
			));
			
			x.setMinutes( x.getMinutes() + date.getTimezoneOffset() * -1 );
			
			return x;
		}
		
		function time_fromUTC(date) {
			var x = new Date(
				//date.getUTCFullYear(),
				//date.getUTCMonth(),
				//date.getUTCDate(),
				//date.getUTCHours(),
				//date.getUTCMinutes(),
				//date.getUTCSeconds()
				date
			);
			
			x.setMinutes( x.getMinutes() + date.getTimezoneOffset() );
			
			return x;
		}
		
		
		function range_getRange($input, index, compo) {
			var format = compo.format,
				start = index == null
					? $input.selectionStart
					: index
					;
			
			var text = $input.value,
				end
				;
			
			if (/\d/.test(text[start]) === false) {
				--start;
			}
			
			while (start > -1 && /\d/.test(text[start])) {
				--start;
			}
			start += 1;
			
			end = start + 1;
			while (end < text.length && /\d/.test(text[end])) {
				++end;
			}
			
			var name = format.substring(start, end);
			
			return {
				fn: pattern_NAMES[name],
				name: name,
				start: start,
				end: end,
				
				date: (compo.range && compo.range.date) || compo.getDate()
			};
			
		}

	});
