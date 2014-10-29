var Fns = {
	'simple arr' () {
		
		var str = '';
		for(var i of create()){
			str += i;
		}
		return str;
		
		// private
		function * create() {
			var i = 0;
			while(i < 10) {
				yield i;
				
				i++;
			}
		}
	},
	
	'async feature' () {
		
		sync(function * (resume) {
			try {
				var str = yield fooAsync(resume);
				console.log(str)
			} catch(error) {
				console.log('Catched', error)
			}
		})
		
		return 'started';
	
		// private
		
		function fooAsync(resume) {
			setTimeout(() => { resume(null, 'foo') }, 1000);
		}
		
		function sync(gen) {
			var iterable, resume;
	 
			resume = function(err, x) {
				if (err) {
					iterable.throw(err);
					return;
				}
				iterable.next(x);
			};
	 
			iterable = gen(resume);
			iterable.next();
		}
	}
};

for (var key in Fns) {
	var fn = Fns[key];
	
	console.log(`>>${ key }: ${ fn() }`);
}