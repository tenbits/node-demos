(function() {
	var recLength = 0,
		numChannels = 1,
		sampleRate = 44100,
		recBuffers = [];
		
	include.exports = {
		toBlob: function(buffers, done) {
			sendWaveToPost(buffers, done);
		}
	};
	
		
	function sendWaveToPost(buffers, done) {
	  var worker = new Worker('public/scripts/recorderWorker.js');
	 
	  // initialize the new worker
	  worker.postMessage({
		command: 'init',
		config: {
			numChannels: 2,
		  sampleRate: 44100
		}
	  });
	 
	  // callback for `exportWAV`
	  worker.onmessage = function(e) {
		done(e.data);
		
	  };

	  // send the channel data from our buffer to the worker
	  worker.postMessage({
		command: 'record',
		buffer: [
		  buffers[0],
		  buffers[0],
		  //buffer.getChannelData(1)
		]
	  });
	 
	  // ask the worker for a WAV
	  worker.postMessage({
		command: 'exportWAV',
		type: 'audio/wav'
	  });
	}
}());