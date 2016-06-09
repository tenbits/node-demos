var guid = require('guid');

module.exports = class User {
	constructor () {
		this.id = null;
		this.userName = null;
	}

	ensureId () {
		if (this.id) {
			return;
		}
		this.id = guid.raw();
	}
};