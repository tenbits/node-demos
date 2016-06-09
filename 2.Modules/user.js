class User {

	constructor (name) {
		this.name = name;
	}

	dump () {
		console.log(`Name is ${this.name}`);
	}
}


module.exports = User;