var Fns = {
	
	'array clone and concat' () {
		var arr = [ 1, 2, 3 ],
			str = '',
			cloned = [ ...arr ];
			
		for(var x of cloned) {
			str += x;
		}
		return str;
	},
	
	'get global properties with "c"' () {
		var arr = Object.keys(global);
		
		arr = [ for(prop of arr) if (prop[0] === 'c') prop ];
		
		return arr.join(' - ');
	}
	
};

for (var key in Fns) {
	var fn = Fns[key];
	
	console.log(`>>${ key }: ${ fn() }`);
}