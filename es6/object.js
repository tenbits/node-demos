var Fns = {
	
	'object destructor' () {
		var obj = createFooBarObj();
		return concatFooBarObj(obj);
	
		// private
		function concatFooBarObj(obj) {
			var {foo, bar} = obj;
			return foo + bar;
		}
		function createFooBarObj() {
			var foo = 'foo',
				bar = 'bar';
				
			return { foo, bar };
		}
	},
	
	'array destructor' () {
		var arr = createFooBarArr();
		return concatFooBarArr(arr);
	
		// private
		function concatFooBarArr(arr) {
			var [foo, bar] = arr;
			return foo + bar;
		}
		function createFooBarArr() {
			var foo = 'foo',
				bar = 'bar';
				
			return [ foo, bar ];
		}
	},
	
	'computed property' () {
		var obj = createFooBarObj();
		return obj.foo + obj.bar;
	
		function createFooBarObj() {
			var foo = 'foo',
				bar = 'bar';
			
			return {
				[foo]: 'foo',
				[bar]: 'bar'
			};
		}
	}
	
};

for (var key in Fns) {
	var fn = Fns[key];
	
	console.log('>>', key, ':', fn());
}