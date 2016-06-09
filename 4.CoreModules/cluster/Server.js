var cluster = require('cluster');
var count = require('os').cpus().length;

cluster.setupMaster({
    exec: "Worker.js"
});

while(--count > -1) {
    cluster.fork();
}

cluster.on('exit', function(){
	cluster.fork();
});