var store = require('../../store/IUsersStore');
var express = require('express');
var route = express.Router();

route.get('/', (req, res) => {	
	store
	.getAll()
	.then(
		(users) => res.send(users),
		(error) => res.send({ message: error.toString() })
	)
});


module.exports = route;