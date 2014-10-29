// Callback
UTest({
	'read content Async' (done) {
		require('fs').readFile('async.es6', 'utf8', function(error, content) {

			eq_(error, null);
			has_(content, 'done');
			done();
		});
	},
	'read not existed file' (done) {

		require('fs').readFile('404.js', function(error, content){
			console.log(error);
			is_(error, 'Object');
			eq_(content, null);
			done();
		});
	},
	'test promise' : (function(){
		
		function wait(time) {
			var dfr = new Class.Deferred;
			if (time == null) 
				return dfr.reject('Time expected')
			
			setTimeout(() => dfr.resolve('Foo'), time);
			return dfr;
		}
		
		return {
			'success' () {
				return wait(100).done(result => eq_(result, 'Foo'));
			},
			'fail' (done) {
				wait()
					.fail(assert.await(err => eq_(err, 'Time expected')))
					.done(assert.avoid())
					.always(done)
					;
			}
		};
	}())
})
