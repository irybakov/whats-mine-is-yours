

/**
 * Audio Controller
 *
 * @author   Joel Ray
 * @version  0.0.2
 */
var AudioController = (function() {

	// =========================================================================================
	// CONSTRUCTOR -----------------------------------------------------------------------------

	function AudioController(url) {

		// INSTANCES
		this._audioContext = new (window.AudioContext || webkitAudioContext);
		this._source       = null;
		this._connectionQueue = [];


		// SIGNALS
		this.onConnected   = null;
		this.onSourceEnded = null;


		// PROPERTIES
		this._inited      = false;
		this._position    = 0;
		this._startTime   = 0;
		this._duration    = 0;
		this._buffer      = null;
		this.playing      = false;
		this.complete     = false;
		this.url          = url;

	}


	// =========================================================================================
	// PUBLIC INTERFACE ------------------------------------------------------------------------

	AudioController.prototype.connect = function() {
		if(this.playing) this.pause();

		this._source = this._audioContext.createBufferSource();
		this._source.buffer = this._buffer;
		this._source.onended = _handleSourceEnded.bind(this);
		this._source.connect(this._audioContext.destination);
	}



	AudioController.prototype.play = function(position) {

		// TODO: Refactor this. This shouldn't require a queue; Should be of single instance.
		if(!this._inited || this.playing) {
			this.pause();
			this._connectionQueue.push( new AudioConnectionQueueItem( position ));
			return _fetch.call(this);
		}

		this.connect();
		this._position = typeof position === 'number' ? position : this._position || 0;
		this._startTime = this._audioContext.currentTime - ( this._position || 0 );
		this._source.start(this._audioContext.currentTime, this._position);
		this.playing = true;
		this.complete = false;
	}


	AudioController.prototype.pause = function() {
		if(this._source) {
			this.playing = false;
			this._inited = false;
			this._position = this._audioContext.currentTime - this._startTime;

			this._source.stop(0);
			this._source = null;
		}
	}


	AudioController.prototype.toggle = function() {
		!this.playing ? this.play() : this.pause();
	}


	// =========================================================================================
	// INTERNAL INTERFACE ----------------------------------------------------------------------

	function _fetch() {
		var self = this;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', this.url, true);
		xhr.responseType = 'arraybuffer';
		xhr.onload = function() { _decode.call(self, xhr.response); };
		xhr.send();
	}


	function _decode(arrayBuffer) {
		this._audioContext.decodeAudioData(arrayBuffer, function( audioBuffer ) {
			this._buffer   = audioBuffer;
			this._duration = audioBuffer.duration;
			this._inited   = true;

			_releaseConnectionQueueItems.call(this);
		}.bind(this));
	}


	function _releaseConnectionQueueItems() {
		var queueItem, i = this._connectionQueue.length;
		while(this._connectionQueue.length) {
			queueItem = this._connectionQueue[i-1];

			this._connectionQueue.pop();
			this.play(Number(queueItem.position))
		}
	}


	// =========================================================================================
	// EVENT INTERFACE -------------------------------------------------------------------------

	function _handleSourceEnded() {
		if(this.playing) {
			this.pause();
			this._position = 0;
			this.complete = true;

			if(typeof(this.onSourceEnded) == 'function') this.onSourceEnded();
		}
	}


	return AudioController;

})();










