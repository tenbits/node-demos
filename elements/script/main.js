include
.routes( {
	compo: '/script/{0}/{0}.js'
})
.js('/node_modules/jquery/dist/jquery.js')
.js({
	atma: ['mask'],
	compo: [ 'resolver', 'elements' ]
}).ready(function(){

    var App = Compo({
        attr: {
            template: '#layout'
        }
    });

    var model = {},
        cntx = {};

    Compo.initialize(App, model, cntx, document.body);



});
