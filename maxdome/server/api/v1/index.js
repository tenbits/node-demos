var express = require('express');
var route = express.Router();
var users = require('./UserService');

route.use('/users', users);

module.exports = route;