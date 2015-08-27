

/**
 * Audio Controller
 *
 * @author   Joel Ray
 * @version  0.0.1
 */
var AudioController = function(url) {

	// INSTANCES
	this.audioContext = new (window.AudioContext || webkitAudioContext);
	this.source       = null;


	// PROPERTIES
	this.inited         = false;
	this.playing        = false;
	this.position       = 0;
	this.startTime      = 0;
	this.buffer         = null;
	this.url            = url;


	// Let's go
	this.init();
}


// =========================================================================================
// INTERNAL INTERFACE ----------------------------------------------------------------------

AudioController.prototype.init = function() {
	// fetch audio stream
	this.fetch();
}


AudioController.prototype.fetch = function() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', this.url, true);
	xhr.responseType = 'arraybuffer';
	xhr.onload = function() { this.decode(xhr.response); }.bind(this);
	xhr.send();
}


AudioController.prototype.decode = function(arrayBuffer) {
	this.audioContext.decodeAudioData(arrayBuffer, function( audioBuffer ) {
		this.buffer = audioBuffer;
		this.inited = true;

		document.getElementsByTagName('h3')[0].innerHTML = "Click anywhere to start stream";
	}.bind(this));
}


AudioController.prototype.connect = function() {
	if(this.playing) this.pause();

	this.source = this.audioContext.createBufferSource();
	this.source.buffer = this.buffer;
	this.source.connect(this.audioContext.destination);
}



AudioController.prototype.play = function(position) {
	this.connect();

	this.position = typeof position === 'number' ? position : this.position || 0;
	this.startTime = this.audioContext.currentTime - ( this.position || 0 );
	this.source.start(this.audioContext.currentTime, this.position);
	this.playing = true;
}


AudioController.prototype.pause = function() {
	if(this.source) {
		this.source.stop(0);
		this.source = null;

		this.position = this.audioContext.currentTime - this.startTime;
		this.playing = false;
	}
}


AudioController.prototype.toggle = function() {
	!this.playing ? this.play() : this.pause();
}


// =========================================================================================
// EVENT INTERFACE -------------------------------------------------------------------------

AudioController.prototype.handleDocumentClick = function(e) {
	if(this.inited) this.toggle();
}











