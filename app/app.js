console.clear();
import Vizra from '../Vizra/Vizra.js';
import viz from './setup/setup.js';


let coords = new Vizra.coords('grid', 'loose').coords;
coords = coords.slice(0,2);

// shape
let shape = new Vizra.shape({x: 10, y: 10}, Vizra.paths.rectangle(), 'yellow', 'pink');

function xTileOne() {
	let diamond = new Vizra.shape({x: 10, y: 10}, Vizra.paths.rectangle(), 'white', 'pink');
	diamond.draw(viz.screen.ctx);
	let crossOne = new Vizra.shape({x: 10, y: 10}, Vizra.paths.cross(), 'white', 'pink');
	crossOne.draw(viz.screen.ctx);
	let crossTwo = new Vizra.shape({x: 10, y: 10}, Vizra.paths.cross(), 'white', 'pink', {x: 0.5, y: 0.5}, 45);
	crossTwo.draw(viz.screen.ctx);
}


// viz function
let frame = 0;
let debounce = 25;
let debounceCount = 0;

console.log(coords);

function drawViz() {

	// viz.grid.randomiseGrid();

	shape.move = {x: 100, y: 100};

	shape.draw(viz.screen.ctx);

	shape.move = {x: 300, y: 300};

	shape.draw(viz.screen.ctx);

	if (debounceCount === debounce) {
		viz.screen.clear(viz.palette.back);

		// viz.palette.setHues(params.hi);

		// viz.coords.forEach(function(el, i) {
		// coords.forEach(function(el, i) {

			// console.log(el.y);
			// const canDraw = Math.random();
			// const shapeScale = 1+(params.midi.cc/100);
			// const colour = viz.palette.hslaPalette[Vizra.utils.randomNumber(0,4)];

			// shape.move = el;
			// shape.fill = colour;
			// shape.scale = {x: shapeScale, y: shapeScale};


			// if ( (canDraw < 1) && (i%3 === 0) ) {
			// if ( (canDraw < 1) ) {
				// shape.draw(viz.screen.ctx);
				// xTileOne();
			// }

		// }) // forEach

		debounceCount = 0;
	} else {
		debounceCount++;
	}

	frame++;
}



function draw() {
	requestAnimationFrame(draw);
	// analyser.getData();
	// console.log(analyser.data[100]);
	viz.getData();
	// console.log(viz.data[10]);
	drawViz();
}

// resume/start
window.addEventListener("keydown", event => {
	if (event.code === 'KeyR') {
		document.querySelector('#message').style.display = 'none';

		// for audio context see params.js
		// analyser.resume;

		// analyser.getStreamData().then(draw);

		viz.resume
		viz.getStreamData().then(draw);

	}
})

