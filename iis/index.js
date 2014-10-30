require('http')
	.createServer(function(req, res){

		res.end(req.url);
	})

	.listen(process.env.PORT);
