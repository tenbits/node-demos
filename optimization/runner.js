module.exports = {
	testFn: function(fn){


		fn();

		%OptimizeFunctionOnNextCall(fn);
		fn();
		console.log('\n>> fn ', fn.name, ':', Status[%GetOptimizationStatus(fn)], '\n');
	},
	testObj: function(factory) {
		
		var isFast = %HasFastProperties(factory());

		console.log('>> obj ', factory.name, 'is', isFast ? 'fast' : 'slow');
	}
}



var Status = {
	'1': 'Function is optimized',
	'2': 'Function is not optimized',
	'3': 'Function is always optimized',
	'4': 'Function is never optimized',
	'6': 'Function is maybe deoptimized',
};

