function fn_With() {
	with({}) {}
}

function fn_NoWith() {
	for(var i = 0; i < 10; i++) {}
}


var runner = require('./runner');

runner.testFn(fn_With);
runner.testFn(fn_NoWith);