function arr_iterateProp() {
    var arr = [1, 2, 3];
	for(var key in arr) {}
}
function arr_iterateIndex() {
    var arr = [1, 2, 3];
	for(var i = 0; i < arr.length; i++) {}
}


var runner = require('./runner');

runner.testFn(arr_iterateProp);
runner.testFn(arr_iterateIndex);