var User = require('./user');

function run () {

	var user = new User('Foo');
	user.dump();
}


if (module.parent) {
	module.exports = run;
} else {
	run();
}