
var _global = include.isBrowser
		? window
		: global
		;

if (_global.Model == null) {
	
	Class.cfg('ModelHost', (_global.Model = {}));
}


include
	.js(
		'User.js',
		'Termin.js',
		'RTermin.js',
		'Dienst.js',
		'./Settings.js',
		'./Appointments.js'
	);