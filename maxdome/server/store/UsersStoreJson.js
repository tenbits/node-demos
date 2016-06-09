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
	getUserById (id) {
		return this
			.getAll()
			.then(users => {
				return users.find(x => x.id == id)
			});
	}

	upsert (user) {
		if (user.id) {

		}
		var users = await this.getAll();
		var user = users.find(x => x.id === user.id);
		

		return this
			.getAll()
			.then(users => {
				if (user.id) {
					var current = users.find
				}
			});
	},

	saveAll (users) {
		var str = JSON.stringify(users);
		return new Promise((resolve, reject) => {
			fs.writeFile(__dirname + FILENAME, str, (error) => {
				if (error) {
					reject(error);
					return;
				}
				resolve();
			})
		});
	}
};

module.exports = UsersStore;