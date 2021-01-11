console.clear();

// instead of pre-defining tiles we're going to generate them on grid loop

import utils from '../../lib/utils.js'
import { VizShape, VizCircle, VizRect, VizCross, VizPolar, VizFlower, VizDiamond, VizSVG, VizDrop, VizTri } from '../../lib/shape/VizShape.js';
import VizTile from '../../lib/shape/VizTile.js'
import Viz2d from '../../lib/canvas/Viz2d.js';
import VizGrid from '../../lib/physics/VizGrid.js';
import SVGPATHS from '../assets/svg-paths.js';
import VizPalette from '../../lib/colour/VizPalette.js';

import COLOURPALETTES from '../assets/colour-palettes.js';
import VizVector from '../../lib/physics/VizVector.js';

console.log(COLOURPALETTES.length);

const paletteOpts = {
	// colourOrArr: COLOURPALETTES[118],
	colourOrArr: COLOURPALETTES[135],
	size: 6,
	type: 'mono' // analogous (size), mono (size), split (3), triad (3), tetrad (4)
}

let palette = new VizPalette(paletteOpts);

const vizScreen = new Viz2d();
vizScreen.clear(palette.darkest.toHslString());

const gridOptions = {
	type: 'iso', // square, iso, polar, size, custom
	dis: 'loose', // tight, regular, loose, sloppy, custom = arr, size == arr
	padding: false, // true or false
	cluster: 'right', // top, bottom, left, right, center, sides
	clusterAmount: 0.8
}

const grid = new VizGrid(vizScreen, gridOptions);

// invert gaus noise function
let invertGaus = function() {
	let val = Math.random()
					-Math.random()
					+Math.random()
					-Math.random();
	val += (val<0.0) ? 4.0 : 0.0;
	val *= 0.25;
	return val;
}

// you could have very random or slightly random for the chance of showing a random tile
grid.coords.forEach((el, i) => {

	let currentTile = new VizTile();

	currentTile.x = el.x;
	currentTile.y = el.y;
	currentTile.w = grid.xSize;
	currentTile.h = grid.ySize;
	currentTile.scale = 0.7;

	let size = grid.xSize;

	currentTile.addShape(new VizTri({
		x: 0, y: 0.75, w: size,
		fill: 'transparent',
		stroke: palette.removeDark[utils.randomInt(0, 4)],
		strokeWidth: 4.0,
		isAlive: utils.chance(0.8),
		ratio: 0.17,
		rotate: 90
	}))
	currentTile.addShape(new VizTri({
		x: 0, y: 0.75, w: size,
		fill: 'transparent',
		stroke: palette.removeDark[utils.randomInt(0, 4)],
		strokeWidth: 4.0,
		isAlive: utils.chance(0.8),
		ratio: 0.48,
		rotate: 90
	}))
	currentTile.addShape(new VizTri({
		x: 0, y: 0.75, w: size,
		fill: 'transparent',
		stroke: palette.removeDark[utils.randomInt(0, 4)],
		strokeWidth: 4.0,
		isAlive: utils.chance(0.8),
		ratio: 0.9,
		rotate: 90
	}))
	currentTile.addShape(new VizTri({
		x: 0, y: 0.75, w: size,
		fill: 'transparent',
		stroke: palette.removeDark[utils.randomInt(0, 4)],
		strokeWidth: 4.0,
		isAlive: utils.chance(0.8),
		ratio: 1.8,
		rotate: 90

	}))
	currentTile.addShape(new VizTri({
		x: 0, y: 0.25, w: size,
		fill: 'transparent',
		stroke: palette.removeDark[utils.randomInt(0, 4)],
		strokeWidth: 4.0,
		isAlive: utils.chance(0.8),
		ratio: 0.17,
		rotate: 270
	}))
	currentTile.addShape(new VizTri({
		x: 0, y: 0.25, w: size,
		fill: 'transparent',
		stroke: palette.removeDark[utils.randomInt(0, 4)],
		strokeWidth: 4.0,
		isAlive: utils.chance(0.8),
		ratio: 0.48,
		rotate: 270
	}))
	currentTile.addShape(new VizTri({
		x: 0, y: 0.25, w: size,
		fill: 'transparent',
		stroke: palette.removeDark[utils.randomInt(0, 4)],
		strokeWidth: 4.0,
		isAlive: utils.chance(0.8),
		ratio: 0.9,
		rotate: 270
	}))
	currentTile.addShape(new VizTri({
		x: 0, y: 0.25, w: size,
		fill: 'transparent',
		stroke: palette.removeDark[utils.randomInt(0, 4)],
		strokeWidth: 4.0,
		isAlive: utils.chance(0.8),
		ratio: 1.8,
		rotate: 270

	}))

	// // set isAlive for each
	currentTile.shapes.forEach((el, i) => {
		// el.isAlive = utils.chance(0.3);
	})

	currentTile.update(vizScreen.ctx);

})
