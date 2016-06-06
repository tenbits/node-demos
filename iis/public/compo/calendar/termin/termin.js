include 
	.load('termin.mask::Template') 
	.css('termin.less') //
	.done(function(resp){

		mask.registerHandler(':termin', Compo({
			template: resp.load.Template,

			
			diffMinutes: null,
			
			$period: null,
			range: null,
			resizedDate: null,
			
			events: {
				'mousedown: .-cl-termin-dragger': function(event){
					
					this.$period = this.$.find('.-cl-termin-period');
					this.$.addClass('dragging');
					
					this.diffMinutes = ruqq.date.diff_Minutes(this.model.start, this.model.end);
					
					Dragger.start(this, event);
				},
				'mousedown: .-cl-termin-resizer': function(event){
					
					this.$period = this.$.find('.-cl-termin-period');
					this.$.addClass('dragging');
					
					this.diffMinutes = ruqq.date.diff_Minutes(this.model.start, this.model.end);
					
					Resizer.start(this, event);
				},
			},
			//slots: {
			//
			//},
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
	
			onDragEnd: function(top){
				this.$.removeClass('dragging');
				this.range = null;
			},
			onDragComplete: function(top){
				
				this
					.model
					.start = this.range.from;
				
				this
					.model
					.end = this.range.to;
				
				this
					.model
					.save()
					.always(Notify.restStatus)
					;
					
				this.emitOut('termin_Resize', 'top', top);
			},
			
			onChange: function(percent, containerHeight){
				
				var range = this.getDate(percent, containerHeight),
					str = ruqq.date.format(range.from, 'HH:mm')
						+ '-'
						+ ruqq.date.format(range.to, 'HH:mm')
						;
						
				this.range = range;
				this.$period[0].textContent = str;
			},
			
			onResizeEnd: function(){
				this.$.removeClass('dragging');
				this.resizedDate = null;
			},
			onResizeComplete: function(height){
				if (!this.resizedDate) 
					return;	
				
				this
					.model
					.end = this.resizedDate;
				
				this
					.model
					.save()
					.always(Notify.restStatus)
					;
				
				this.emitOut('termin_Resize', 'height', height);
			},
			
			onResizeChange: function(height, containerHeight){
				var scale = height / containerHeight,
					minutes = (Current.user.settings.calEnd - Current.user.settings.calStart) * 60 * scale;
				
				var end = ruqq.date.math_Minute(this.model.start, minutes),
					str = ruqq.date.format(this.model.start, 'HH:mm')
						+ '-'
						+ ruqq.date.format(end, 'HH:mm')
						;
						
				this.resizedDate = end;
				this.$period[0].textContent = str;
			},
			
			getDate: function(percent, containerHeight){
				
				var minutes = ruqq.cal.minutesFromPercent(percent, containerHeight),
					date = ruqq.date.getMiddnight(this.model.start)
					;
				
				date.setMinutes(Current.user.settings.calStart * 60 + minutes);
				
				var end = new Date(date);
				end.setMinutes(end.getMinutes() + this.diffMinutes);
				
				return {
					from: date,
					to: end
				}
			},
			//dispose: function(){
			//
			//}
		}));


		var Dragger = (function(){
			
			var _moved = false,
				_containerHeight,
				_dragging = false,
				_lastY,
				_top,
				_deferDTop,
				
				_compo,
				_style
				;
			
			function mousemove(event) {
				_moved = true;
				
				_deferDTop += event.pageY - _lastY;
				_lastY = event.pageY;
				
				event.preventDefault();
				event.stopPropagation();
			}
			function mouseup(event) {
				if (_moved) {
					event.stopPropagation();
					event.preventDefault();
					
					_compo.onDragComplete(_top);
				}
				
				_compo.onDragEnd(_top);
				
				
				
				_dragging = false;
				_compo = null;
				_style = null;
				
				document.removeEventListener('mousemove', mousemove, true);
				document.removeEventListener('mouseup', mouseup, true);
				
				setTimeout(function(){
					document.removeEventListener('click', noclick, true);
				}, 200);
				
			}
			function noclick(event) {
				if (_moved) {
					event.preventDefault();
					event.stopPropagation();
				}
				document.removeEventListener('click', noclick, true);
			}
			function update() {
				if (_deferDTop) {
					_top += _deferDTop;
					
					var percent = ruqq.cal.roundTopPos(_top, _containerHeight);
					
					_style.top = percent + '%';
					_deferDTop = 0;
					
					_compo.onChange(percent, _containerHeight);
				}
				
				requestAnimationFrame(update);
			}
			
			return {
				start: function(compo, event){
					_dragging = true;
					_moved = false;
					_compo = compo;
					_deferDTop = 0;
					_top = compo.$.get(0).offsetTop;
					_style = compo.$.get(0).style;
					_lastY = event.pageY;
					_containerHeight = compo.$.parent().height();
					
					document.addEventListener('mousemove', mousemove, true);
					document.addEventListener('mouseup', mouseup, true);
					document.addEventListener('click', noclick, true);
					
					update();
					
					event.preventDefault();
					event.stopPropagation();
				}
			}
		}());
		
		
		var Resizer = (function(){
			
			var _moved = false,
				_containerHeight,
				_dragging = false,
				_lastY,
				_height,
				_dh,
				
				_compo,
				_style
				;
			
			function mousemove(event) {
				_moved = true;
				
				var dh = event.pageY - _lastY;
				
				if (_height + _dh + dh > 10) 
					_dh += dh;
				
				
				
				_lastY = event.pageY;
				
				event.preventDefault();
				event.stopPropagation();
			}
			function mouseup(event) {
				if (_moved) {
					event.stopPropagation();
					event.preventDefault();
					
					_compo.onResizeComplete(_height);
				}
				
				_compo.onResizeEnd(_height);
				
				
				
				_dragging = false;
				_compo = null;
				_style = null;
				
				document.removeEventListener('mousemove', mousemove, true);
				document.removeEventListener('mouseup', mouseup, true);
				
				setTimeout(function(){
					document.removeEventListener('click', noclick, true);
				}, 200);
				
			}
			function noclick(event) {
				if (_moved) {
					event.preventDefault();
					event.stopPropagation();
				}
				document.removeEventListener('click', noclick, true);
			}
			function update() {
				if (_dh) {
					_height += _dh;
					
					
					_style.height = _height + 'px';
					_dh = 0;
					
					_compo.onResizeChange(_height, _containerHeight);
				}
				
				requestAnimationFrame(update);
			}
			
			return {
				start: function(compo, event){
					_dragging = true;
					_moved = false;
					_compo = compo;
					_dh = 0;
					_height = compo.$.height();
					_style = compo.$.get(0).style;
					_lastY = event.pageY;
					_containerHeight = compo.$.parent().height();
					
					document.addEventListener('mousemove', mousemove, true);
					document.addEventListener('mouseup', mouseup, true);
					document.addEventListener('click', noclick, true);
					
					update();
					
					event.preventDefault();
					event.stopPropagation();
				}
			}
			
		}());
		
	});
