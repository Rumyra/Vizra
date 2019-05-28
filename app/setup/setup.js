import controls from './midiConfig.js';

/*
This is a terrible way of doing this
Everything is happening in here:

Audio anlysis setup

MIDI setup

Control switching


TODO: refactor the shit outta this
*/

// Parameter setup - returns midi & analysis values

var params = new Object();

// these go in setup and draw - so we're looking at returning midi channel, midi note, midi velocity
// remember cc's don't have a note(?)
params.midi = {};
params.midi.event = true;
params.midi.channel =
params.midi.cc = 45;
params.midi.on = [];

// param.analyser.data = [];
// param.analyser.bass = 100;
// param.analyser.hi = 100;
// param.analyser.beat = true;

//================================ MIDI
// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
	// when we get a succesful response, run this code
	const midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

	var inputs = midi.inputs.values();
	// loop over all available inputs and listen for any MIDI input
	for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
			// each time there is a midi message call the onMIDIMessage function
			input.value.onmidimessage = onMIDIMessage;
	}
}

function onMIDIFailure(error) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

function onMIDIMessage(message) {
	const data = message.data;
	var event = new CustomEvent('midi', { detail: data });

	if (data[0] === controls.shapeSwitch) {
		params.midi.on = data[1];
	}
	if (data[0] === controls.fx) {
		params.midi.cc = data[2];
	}
}

//======================= AUDIO


// worker stuff
// const analysisWorker = new Worker('w_analysis.js');
// put message sending into a function, just to make sure it happens after we receive data...
// function sendMessageToWorker() {
//   analysisWorker.postMessage({'freqs': receivedData, 'newCounts': analyserSize});
// }

// this shuld probably be moved to an audio module
// TODO create shared array buffer for audio analysis in worker
// Creating a shared buffer
const length = 10;
 // Get the size we want in bytes for the buffer
const size = Int32Array.BYTES_PER_ELEMENT * length;
 // Create a buffer for 10 integers
const sharedBuffer = new SharedArrayBuffer(size);
const sharedArray = new Int32Array(sharedBuffer);


const events = {
	// beat: analyser.beat,

	// bpm from audio

	// framerate -> takes framerate in ms and approx framerate of raf
	framerate: function(ms, fr = 50) {
		return true;
	},

	// bpm based on approx framerate
	bpmFr: []
}

export default params;