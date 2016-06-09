var fs = require("fs");

class UserProvider {
	getUsers () {
		return new Promise((resolve, reject) => {
			fs.readFile(__dirname + 'users.json', 'utf8', (error, str) => {
				if (error) {
					reject(error);
					return;
				}
				var json = JSON.parse(str);
				resolve(json);
			})
		})
	}
} 

module.exports = new UserProvider();