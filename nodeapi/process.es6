UTest({
	
	'list directory' (done) {
		
		var spawn = require('child_process').spawn,
			ls  = spawn('cmd', ['/C', 'dir']);
		
		var str = '';
		ls.stdout.on('data', data => {
			str += data;
		});
		ls.stderr.on('data', err => console.log(String(err)));
		ls.on('close', () => {
			has_(str, 'process.es6');
			done();
		});
	}
})