/**
 * Arrow functions
 * Default parameter
 * Spread arguments
 * Property methods
 */
function Foo(name = 'Foo') {
	this.name = name;
}

Foo.prototype = {
	name: null,

	log (...args) {
		console.log(this.name, ':', ...args);
	},
	start (...args) {
		this.timer = setInterval(() => this.log(...args), 1000);
	},
	stop () {
		clearInterval(this.timer);
	}
};


var foo = new Foo;
foo.log('start', 'before', 'start');
foo.start('logging');
setTimeout(() => foo.stop(), 3000);