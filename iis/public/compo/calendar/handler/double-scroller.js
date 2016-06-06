mask.registerHandler(':double-scroller', Compo({
	
	slots: {
		compo_Resize: function(){
			
			this.update();
		}
	},
	
	pipes: {
		
		calendar: {
			doCalendarToggle: function(){
				
				this.update();
			}
		}
	},
	
	onRenderEnd: function(elements, model, ctx, container){
		
		var scrollbar = this.scrollbar = elements[0],
			element =
				this.element =
					elements[elements.length - 1].querySelector('#' + this.attr.id);
		
		
		scrollbar.onscroll= function() {
			element.scrollLeft= scrollbar.scrollLeft;
		};
		
		element.onscroll= function() {
			scrollbar.scrollLeft= element.scrollLeft;
		};
	},
	
	update: function(){
		
		this.scrollbar.firstChild.style.width = this.element.scrollWidth + 'px';
	}
}))