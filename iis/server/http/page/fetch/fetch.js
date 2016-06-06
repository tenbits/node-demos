var _busy = false;

include.exports = atma.server.HttpPage({

    onRenderStart: function(model, ctx) {
        var req = ctx.req;
        if (_busy) {
            this.model = {
                message: 'Processing ...'
            };
            return;
        }

        _busy = true;

        var remoteAddress = req.connection.remoteAddress;

        if (remoteAddress == null) {
            // iisnode
            remoteAddress = req
                .headers['x-forwarded-for']
                .replace(/:.+/, '');
        }


        if (req.method === 'POST') {

            var env = {};
            for (var key in process.env) {
                env[key] = process.env[key];
            }

            env.HOME = 'c:\\Users\\admin';

            var stream = require('child_process')
                .spawn('cmd', ['/C', 'node', 'tools/fetch.js'], {
                cwd: process.cwd(),
                env: env
            }); 

            stream.stderr.on('data', function(data) {
                console.error('fetch stderr: ' + data);
            });
            
            stream.on('close', function(code) {
                _busy = false;
                logger.log('<page:fetch> done - touch index');
                
                require('fs')
                    .utimesSync('index.js', new Date(), new Date());
            });

            this.model = {
                title: 'Started ... '
            };
            return;
        }

        this.model = {
            title: 'Access denied ...'
        };

        logger.error('<page:fetch> Access denied [%s] %s', req.method, remoteAddress);

        //- this.ctx.rewrite = '/error/401';
    }
});