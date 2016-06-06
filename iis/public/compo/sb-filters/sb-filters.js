include 
	.load('sb-filters.mask::Template') 
	.css('sb-filters.less') //
	.done(function(resp){

		mask.registerHandler(':sb-filters', Compo({
			template: resp.load.Template,

			//compos: {
			//
			//},
			events: {
				'click: .-sbu-checkbox': function(event){
					var $checkbox = $(event.currentTarget).children().first(),
						$filterItem = $checkbox.closest('.-sbu-filter-item'),
						name = $filterItem.data('name'),
						type = $filterItem.data('type'),
						isVisible = $checkbox.toggle().is(':visible')
						;
						
					if (!isVisible) {
						Current.filter.dienst.push(name);
					}
					
					else {
						ruqq.arr.remove(Current.filter.dienst, function(x){
							return x === name;
						})
					}
					
					Compo.pipe('calendar').emit('filterRefresh');
				}
			},
			//slots: {
			//
			//},
			pipes: {
				
			},
			//constructor: function(){
			//
			//},

			onRenderStart: function(model, ctx, container){
				// ..
			},
			onRenderEnd: function(elements, model, ctx, container){
				// ..
			},
	
			//dispose: function(){
			//
			//}
		}));


	});
