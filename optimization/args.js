function arg_reassignParam(a, b) {
    if (arguments.length < 2) b = 5;
}

function arg_NoReassignParam(a, b_) {
	var b = b_;
    if (arguments.length < 2) b = 5;
}

var runner = require('./runner');

runner.testFn(arg_reassignParam);
runner.testFn(arg_NoReassignParam);