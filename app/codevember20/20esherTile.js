console.clear();

// I'm going to refactor the grid class - this is a breaking change

import utils from '../../lib/utils.js'
import { VizShape, VizCircle, VizRect, VizCross, VizPolar, VizFlower, VizDiamond, VizSVG, VizDrop, VizTri, VizEsher } from '../../lib/shape/VizShape.js';
import VizTile from '../../lib/shape/VizTile.js'
import Viz2d from '../../lib/canvas/Viz2d.js';
import VizGrid from '../../lib/physics/VizGrid.js';
import VizPalette from '../../lib/colour/VizPalette.js';

import COLOURPALETTES from '../assets/colour-palettes.js';

// TODO PALETTE: new vizPalette(col, opts) generally just pass in an array, as options are really for one colour

const paletteOpts = {
	// colourOrArr: COLOURPALETTES[118],
	colourOrArr: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'],
	size: 6,
	type: 'mono' // analogous (size), mono (size), split (3), triad (3), tetrad (4)
}

let palette = new VizPalette(paletteOpts);

const vizScreen = new Viz2d();
vizScreen.clear(palette.darkest.toHslString());

// const gridOptions = {
// 	type: 'iso', // square, iso, polar, size, custom
// 	dis: 'loose', // tight, regular, loose, sloppy, custom = arr, size == arr
// 	padding: false, // true or false
// 	cluster: 'right', // top, bottom, left, right, center, sides
// 	clusterAmount: 0.8
// }

const gridOptions = {
	spacing: 0.6,
	padding: false,
	offset: 0.5,
	axis: 'x',
	dis: [0, 0],
	falloff: 0.5
}

const grid = new VizGrid(vizScreen.width, vizScreen.height, gridOptions);

console.log(grid.offset, grid._returnOrigSize() * grid.xCount);

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

grid.forEach((el, i) => {

	let currentTile = new VizTile();

	currentTile.x = el.x;
	currentTile.y = el.y;
	currentTile.w = grid.cw;
	currentTile.h = grid.ch;

	let size = grid.cw;

	currentTile.addShape(new VizEsher({
		x: 0, y: 0, w: size,
		fill: 'transparent',
		stroke: palette.removeDark[utils.randomInt(0, 4)],
		strokeWidth: 4.0,
		rotate: 90
	}))

	currentTile.update(vizScreen.ctx);

})
