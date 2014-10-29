function require (path) {

	var string = File.read(path);
	var module = {
		exports: {}
	};

	eval('(function(){' + string + '}());');

	return module.exports;
}