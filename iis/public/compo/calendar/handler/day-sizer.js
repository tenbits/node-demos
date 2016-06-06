mask.registerHandler(':day-sizer', Compo({
	
	onRenderStart: function(model){
		
		var arr = model.dienste,
			width = parseInt(this.attr.width)
			;
		
		jmask(this.nodes)
			.css('min-width', width * arr.length + 'px')
			;
	}
}))