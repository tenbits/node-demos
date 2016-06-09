require('babel-register');
require('babel-polyfill');

var module = process.argv[2];
require('./' + module + '/index');