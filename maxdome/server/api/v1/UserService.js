var store = require('../../store/IUsersStore');
var express = require('express');
var route = express.Router();

route.get('/', async (req, res) => {	
	var users = await store.getAll();
	res.send(users);
});

route.post('/', async (req, res) => {	
	var user = await store.upsert(req.body);
	res.send(user);
});

route.get('/:id', async (req, res) => {
	var user = req.body;
	user.id = req.query.id;
	await store.upsert(user)
	res.send(user);
});

function authorize (req, res, nextFn) {
	if (req.user) {
		nextFn();
		return;
	}
	nextFn(Error('Not authorized'));
}

module.exports = route;