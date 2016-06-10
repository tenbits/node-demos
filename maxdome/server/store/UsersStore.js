const FILENAME = './users.json';
const fs = require('fs');


class UsersStore {
	getAll () {
		return new Promise((resolve, reject) => {
			//var str = fs.readFileSync('');
			fs.readFile(__dirname + FILENAME, 'utf8', (error, str) => {
				if (error && error.code === 404) {
					resolve([]);
					return;
				}
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