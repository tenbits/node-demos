include
	.js('./TextStream.es6', './WavConverter.es6')
	.done(function(resp){
	
	var ctx = new AudioContext,
		ctxNode = ctx.createScriptProcessor(2048, 1, 1);
	
	var state_READY   = 0,
		state_PLAYING = 1;
	
			
	
	include.exports = new (mask.class.create(mask.class.EventEmitter, {
		ctx: null,
		ctxNode: null,
		constructor () {
			this.process = this.process.bind(this);
			ctxNode.onaudioprocess = this.process;
		},
		createSpeakersOutput () {
			
		},
		createOfflineOutput () {
			this.destroy();
			
			ctx = new OfflineAudioContext(1, 44100*40, 44100);
			ctxNode = ctx.createScriptProcessor(2048, 1, 1);
			ctxNode.onaudioprocess = this.process;
		},
		destroy () {
			ctx && ctx.suspend && ctx.suspend();
		},
		state: state_READY, 
		play (text, opts) {
			if (this.state === state_PLAYING) {
				this.stop();
			}
			this.createSpeakersOutput();
			this.stream = new resp.TextStream(text, ctx.sampleRate, opts);
			this
				.stream
				.on('ended', () => {
					this.stop();
				})
				.on('start', () => this.emit('start'))
				.on('startLetter', (c) => this.emit('startLetter', c))
			this.start();
		},
		generate (text, opts) {
			return mask.class.Deferred.run((resolve, reject) => {
				this.stream = new resp.TextStream(text, ctx.sampleRate, opts);
				this
					.stream
					.on('start', () => this.emit('start'))
					.on('startLetter', (c) => this.emit('startLetter', c));
				
				var buffer = new Float32Array(this.stream.size());
				this.stream.read(buffer, 0, buffer.length);
				
				resp.WavConverter.toBlob([ buffer ], resolve);
			});
		},
		generateMany (texts, opts) {
			return mask.class.Deferred.run((resolve, reject) => {
				var result = [];
				var next = (blob) => {
					result.push({
						text: texts.shift(),
						blob: blob
					});
					if (texts.length === 0) {
						resolve(result);
						return;
					}
					this.generate(texts[0], opts).done(next);
				};
				
				this.generate(texts[0], opts).done(next);
			});
			
		},
		index: 0,
		process (event) {
			if (this.stream.ended === true) {
				return;
			}
			
			var audioBuffer = event.outputBuffer,
				buffer = audioBuffer.getChannelData(0);
			
			this.stream.read(buffer, 0, buffer.length);
			//fillBuffer(buffer, 'a', audioBuffer.sampleRate, buffer.length);
		},
		start () {
			this.state = state_PLAYING;
			
			ctx.resume();
			ctxNode.connect(ctx.destination);
		},
		stop () {
			ctxNode.disconnect(ctx.destination);
			ctx.suspend();
			this.emit('stop');
			this.state = state_READY;
		}
	}));
	
	var sine = 0;
	function fillBuffer(buffer, char_, sampleRate, bufferLength) {
		if (buffer == null) {
			buffer = new Float32Array(bufferLength);
		}
		//var sine = 0;
		var hz = TABLE[char_];
		var sampleFreq = 2 * Math.PI * hz / sampleRate;
		
		for (var i = 0; i < bufferLength; i++) {
			buffer[i] = Math.sin(sampleFreq * ++sine);
		}
		return buffer;
	}
	
	var TABLE = {
		'a': 697
	};
});
