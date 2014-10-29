class Foo {
	constructor () {
		this.foo = 'Foo';
	}
	format () {
		return `"${this.foo}"`
	}
};

class Bar extends Foo {
	constructor () {
		super();
		this.bar = 'Bar';
	}
	format () {
		return super() + ` - "${this.bar}"` 
	}
};


var bar = new Bar;
console.log(bar.format()); // "Foo" - "Bar"
