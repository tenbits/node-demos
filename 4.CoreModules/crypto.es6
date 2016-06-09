var crypto = require('crypto');

UTest({
	'md5' () {
		var md5 = crypto.createHash('md5');
		
		md5.update('Hello');
		
		var str = md5.digest('hex');
		logger.log('hash'.green, str.bold);
		eq_(str.length, 32);
	},
	
	'subscribe' () {
		var message = 'Hello',
			key = 'asdasdasd';
		
		eq_(subscribe(message, key), subscribe(message, key));
		notEq_(subscribe(message, key), subscribe(message + 'F', key));
		
		function subscribe(message, key) {
			var sha1 = crypto.createHmac('sha256', key);
			sha1.update(message);
			return sha1.digest('hex');
		}
	}
})