console.clear();

// I'm going to refactor the grid class - this is a breaking change
// adding noise & distribution to grid

import utils from '../../lib/utils.js';
import SimplexNoise from '../../lib/simplex.js';
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
	offset: 0,
	axis: 'x',
	dis: [0, 0.5],
	falloff: [1, 1]
}

const grid = new VizGrid(vizScreen.width, vizScreen.height, gridOptions);
console.log(vizScreen.width);

// console.log(grid.offset, grid._returnOrigSize() * grid.xCount);

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

let size = grid.cw;
let shapes = [];
for (let i=0; i<1; i++) {

	let shape = new VizEsher({
		x: i%2 === 0 ? 0.25 : 0.75,
		y: i<2 ? 0.25 : 0.75,
		w: size/2, h: size/2,
		fill: 'transparent',
		stroke: palette.removeDark[utils.randomInt(0, 4)],
		strokeWidth: 4.0,
		randomise: 0.8,
		points: 1,
		corner: false,
		isCurved: true
	})
	shapes.push(shape);
}

let tile = new VizTile();
tile.shapes = shapes;

let simplex = new SimplexNoise('seed');
let value2d = simplex.noise2D(1, 1);

// el is {x, y} i is [cx, cy]
grid.forEach((el, i) => {

	let chanceVal = simplex.noise2D(i[0], i[1]);

	tile.x = el.x;
	tile.y = el.y;
	tile.w = grid.cw;
	tile.h = grid.ch;

	// if (chanceVal > 0) {
	// 	tile.update(vizScreen.ctx);
	// }

	// console.log(el.isAlive);
	if (el.isAlive === true) {
		tile.update(vizScreen.ctx)
	}

})
