var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var cookieParser = require('cookie-parser');
var apiV1 = require('./server/api/v1');
var webPages = require('./server/webPages');
var http = require('http');
var io = require('socket.io');
var passport = require('passport');


var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set('views', './views')
app.set('view engine', 'jade')

app.use(cookieParser());
app.use(session({ secret: '2929292922' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', webPages);
app.use('/api/v1', apiV1);
app.use(express.static('./'));


var server = http
	.createServer(app)
	.listen(process.env.PORT || 83);

var ioServer = io.listen(server);

ioServer.on('connection', function(socket){
	socket.on('user:post', (user, done) => {
		store.upsert(user).then(done);
	});
});

var store = require('./server/store/IUsersStore');
store.on('new', function(user){
	ioServer.sockets.emit('user:new', user)
});
