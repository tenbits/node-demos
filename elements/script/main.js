include
.routes( {
	compo: '/script/{0}/{0}.js'
})
.js({
	atma_ruqq: ['dom/jquery'],
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
