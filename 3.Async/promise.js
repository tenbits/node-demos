UTest({
	'should create Promise and resolve it on (timeout)' (done) {

		function wait(){
			return new Promise((resolve, reject) => {
				setTimeout(() => resolve('Foo'), 100);
			});
		}

		var task =  wait();
		return task.then((result) => {
			eq_(result, 'Foo')
		});
	},

	'shoud reject promise' (done) {
		function wait(){
			return new Promise((resolve, reject) => {
				reject('Bar')
			});
		}

		var task =  wait();
		task.then(assert.avoid(), (error) => {
			eq_(error, 'Bar');
			done();
		});
	},
	'should pipe results' (done) {
		function getUser(){
			return new Promise((resolve, reject) => {
				resolve({ username: 'Foo' })
			});
		}
		function transform(user){
			return new Promise((resolve, reject) => {
				user.username = user.username.toUpperCase();
				resolve(user)
			});
		}

		getUser()
			.then(user => transform(user))
			.then(user => {
				eq_(user.username, 'FOO');
				done();
			});
	}
})