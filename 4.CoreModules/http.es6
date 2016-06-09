UTest({
	'get' (done) {
		var server = startServer();
		
		setTimeout(() => {
			var request = require('request');
			
			request.get('http://localhost:3000', function(err, res, body){
				eq_(body, 'Foo');
				
				server.close();
				setTimeout(done);
			});
		});

		function startServer() {
			var http = require('http');
			
			var server = http.createServer(function(req, res) {
				res.writeHead(200, {
					'Content-Type': 'text/plain'
				});
				res.end('Foo');
			});
			
			server.listen(3000);
			return server;
		}
	}
})