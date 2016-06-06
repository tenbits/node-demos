window.DEBUG = true;

include.routes({
     "atma": "/.reference/atma/{0}/lib/{1}.js",
     "atma_ruqq": "/.reference/atma/ruqq/lib/{0}.js",
     "atma_compo": "/.reference/atma/compos/{0}/lib/{1}.js",
     "bootstrap": "/.reference/bootstrap/{0}.less"
});

if (DEBUG){
	include.plugin({
		atma: 'include/include.autoreload'
	});
}

if (window.location.href.indexOf('file:') === 0){
    // use custom loader only in file protocol, assume server to handle coffeescript and less
	include.cfg({
		loader: {
			'coffee': {
				atma: 'include/loader/coffee/loader'
			},
			'less': {
				atma: 'include/loader/less/loader'
			}
		}
	});

}
