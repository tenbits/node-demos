const FILENAME = __dirname + '/users.json';
const promisify = require('promisify-node');
const fs = promisify('fs');
const guid = require('guid');

class UsersStoreJson {
	getAll () {
		return fs
			.readFile(FILENAME)
			.then(str => JSON.parse(str));
	}
	async getUserById (id) {
		var users = await this.getAll();
		return users.find(user => user.id === id);
	}
	async upsert (user) {
		var users = await this.getAll();
		if (user.id) {
			var current = users.find(x => x.id === user.id);
			var index = users.indexOf(current);
			users.splice(index, 1, user);
		} else {
			user.id = guid.raw();
			users.push(user);
		}
		await this.saveAll(users);
		return user;
	}
	saveAll(users){
		var str = JSON.stringify(users);
		return fs.writeFile(FILENAME, str).then(() => users);
	}
};
module.exports = UsersStoreJson;

// class UsersStoreJson {

// 	getAll () {
// 		return new Promise((resolve, reject) => {
// 			//var str = fs.readFileSync('');
// 			fs.readFile(__dirname + FILENAME, 'utf8', (error, str) => {
// 				if (error && error.code === 404) {
// 					resolve([]);
// 					return;
// 				}
// 				if (error) {
// 					reject(error);
// 					return;
// 				}
// 				var json = JSON.parse(str);
// 				resolve(json);
// 			})
// 		})
// 	}
// 	getUserById (id) {
// 		return this
// 			.getAll()
// 			.then(users => {
// 				return users.find(x => x.id == id)
// 			});
// 	}

// 	upsert (user) {
// 		if (user.id) {

// 		}
// 		var users = await this.getAll();
// 		var user = users.find(x => x.id === user.id);


// 		return this
// 			.getAll()
// 			.then(users => {
// 				if (user.id) {
// 					var current = users.find
// 				}
// 			});
// 	},

// 	saveAll (users) {
// 		var str = JSON.stringify(users);
// 		return new Promise((resolve, reject) => {
// 			fs.writeFile(__dirname + FILENAME, str, (error) => {
// 				if (error) {
// 					reject(error);
// 					return;
// 				}
// 				resolve();
// 			})
// 		});
// 	}
// };

// module.exports = UsersStore;