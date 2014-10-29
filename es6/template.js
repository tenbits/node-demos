var Fns = {
	
	'simple template' () {
		return `
			Multiple
			string	
		`
	},
	
	'interpolation' () {
		var foo = 'foo',
			bar = 'bar';
			
		return `After ${foo} goes ${bar}`
	},
	
	'tagged template' () {
		function test(arr, name){
			// arr === ['Name of the function is ', '']
			return 'Name:' + name;
		}
		return test`Name of the function is ${test.name}`;
	}
	
};

for (var key in Fns) {
	var fn = Fns[key];
	
	console.log(`>>${ key }: ${ fn() }`);
}