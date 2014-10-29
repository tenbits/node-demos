UTest({
	'custom write stream' (done) {
		var buf = new Buffer(0);
		var stream = new (require('stream').Writable);
		
		stream.write = function(chunk){
			buf = Buffer.concat([ buf, chunk ]);
		};
		stream.end = assert.await(function(chunk){
			has_(buf.toString(), 'read stream');
			done();
		});
		
		require('fs').createReadStream('streams.es6', 'utf8').pipe(stream);
	},
	'fs read stream' (done) {
		var str = '';
		require('fs')
			.createReadStream('streams.es6', 'utf8')
			.on('data', chunk => str += chunk)
			.on('end', (chunk) => {
				has_(str, 'read stream');
				done();
			})
	},
	
	'custom readable stream' (done) {
		var PATH = 'foo.txt';
		io.File.remove(PATH);
		
		var str = 'Hello world'.split('');
		var stream = new (require('stream').Readable);
		stream._read = function(){
			var x = str.shift();
			if (x == null) {
				stream.push(null);
				return;
			}
			setTimeout(function () {
				stream.push(x);
			}, 10);
		};
		
		stream.on('end', () => {
			eq_(io.File.read(PATH), 'Hello world');
			setTimeout(done);
		})
		
		stream.pipe(require('fs').createWriteStream(PATH, 'utf8'));
	},
	
	'fs write stream' (done) {
		var PATH = 'foo.txt';
		io.File.remove(PATH);
		
		var str = 'Hello world'.split('');
		var writer = require('fs').createWriteStream(PATH, 'utf8');
		
		writer.on('error', assert.avoid((err) => {
			writer.close()
		}));
		writer.on('close', function(){
			eq_(io.File.read(PATH), 'Hello world');
			done();
		});
		
		write();
		
		function write(){
			var x = str.shift();
			if (x == null) {
				writer.close();
				return;
			}
			writer.write(x);
			setTimeout(write, 50);
		}
	}
})
