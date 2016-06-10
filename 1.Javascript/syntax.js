'use strict';

var obj = {
	name: 'Foo',
	foo: function(){
		setTimeout(function(){
			console.log(this.name);
		}.bind(this));
	}
};
var obj2 = {
	name: 'Bar'
};

// this

var fn = obj.foo;

var fnBinded = fn.bind(obj2);
console.log(fnBinded())