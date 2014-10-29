module.exports = {
	
	'copy': {
		action: 'copy',
		files: {
			'node_modules/nodewebkit/nodewebkit/**': 'release/'
		}
	},
	
	zipapp: {
		action: 'custom',
		script: {
			process: function(){
				var AdmZip = require('adm-zip'),
					zip = new AdmZip,
					dir = new io.Directory('src/')
					;
				
				zip.addLocalFolder(dir.uri.toLocalDir(), 'src/');
				zip.addLocalFile('package.json');
				zip.writeZip('release/app.nw');
			}
		}
	},
	mergeapp: {
		action: 'shell',
		command: [ {
			command: 'copy /b nw.exe+app.nw app.exe',
			cwd: 'release'
		}],
	},

	'default': [ 'copy', 'zipapp', 'mergeapp' ]
};