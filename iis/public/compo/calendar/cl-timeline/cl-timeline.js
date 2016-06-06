include 
	.load('cl-timeline.mask::Template') 
	.css('cl-timeline.less') //
	.done(function(resp){

		mask.registerHandler(':cl-timeline', Compo.createClass({
			template: resp.load.Template,

			compos: {
				$container: '$: .-cl-day-container',
				$pickerPane: '.-cl-time-range'
			},
			events: {
				'mousedown: .-cl-day-container': 'picker_Start'
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
				
				
			},
			onRenderEnd: function(elements, model, ctx, container){
				// ..
			},
			setCalendars: function(cals){
				
			},
			
			picker_Start: function(event){
				
				var calStart = this.model.calStart,
					calEnd = this.model.calEnd,
				
					height = this.compos.$container.height(),
					minutes = (calEnd - calStart) * 60,
					top = event.pageY - this.compos.$container.offset().top,
					style = this.compos.$pickerPane.style
					;
				
				var percent = ruqq.cal.roundTopPos(
					top,
					height
				);
				
				style.display = 'block';
				style.top = percent + '%';
				style.height = 1 + 'px';
				
				this.last = {
					y: event.pageY,
					height: 1,
					minutes: ruqq.math.roundToDivisor(minutes * top / height, 15),
					fullHeight: height
				};
				
				document.addEventListener('mouseup', this.picker_End, true);
				document.addEventListener('mousemove', this.picker_Move, true);
			},
			
			Self: {
				picker_Move: function(event){
					event.stopPropagation();
					event.preventDefault();
					
					var y = this.last.y,
						dy = event.pageY - y,
						height = this.last.height
						;
					
					if (dy < 0 && height === 1) 
						return;
					
					height += dy;
					
					if (height < 1) 
						height = 1;
					
					this.compos.$pickerPane.style.height = height + 'px';
					
					this.last.height = height;
					this.last.y = event.pageY;
				},
				
				picker_End: function(event){
					event.stopPropagation();
					event.preventDefault();
					
					document.removeEventListener('mouseup', this.picker_End, true);
					document.removeEventListener('mousemove', this.picker_Move, true);
					
					this.compos.$pickerPane.style.display = 'none';
					
					
					var last = this.last,
						calStart = this.model.calStart,
						calEnd = this.model.calEnd
						;
						
					var startMinutes = calStart * 60 + last.minutes,
						endMinutes = startMinutes + (calEnd - calStart) * 60 * (last.height / last.fullHeight);
						
					endMinutes -= endMinutes % 15;
					
					var today = new Date(),
						startTime = ruqq.date.getMiddnight(today),
						endTime = ruqq.date.getMiddnight(today)
						;
					
					startTime.setMinutes(startMinutes);
					endTime.setMinutes(endMinutes);
					
					this.emitOut('timeline_selectRange', startTime, endTime);
				}
			}
			
		}));

		function time_format(time){
			if (time < 10) 
				return '0' + time + ':00';
			
			return time + ':00';
		}

	});
