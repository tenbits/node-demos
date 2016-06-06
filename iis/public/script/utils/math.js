(function(global){
	
	
	if (global.ruqq == null) 
		global.ruqq = {};
	
	global.ruqq.math = {
		
		random: function(min, max){
			
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		
		roundToDivisor: function(number, divisor){
			var rest = number % divisor;
			
			return rest < divisor / 2
				? number - rest
				: number - rest + divisor
				;
		}
	};
	
}(typeof window !== 'undefined' ? window : global));