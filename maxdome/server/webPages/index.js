var express = require('express');
var route = express.Router();
var passport = require('passport');
require('../auth/passport.config.js');

route.get('/login', (req, res) => {
	if (req.user) {
		res.redirect('/');
		return;
	}
	res.render('login', {
		pageTitle: 'Login',
		text: 'Bitte einloggen'
	})
});
route.post('/login', (req, res) => {
	var {name, password} = req.body;
	
	console.log(req.body);

	passport.authenticate('local', function(error, user, info){
		if (user !== false) {
			res.redirect('/');
			return;
		}
		res.redirect('/login');
	})
});

module.exports = route;