var MyUser = require('./user');

function run () {

	var user = new MyUser('Foo');
	user.dump();
}

run();
