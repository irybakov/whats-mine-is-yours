

/**
 * Audio Controller
 *
 * @author   Joel Ray
 * @version  0.0.1
 */
var AudioController = (function() {

	// =========================================================================================
	// CONSTRUCTOR -----------------------------------------------------------------------------

	function AudioController(url) {

		// INSTANCES
		this._audioContext = new (window.AudioContext || webkitAudioContext);
		this._source       = null;


		// SIGNALS
		this.onConnected   = null;
		this.onSourceEnded = null;


		// PROPERTIES
		this._inited      = false;
		this._position    = 0;
		this._startTime   = 0;
		this._buffer      = null;
		this.playing      = false;
		this.complete     = false;
		this.url          = url;

		if(this.url) _fetch.call(this);

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
			this._buffer = audioBuffer;
			this._inited = true;

			if(typeof(this.onConnected) == 'function') this.onConnected();
		}.bind(this));
	}


	// =========================================================================================
	// EVENT INTERFACE -------------------------------------------------------------------------

	function _handleSourceEnded() {
		if(this.playing) {
			// confirm this isn't being triggered from pause()

			this.pause();
			this._position = 0;
			this.complete = true;

			if(typeof(this.onSourceEnded) == 'function') this.onSourceEnded();
		}
	}


	return AudioController;

})();










