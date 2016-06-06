(function(){
	
	var CHAR_MS = 200; 
	
	include.exports = mask.class.create(mask.class.EventEmitter, {
		constructor (text, sampleRate, opts) {
			this.sampleRate = sampleRate;
			this.charMs = opts.speed || CHAR_MS;
			this.text  = text;
			this.reset();
		},
		size () {
			return this.charTotalBytes * this.text.length;
		},
		reset () {
			this.bytes = 0;
			this.count = 0;
			this.ended = false;
			this.char_     = this.text[0];
			this.charIndex = 0;
			this.charBytes = 0;
			this.charTotalBytes = 44100 / 1000 * this.charMs;
		},
		ended: false,
		readSingle (buffer, offset, count) {
			if (this.ended === true) {
				return;
			}
			if (this.charIndex === 0 && this.charBytes === 0) {
				this.emit('startLetter', this.char_);
			}
			var hz = LETTERS[this.char_];
			var freq = 2 * Math.PI * hz / this.sampleRate;
			
			this.charBytes += count;
			
			var length = this.charBytes >= this.charTotalBytes
				? count - (this.charBytes - this.charTotalBytes)
				: count;
				
			fillBuffer(
				freq, buffer, offset, length
			);
			
			if (count > length && this.moveNext()) {
				this.read(buffer, offset + length, count - length);
			}
		},
		read (buffer, offset, count) {
			if (this.ended === true) {
				return;
			}
			if (this.charIndex === 0 && this.charBytes === 0) {
				this.emit('start');
				this.emit('startLetter', this.char_);
			}
			var tuple = LETTERS[this.char_];
			if (tuple == null) {
				tuple = [ 1, 1];
			}
			var [hz1, hz2] = tuple;
			var freq1 = (2 * Math.PI * (hz1)) / (this.sampleRate);
			var freq2 = (2 * Math.PI * (hz2)) / (this.sampleRate);
			this.charBytes += count;
			
			var length = this.charBytes >= this.charTotalBytes
				? count - (this.charBytes - this.charTotalBytes)
				: count;
				
			fillBufferDbl(
				freq1, freq2, buffer, offset, length
			);
			
			if (count > length && this.moveNext()) {
				this.read(buffer, offset + length, count - length);
			}
		},
		moveNext () {
			if (this.charIndex >= this.text.length - 1) {
				this.ended = true;
				this.emit('ended', this);
				return false;
			}
			this.charBytes = 0;
			this.charIndex++;
			this.char_ = this.text[this.charIndex];
			console.log('next', this.char_, this.charIndex, this.text);
			this.emit('startLetter', this.char_);
			return true;
		}
	});
	
	function fillBuffer(freq, buffer, offset, length) {
		
		var i    = offset;
		var imax = i + length;
		if (imax > buffer.length) {
			imax = buffer.length;
		}
		
		for (; i < imax; i++) {
			buffer[i] = Math.sin(freq * ++sine);
		}
	}
	function fillBufferDbl(freq1, freq2, buffer, offset, length) {
		
		var i    = offset;
		var imax = i + length;
		if (imax > buffer.length) {
			imax = buffer.length;
		}
		
		for (; i < imax; i++) {
			++sine;
			buffer[i] = (Math.sin(freq1 * sine) + Math.sin(freq2 * sine)) / 2;
		}
	}
	
	
	var sine = 0;
	var LETTERS = {
		'1': [697, 1209],
		'2': [697 , 1336],
		'3': [697 , 1477],
		'4': [770 , 1209],
		'5': [770 , 1336],
		'6': [770 , 1477],
		'7': [852 , 1209],
		'8': [852 , 1336],
		'9': [852 , 1477],
		'0': [941 , 1336],
		'a': [697, 1633],
		'b': [770, 1633],
		'c': [852, 1633],
		'd': [941, 1633]
	};

}());