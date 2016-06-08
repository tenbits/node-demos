require('babel-register');
require('babel-polyfill');

var fn = require('./async')

fn().then(value => console.log(`Value is ${value}`))

