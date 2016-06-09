require('http')
	.createServer(function(req, res){
		res.end('PID: ' + process.pid);
	})
	.listen(3000);