

Class.MongoStore.settings({
	db: 'calendar'
});

include
	.js(
		'/public/model/model.js',
		
		'authenticate.js',
		
		'User.js',
		'Termin.js',
		'RTermin.js',
		'Dienst.js',
		'Settings.js'
	)
	;