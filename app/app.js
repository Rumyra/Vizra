console.clear();
import Vizra from '../Vizra/Vizra.js';
// import viz from './setup/setup.js';

// should be in setup ==================
// controller setup
import controls from './setup/midiConfig.js';
// array of colour palettes
import palettes from './setup/palettes.js';
// some grids
import grids from './setup/coords.js';
// viz library
import vizLibrary from './setup/vizLibrary.js';


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

let viz = vizLibrary[0];

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

	console.log(data);

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

// ======================== CONTROLS
function switchViz(message, set = 1) {

	let setStartVal = controls.setOneShape[1];

	// calculate which button from button pressed minus lower value (gives us int 0-15)
	let index = message[1] - setStartVal;
	console.log('switch', index);

	if (message[0] === controls.setOneShape[0] || message[0] === controls.setTwoShape[0]) {
		viz = vizLibrary[index];
	}

}

function colourFX(message) {

	// arcade cc switch up
	if (message[0] === controls.colourCCchannel[0]) {
		switch (message[1]) {

	  	case controls.hueShift:
	  		viz.palette.setHues( Math.round( Vizra.utils.mapData(message[2], 127, 360) ) );
	    break;

	    case controls.satShift:
	    	viz.palette.setSats(Vizra.utils.mapData(message[2], 127, 100)-50 );
	    break;

	    case controls.lumShift:
	    	viz.palette.setLums(Vizra.utils.mapData(message[2], 127, 100)-50 );
	    break;

	    case controls.opShift:
	    	viz.palette.setOps(Vizra.utils.mapData(message[2], 127, 1) - 0.5 );
	    break;
	  }
	}

  // invert on and off
  if (message[0] === controls.invertOn[0] && message[1] === controls.invertOn[1]) {
  	viz.palette.invert();
  } else if (message[0] === controls.invertOff[0] && message[1] === controls.invertOff[1]) {
  	viz.palette.invert();
  }

  // palette switcher
  let paletteStartVal = controls.paletteSwitch[1];
	// switch case button -> array of sprites
	switch (message[1]) {

		case paletteStartVal:
			viz.palette = palettes[0];
			console.log('palette one')
		break;

		case (paletteStartVal + 1):
			viz.palette = palettes[1];
		break;

		case (paletteStartVal + 2):
			viz.palette = palettes[2];
		break;

		case (paletteStartVal + 3):
			viz.palette = palettes[3];
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
	if (message[0] === controls.blackOut[0] && message[1] === controls.blackOut[1]) {
		viz.palette.setLums(-100);
		console.log('black');

	}

	// whiteout
	if (message[0] === controls.whiteOut[0] && message[1] === controls.whiteOut[1]) {
		viz.palette.setLums(100);
		console.log('white');
	}

	// showScreen (reset lums)
	if (message[0] === controls.showScreen[0] && message[1] === controls.showScreen[1]) {
		viz.palette.resetLums;
		console.log('reset');
	}

	// reset palette
	if (message[0] === controls.resetColours[0] && message[1] === controls.resetColours[1]) {
		viz.palette.reset;
	}

}

function shapeFX(message) {

	// randomise grid
	if (message[0] === controls.randomiseGrid[0] && message[1] === controls.randomiseGrid[1]) {
		viz.grid.randomiseGrid();
	}

	// square
	if (message[0] === controls.squareGrid[0] && message[1] === controls.squareGrid[1]) {
		console.log('grid switch');
		viz.grid = new Vizra.coords('grid', 'regular');
	}

	// triangle
	if (message[0] === controls.isoGrid[0] && message[1] === controls.isoGrid[1]) {
		viz.grid = new Vizra.coords('iso', 'regular');
	}

	// polar
	if (message[0] === controls.polarGrid[0] && message[1] === controls.polarGrid[1]) {
		viz.grid = new Vizra.coords('polar', 'regular');
	}

	// X tile
	if (message[0] === controls.customGridOne[0] && message[1] === controls.customGridOne[1]) {
		viz.grid = grids.xCoords;
	}

	// center coords
	if (message[0] === controls.customGridTwo[0] && message[1] === controls.customGridTwo[1]) {
		viz.grid = grids.centerCoords;
	}

	// half coords
	if (message[0] === controls.customGridThree[0] && message[1] === controls.customGridThree[1]) {
		viz.grid = grids.halfCoords;
	}

	// quarter coords
	if (message[0] === controls.customGridFour[0] && message[1] === controls.customGridFour[1]) {
		viz.grid = grids.quarterCoords;
	}

}

//======================= AUDIO
const state = {};
const binSize = 256;
const audioCtx = new AudioContext({sampleRate: 41000});
const analyser = new AnalyserNode(audioCtx, {
	fftSize: binSize*2,
	maxDecibels: -25,
	minDecibels: -60,
	smoothingTimeConstant: 0.5,
});

let data = new Uint8Array(binSize);

state.getStreamData = function() {
	// pipe in analysing to getUserMedia
	return navigator.mediaDevices.getUserMedia({ audio: true, video: false })
		.then(stream => audioCtx.createMediaStreamSource(stream))
		.then(source => {
			source.connect(analyser);
		});
}

state.getData = function() {
	analyser.getByteFrequencyData(data);
	state.data = data.slice(0, 128);
	state.bass = data[16];
	state.hi = data[64];
}

state.resume = function() {
	audioCtx.resume;
}

// setup end =================================

console.log(viz);

function draw() {
	requestAnimationFrame(draw);
	// analyser.getData();
	// console.log(analyser.data[100]);
	state.getData();
	// console.log(state.data[10]);
	viz.drawViz(state);
}

// resume/start
window.addEventListener("keydown", event => {
	if (event.code === 'KeyR') {
		document.querySelector('#message').style.display = 'none';

		// for audio context see params.js
		// analyser.resume;

		// analyser.getStreamData().then(draw);

		state.resume
		state.getStreamData().then(draw);

	}
})

