import Vizra from '../../Vizra/Vizra.js';
// controller setup
import controls from './midiConfig.js';
// array of colour palettes
import palettes from './palettes.js';
// viz library
import vizLibrary from './vizLibrary.js';

console.log(palettes[0]);

// purely here for jsconfeu
let xCoords = [ [20, 20], [50, 50], [100, 50], [200, 50] ];

/*
This is a terrible way of doing this
Everything is happening in here:

App setup:
	Colour palette
	Shape
	Parameters for draw function

MIDI setup

Audio anlysis setup

Control switching

TODO: refactor the shit outta this
*/

// ===================== APP SETUP

let viz = vizLibrary[1];

// 	// analysis
// 	// Check audio part below: returns viz.data, viz.bass, viz.hi

// 	// midi
// 	midi: {},
// 	// check onMIDImessage function: we have midi.channel, midi.note & midi.vel

// 	// get sprite -> this is the function that draws whatever shape you want
// }


// ================================ MIDI
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

let set = 1;
function onMIDIMessage(message) {
	const data = message.data;

	// viz.midi.channel = data[0];
	// viz.midi.note = data[1];
	// viz.midi.vel = data[2];

	console.log('MIDI message: ', data);

	// if bank one
	if (data[0] === controls.setOne[0] && data[1] === controls.setOne[1]) {
		// switchViz(data);
		set = 1;
	} else if (data[0] === controls.setTwo[0] && data[1] === controls.setTwo[1]) {
		set = 2;
	} else if (data[0] === controls.colourControls[0] && data[1] === controls.colourControls[1]) {
		set = 3;
	} else if (data[0] === controls.shapeControls[0] && data[1] === controls.shapeControls[1]) {
		set = 4;
	}

	// arcade cc switch up
	switch (set) {

  	case 1:
  		switchViz(data);
    break;

    case 2:
  		switchViz(data, 2);
    break;

    case 3:
  		colourFX(data);
    break;

    case 4:
  		shapeFX(data);
    break;
  }

}

//======================= AUDIO
const binSize = 256;
const audioCtx = new AudioContext({sampleRate: 41000});
const analyser = new AnalyserNode(audioCtx, {
	fftSize: binSize*2,
	maxDecibels: -25,
	minDecibels: -60,
	smoothingTimeConstant: 0.5,
});

let data = new Uint8Array(binSize);

viz.getStreamData = function() {
	// pipe in analysing to getUserMedia
	return navigator.mediaDevices.getUserMedia({ audio: true, video: false })
		.then(stream => audioCtx.createMediaStreamSource(stream))
		.then(source => {
			source.connect(analyser);
		});
}

viz.getData = function() {
	analyser.getByteFrequencyData(data);
	viz.data = data.slice(0, 128);
	viz.bass = data[16];
	viz.hi = data[64];
}

viz.resume = function() {
	audioCtx.resume;
}

// ======================== CONTROLS
function switchViz(message, set = 1) {

	let setStartVal = controls.setOneShape[1];

	// calculate which button from button pressed minus lower value (gives us int 0-15)
	let index = message[1] - setStartVal;
	console.log('switch', index);

	viz = vizLibrary[index];

}

function colourFX(message) {

	// arcade cc switch up
	switch (message[1]) {

  	case controls.hueShift:
  		viz.palette.setHues(message[2]);
    break;

    case controls.satShift:
    	viz.palette.setSats(message[2]);
    break;

    case controls.lumShift:
    	viz.palette.setLums(message[2]);
    break;

    case controls.opShift:
    	viz.palette.setOps(message[2]);
    break;
  }

  // invert on and off
  if (message === controls.invertOn) {
  	viz.palette.invert;
  } else if (message === controls.invertOff) {
  	viz.palette.invert;
  }

  // palette switcher
  let paletteStartVal = controls.paletteSwitch[1];
	// switch case button -> array of sprites
	switch (message[1]) {

		case paletteStartVal:
			viz.palette = palettes[0];
			console.log('palette livejs')
		break;

		case (paletteStartVal + 1):
			viz.palette = palettes[1];
			console.log('palette asia')
		break;

		case (paletteStartVal + 2):
			viz.palette = palettes[2];
			console.log('palette rainbow')
		break;

		case (paletteStartVal + 3):
			viz.palette = palettes[3];
			console.log('palette something')
		break;

		case (paletteStartVal + 4):
			viz.palette = palettes[4];
		break;

		case (paletteStartVal + 5):
			viz.palette = palettes[5];
		break;

		case (paletteStartVal + 6):
			viz.palette = palettes[6];
		break;

		case (paletteStartVal + 7):
			viz.palette = palettes[7];
		break;

	}

	// blackout
	if (message === controls.blackOut) {
		viz.palette.setLums = -100;
	}

	// whiteout
	if (message === controls.whiteOut) {
		viz.palette.setLums = 100;
	}

	// showScreen (reset lums)
	if (message === controls.showScreen) {
		viz.palette.resetLums;
	}

	// reset palette
	if (message === controls.resetColours) {
		viz.palette.reset;
	}

}

function shapeFX(message) {

	// square
	if (message === controls.squareGrid) {
		console.log('grid switch');
		viz.grid.type = 'square';
	}

	// triangle
	if (message === controls.isoGrid) {
		viz.grid.type = 'iso';
	}

	// polar
	if (message === controls.polarGrid) {
		viz.grid.type = 'polar';
	}

	// custom -> make this the x for jsconfeu
	if (message === controls.customGridOne) {
		viz.grid = new Vizra.coords('custom', xCoords);
	}

}


// worker stuff
// const analysisWorker = new Worker('w_analysis.js');
// put message sending into a function, just to make sure it happens after we receive data...
// function sendMessageToWorker() {
//   analysisWorker.postMessage({'freqs': receivedData, 'newCounts': analyserSize});
// }

// // this shuld probably be moved to an audio module
// // TODO create shared array buffer for audio analysis in worker
// // Creating a shared buffer
// const length = 10;
//  // Get the size we want in bytes for the buffer
// const size = Int32Array.BYTES_PER_ELEMENT * length;
//  // Create a buffer for 10 integers
// const sharedBuffer = new SharedArrayBuffer(size);
// const sharedArray = new Int32Array(sharedBuffer);



export default viz;