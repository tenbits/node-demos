var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/maxdome');

var driver = mongoose.connection;

driver.on('error', (error) => { throw new Error(error) });

module.exports = new Promise((resolve) => {
	driver.once('open', resolve);
});