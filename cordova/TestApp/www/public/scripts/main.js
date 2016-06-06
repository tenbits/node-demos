$(function() {


	var App = Compo({
		compos: {
			spectrum: 'compo:SpectrumDrawer',
			pageLogin: '$: .page[name=login]',
			pageMain: '$: .page[name=main]',
		},
		slots : {
			listenStop: function(){
				this.$.find('.trans').fadeOut();
				this.model.state = 'start';
				
				setTimeout(function() {
					this.compos.spectrum.grayOut();
				}.bind(this), 100);

				if (context) {
					context.suspend();
				}
			},
			listenStart: function(){
				this.model.state = 'stop';
				this.$.find('.trans').fadeIn();

				if (context == null) {
					Start();
					return;
				}

				context.resume();
			},
			login: function(){
				var out = this.compos.pageLogin.get(0)
				var _in = this.compos.pageMain.get(0);

				mask.animate(out, {
					model: "transform | translateX(0%) > translateX(-100%) | 200ms ease-in",
					next: 'display | > none'
				});
				mask.animate(_in, {
					model: [
						'display | block',
						'transform | translateX(-100%) > translateX(0%) | 200ms ease-in',
					]
				});
			},
			domInsert: function(){
				$(".tilt-spinner").each(createSpinner);
				this.$.find('.trans').fadeOut();
				this.compos.spectrum.grayOut();

				// var io = require('atma-io');
				// var self = this;
				// var p = 'file://D:/del/l.txt';
				// var file = new io.File(p);
				// file.write('');
				// setTimeout(function(){
				// 	file.watch(function(){
				// 		if (self.model.state === 'start') {
				// 			return;
				// 		}
				// 		file.content = null;
				// 		self.model.letters += file.read();
				// 	})
				// }, 500);
				
			}
		},
		onRenderEnd: function(){
			//
		},

		model: {
			state: 'start',
			letters: '',
		}
	})

	window.app = mask.run(App);
	$.material.init();


	var context, scriptNode, streamNode;

	//Start();

	function Start() {
		


		if (!navigator.getUserMedia)
			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia || navigator.msGetUserMedia;

		navigator.getUserMedia({
			audio: true
		}, start_microphone, function(e) {
			alert('Error capturing audio.');
		});

		

		function start_microphone(stream) {

			context = new AudioContext();
			scriptNode = context.createScriptProcessor();
			streamNode;

			scriptNode.onaudioprocess = function(event) {

				// get the average for the first channel
				var array = new Uint8Array(analyser.frequencyBinCount);
				analyser.getByteFrequencyData(array);

				
				app.compos.spectrum.refresh(array);


			};

			var microphone = context.createMediaStreamSource(stream);
			var node = context.createScriptProcessor(2048, 1, 1);
			var analyser = context.createAnalyser();
			analyser.smoothingTimeConstant = 0.3;
			analyser.fftSize = 512;


			var streamNode = context.createMediaStreamSource(stream);
			streamNode.connect(analyser);


			scriptNode.connect(context.destination);
			analyser.connect(scriptNode);


		}
	}

});