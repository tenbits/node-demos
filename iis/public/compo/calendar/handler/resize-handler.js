mask.registerHandler(':resize-handler', Compo({
	
	slots: {
		termin_Resize: function(sender, type, val){
			
			var id = sender.model._id;
			
			var $termine = this.$.find('.-cl-termin[data-termin="' + id + '"]');
			if ($termine.length === 1) 
				return;
			
			
			$termine.each(function(index, node){
				
				node.style[type] = val + 'px';
			});
		}
	},
	
	//
	//onRenderStart: function(){
	//	
	//}
	
}))