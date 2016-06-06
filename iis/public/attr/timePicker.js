(function(){
		
	mask.registerAttrHandler('x-time-picker', 'client', function(node, attrValue, model, cntx, element, controller) {
		
		new Picker(controller, element, model);
	});
	
	var Picker = Class({
		Construct: function(compo, container, model){
			this.compo = compo;
			this.model = model;
			
			this.$container = $(container);
			
			this.$pickerPane = document.createElement('div');
			this.$pickerPane.className = '-cl-time-range';
			
			container.appendChild(this.$pickerPane);
			
			container.addEventListener('mousedown', this.start, false);
		},
		
		Self: {
			start: function(event){
				if (event.currentTarget !== event.target) 
					return;
				
				if (event.button === 2) 
					return;
				
				var calModel = Compo.closest(this.compo, ':calendar').model,
					
					calStart = calModel.calStart,
					calEnd = calModel.calEnd,
				
					height = this.$container.height(),
					minutes = (calEnd - calStart) * 60,
					top = event.pageY - this.$container.offset().top,
					style = this.$pickerPane.style
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
				
				document.addEventListener('mouseup', this.end, true);
				document.addEventListener('mousemove', this.move, true);
			},
			
			move: function(event){
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
				
				this.$pickerPane.style.height = height + 'px';
				
				this.last.height = height;
				this.last.y = event.pageY;
			},
			
			end: function(event){
				event.stopPropagation();
				event.preventDefault();
				
				document.removeEventListener('mouseup', this.end, true);
				document.removeEventListener('mousemove', this.move, true);
				
				this.$pickerPane.style.display = 'none';
				
				
				var last = this.last,
					
					calModel = Compo.closest(this.compo, ':calendar').model,
					
					calStart = calModel.calStart,
					calEnd = calModel.calEnd
					;
					
				var startMinutes = calStart * 60 + last.minutes,
					endMinutes = startMinutes + (calEnd - calStart) * 60 * (last.height / last.fullHeight);
					
				endMinutes -= endMinutes % 15;
				
				var $day = this.$container.closest('.-cl-day'),
					date = new Date($day.data('date')),
					startTime = ruqq.date.getMiddnight(date),
					endTime = ruqq.date.getMiddnight(date),
					
					username = this.$container.data('username')
					;
				
				startTime.setMinutes(startMinutes);
				endTime.setMinutes(endMinutes);
				
				Compo
					.signal
					.emitOut(
						this.compo,
						'timeline_selectRange',
						this,
						[startTime, endTime, username]
					);
			}
		}
	});
	

	
}());