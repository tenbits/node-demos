var express = require('express');
var app = express();
var apiV1 = require('./server/api/v1')

app.use('/api/v1', apiV1);
app.use(express.static('./'));


app.listen(process.env.PORT || 83);