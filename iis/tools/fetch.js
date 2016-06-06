require('atma-libs/globals');

var Runner = Class({
    Construct: function(array, callback){
        this.array = array;
        this.index = -1;
        this.callback = callback;
       
        this.process();
    },
    
    process: function(code){
       
            
        if (++this.index >= this.array.length) {
            
            this.callback(0);
            return;
        }
        
        var cmd = this.array[this.index];
        
        
        runCommend(cmd[0], cmd[1], this.process.bind(this));
    }
})

function runCommend(command, arguments_, callback){
    
    
    var env = {};

    Object
        .keys(process.env)
        .forEach(function(key){
            env[key] = process.env[key];
        })
    
    env.HOME = 'c:\\Users\\admin\\';
    
    var stream = require('child_process').spawn(command, arguments_, {
        cwd: process.cwd(),
        env: env,
        stdio: 'inherit'
    }); 

    stream.on('close', function(code) {
        
        callback();
    });
}


 new Runner([
    ['cmd', ['/C', 'git', 'fetch','--all']],
    ['cmd', ['/C', 'git', 'reset', '--hard', 'origin/master']]
], function (code){
    
    console.log('<page:fetch> done', code);
});