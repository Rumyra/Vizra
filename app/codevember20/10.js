console.clear();

// instead of pre-defining tiles we're going to generate them on grid loop

import utils from '../../lib/utils.js'
import { VizShape, VizCircle, VizRect, VizCross, VizPolar, VizFlower, VizDiamond, VizSVG, VizDrop } from '../../lib/shape/VizShape.js';
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
	colourOrArr: COLOURPALETTES[131],
	size: 6,
	type: 'mono' // analogous (size), mono (size), split (3), triad (3), tetrad (4)
}

let palette = new VizPalette(paletteOpts);

const vizScreen = new Viz2d();
vizScreen.clear(palette.darkest.toHslString());

const gridOptions = {
	type: 'square', // square, iso, polar, size, custom
	dis: 'loose', // tight, regular, loose, sloppy, custom = arr, size == arr
	padding: true, // true or false
	cluster: 'center', // top, bottom, left, right, center, sides
	clusterAmount: 0.8
}

const grid = new VizGrid(vizScreen, gridOptions);

// you could have very random or slightly random for the chance of showing a random tile
grid.coords.forEach((el, i) => {

	let currentTile = new VizTile();

	currentTile.x = el.x;
	currentTile.y = el.y;
	currentTile.w = grid.xSize;
	currentTile.h = grid.ySize;
	currentTile.scale = 1.67;

	let size = (grid.xSize / 5)-2;

	for (let i = 0; i < 16; i++) {
		let position = new VizVector((i % 4) * 0.2, Math.floor(i / 4) * 0.2);
		// draw circle
		currentTile.addShape(new VizCircle({
			x: position.x, y: position.y, w: size,
			fill: utils.chance(0.5) ? palette.colours[utils.randomInt(0, 4)] : 'transparent',
			stroke: palette.lightest,
			strokeWidth: 2.0,
		}))
		// draw cross
		currentTile.addShape(new VizCross({
			x: position.x, y: position.y, w: size, h: size,
			fill: utils.chance(0.5) ? palette.colours[utils.randomInt(0, 4)] : 'transparent',
			stroke: palette.lightest,
			strokeWidth: 2.0,
			rotate: 45,
			thickness: 8
		}))
		// draw rect
		currentTile.addShape(new VizRect({
			x: position.x, y: position.y, w: size-2, h: size-2,
			fill: 'transparent',
			stroke: palette.colours[utils.randomInt(0, 4)],
			strokeWidth: 2.0,

		}))


	}

	// set isAlive for each
	currentTile.shapes.forEach((el, i) => {
		el.isAlive = utils.chance(0.5);
	})

	currentTile.update(vizScreen.ctx);

})
