console.clear();
import Vizra from '../Vizra/Vizra.js';

import params from './state/params.js';

// MOVE ANALYSER INTO PARAMS AND SET IT UP THERE
// MIDI & ANALYSIS -> PARAMS -> SETUP -> DRAW

// ====================== SETUP

const canvasEl = document.querySelector('canvas');
const screenOne = new Vizra.canvas(canvasEl);

// const analyser = new Vizra.analyser();


// Viz creation starts here, this is what needs to be in 'new Viz()'
// set grid, palette & shape using controls
// you can have more than one shape
// grid
let coords = new Vizra.coords('custom', [ [40, 40], [100, 100], [200, 200], [400, 400] ]);
let grid = coords.coords;
// palette (jsconf2019)
const cols = [
	new Vizra.colour('#F3ECDA'), // cream
	new Vizra.colour('#F76272'), // orange
	new Vizra.colour('#E10079'), // pink
	new Vizra.colour('#A231EF'), // purple
	new Vizra.colour('#15216B') // blue
];
let palette = new Vizra.palette(cols, false);
console.log(palette.back);
// shape
let shape = new Vizra.shape({x: 10, y: 10}, Vizra.paths.rectangle(), 'white', 'pink');

function xTileOne() {
	let diamond = new Vizra.shape({x: 10, y: 10}, Vizra.paths.rectangle(), 'white', 'pink');
	diamond.draw(screenOne.ctx);
	let crossOne = new Vizra.shape({x: 10, y: 10}, Vizra.paths.cross(), 'white', 'pink');
	crossOne.draw(screenOne.ctx);
	let crossTwo = new Vizra.shape({x: 10, y: 10}, Vizra.paths.cross(), 'white', 'pink', {x: 0.5, y: 0.5}, 45);
	crossTwo.draw(screenOne.ctx);
}


// viz function
let frame = 0;
let debounce = 25;
let debounceCount = 0;
function viz(params) {

	coords.randomiseGrid();


	if (debounceCount === debounce) {
		screenOne.clear(palette.back);

		// palette.setHues(params.hi);

		grid.forEach(function(el, i) {

			// console.log(el);
			const canDraw = Math.random();
			const shapeScale = 1+(params.midi.cc/100);
			const colour = palette.hslaPalette[Vizra.utils.randomNumber(0,4)];

			shape.move = el;
			shape.fill = colour;
			shape.scale = {x: shapeScale, y: shapeScale};


			if ( (canDraw < 1) && (i%3 === 0) ) {
				shape.draw(screenOne.ctx);
				// xTileOne();
			}

		})

		debounceCount = 0;
	} else {
		debounceCount++;
	}

	frame++;
}

// AUDIO TEST ================
var context = new AudioContext({sampleRate: 41000});
var data = new Uint8Array(256);
var analyser = new AnalyserNode(context, {
	fftSize: 512,
	maxDecibels: -25,
	minDecibels: -60,
	smoothingTimeConstant: 0.5,
});

function getStreamData() {
	// pipe in analysing to getUserMedia
	return navigator.mediaDevices.getUserMedia({ audio: true, video: false })
		.then(stream => context.createMediaStreamSource(stream))
		.then(source => {
			source.connect(analyser);
		});
}

function getData() {
	analyser.getByteFrequencyData(data);
	analyser.data = data.slice(0, 128);
	analyser.bass = analyser.data[16];
	analyser.hi = analyser.data[64];
}

function draw() {
	requestAnimationFrame(draw);
	// analyser.getData();
	// console.log(analyser.data[100]);
	getData();
	console.log(params.midi.cc);
	viz(params);
}

// resume/start
window.addEventListener("keydown", event => {
	if (event.code === 'KeyR') {
		document.querySelector('#message').style.display = 'none';

		// for audio context see params.js
		// analyser.resume;

		// analyser.getStreamData().then(draw);

		context.resume
		getStreamData().then(draw);

	}
})

