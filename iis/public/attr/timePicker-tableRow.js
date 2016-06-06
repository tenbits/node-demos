(function(){
		
	mask.registerAttrHandler('x-time-picker-row', 'client', function(node, attrValue, model, cntx, element, controller) {
		
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
		
		
		_select: function(endCell){
			
			var i_start = this.$startCell.index(),
				i_end = $(endCell).index()
				;
			
			this
				.$row
				.find('.-cl-time-range-selected')
				.removeClass('-cl-time-range-selected')
				;
			
			var start = i_start,
				end = i_end + 1;
			
			if (i_end < i_start) {
				start = i_end;
				end = i_start + 1;
			}
			
			if (start < 2) 
				start = 2;
			
			this.dayStart = start - 1;
			this.dayEnd = end - 2;
			
			this
				.$row
				.children()
				.slice(start, end)
				.addClass('-cl-time-range-selected')
				;
			
		},
		
		_getDayFromCell: function($cell){
			var i_start = $cell.index();
			
			var start = i_start;
			if (start < 2) 
				start = 2;
			
			return start - 1;
		},
		
		Self: {
			start: function(event){
				if (event.target.tagName !== 'TD') 
					return;
				
				if (event.button === 2) 
					return;
				
				this.$startCell = $(event.target).addClass('-cl-time-range-selected');
				this.$row = this.$startCell.parent();
				
				
				this
					.$row
					.children()
					.slice(1)
					.on('mouseenter', this.mouseenter)
					;
					
				document.addEventListener('mousemove', this.move, true);
				document.addEventListener('mouseup', this.end, true);
			},
			
			mouseenter: function(event){
				
				event.stopPropagation();
				event.preventDefault();
				
				
				this._select(event.currentTarget);
			},
			
			move: function(event){
				
				event.preventDefault();
			},
			
			end: function(event){
				event.stopPropagation();
				event.preventDefault();
				
				document.removeEventListener('mouseup', this.end, true);
				document.removeEventListener('mousemove', this.move, true);
				
				this
					.$row
					.children()
					.slice(1)
					.off('mouseenter', this.enter)
					.removeClass('-cl-time-range-selected')
					;
				
				var username = this.$row.data('username'),
					month = Compo.closest(this.compo, ':cl-month')._month
					;
				
				var start = ruqq.date.getMiddnight(month),
					end = ruqq.date.getMiddnight(month)
					;
				
				if (this.dayStart == null) 
					this.dayStart = this._getDayFromCell(this.$startCell);
				start.setDate(this.dayStart);
				
				
				if (this.dayEnd == null || this.dayEnd == this.dayStart) 
					end = null;
				else
					end.setDate(this.dayEnd);
				
				Compo
					.signal
					.emitOut(
						this.compo,
						'timeline_selectRangeMonth',
						this,
						[start, end, username]
					);
					
				this.$row = null;
				this.$startCell = null;
				
			}
		}
	});
	

	
}());