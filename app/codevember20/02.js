console.clear();

import utils from '../../lib/utils.js'
import { VizShape, VizCircle, VizRect, VizCross, VizPolar, VizFlower, VizDiamond, VizSVG, VizDrop } from '../../lib/shape/VizShape.js';
import VizTile from '../../lib/shape/VizTile.js'
import Viz2d from '../../lib/canvas/Viz2d.js';
import VizGrid from '../../lib/physics/VizGrid.js';

// TODO move this into palletts
import tinycolor from '../../lib/colour/tinyCol.js';
import COLOURPALETTES from '../assets/colour-palettes.js';

let palette = COLOURPALETTES[20];

palette = palette.map(el => {
	return tinycolor(el);
});
console.log(palette);
// create a palette
// var colors = tinycolor.random().analogous(6, 20);
// var colors = tinycolor.random().monochromatic(6);
// var colors = tinycolor.random().splitcomplement();
// var colors = tinycolor.random().triad();
// var colors = tinycolor.random().tetrad();
// var colors = tinycolor.random().tetrad();
// colors.map(function (t) { return t.toHexString(); });

const vizScreen = new Viz2d();

const gridOptions = {
	type: 'square', // square, iso, polar, size, custom
	dis: 'sloppy', // tight, regular, loose, sloppy, custom = arr, size == arr
	padding: false, // true or false
	cluster: null, // top, bottom, left, right, center, sides
	clusterAmount: 0.8
}

const grid = new VizGrid(vizScreen, gridOptions);
console.log(grid);

// TILES ===================
let tiles = [];
// TILE 1
let tile1 = new VizTile({
	shapes: [
		new VizCircle({ x: 0.5, y: 0.5, w: 1, h: 1, fill: palette[0] }),
		new VizCircle({ x: 0.5, y: 0.5, w: 0.65, h: 0.65, fill: palette[1] }),
		new VizDrop({ x: 0.3, y: 0.3, w: 0.6, h: 0.6, rotate: 270, fill: palette[4] }),
		new VizCircle({ x: 0.5, y: 0.5, w: 0.3, h: 0.3, fill: palette[2] }),
	]
})
tiles.push(tile1);

// TILE 2
let tile2 = new VizTile({
	shapes: [
		new VizCircle({ x: 0.75, y: 0.25, w: 0.5, fill: palette[0] }),
		new VizCircle({ x: 0.25, y: 0.75, w: 0.5, fill: palette[3] }),
		new VizCircle({ x: 0.75, y: 0.75, w: 0.5, fill: palette[2] }),
		new VizDrop({ x: 0.25, y: 0.25, w: 0.5, h: 0.5, rotate: 270, fill: palette[4] }),
	]
})
tiles.push(tile2);

// TILE 3
let tile3 = new VizTile({
	shapes: [
		// new VizFlower({x: 0.5, y: 0.5, w: 1, h: 1, petals: 1, roundness: 0.9, thickness: 0.6, fill: palette[1], rotate: 40}),
		new VizDrop({ x: 0.6, y: 0.6, w: 0.8, h: 0.8, fill: palette[2], rotate: 90 }),
		new VizDrop({ x: 0.7, y: 0.7, w: 0.6, h: 0.6, fill: palette[3], rotate: 90}),
		new VizDrop({ x: 0.8, y: 0.8, w: 0.4, h: 0.4, fill: palette[4], rotate: 90 }),
	]
})
tiles.push(tile3);

// TILE 4
let tile4 = new VizTile({
	shapes: [
		new VizRect({ x: 0.33, y: 0.33, w: 0.3, h: 0.3, fill: palette[3] }),
		new VizRect({ x: 0.33, y: 0.33, w: 0.15, h: 0.15, fill: palette[1] }),
		new VizRect({ x: 0.33, y: 0.67, w: 0.3, h: 0.3, fill: palette[3] }),
		new VizRect({ x: 0.33, y: 0.67, w: 0.15, h: 0.15, fill: palette[1] }),
		new VizRect({ x: 0.67, y: 0.33, w: 0.3, h: 0.3, fill: palette[3] }),
		new VizRect({ x: 0.67, y: 0.33, w: 0.15, h: 0.15, fill: palette[1] }),
		new VizRect({ x: 0.67, y: 0.67, w: 0.3, h: 0.3, fill: palette[3] }),
		new VizRect({ x: 0.67, y: 0.67, w: 0.15, h: 0.15, fill: palette[1] }),
	]
})
tiles.push(tile4);

// TILE 5
let tile5 = new VizTile({
	shapes: [
		new VizCircle({ x: 0.5, y: 0.5, w: 0.8, fill: palette[3] }),
		new VizFlower({x: 0.5, y: 0.5, w: 1, petals: 4, roundness: 0.6, thickness: 0.2, fill: palette[2], rotate: 45})

	]
})
tiles.push(tile5);


const floweropts = {
	x: 0.2,
	y: 0,
	w: 0.5,
	h: 0.5,
	fill: palette[0],
	stroke: '#8C578A',
	strokeWidth: 3.0,
	petals: 3
}

const flower = new VizFlower(floweropts);

// you could have very random or slightly random for the chance of showing a random tile
grid.coords.forEach((el, i) => {

	const cTileIndex = utils.chance(0.5) ? (i % 4) : utils.randomInt(0, 4);
	const currentTile = tiles[cTileIndex];

	currentTile.x = el.x;
	currentTile.y = el.y;
	currentTile.w = grid.xSize;
	currentTile.h = grid.ySize;
	currentTile.rotate = (utils.randomInt(0, 3) * 90);

	currentTile.update(vizScreen.ctx);
})

// could just be screen.update(grid, tile(s));


// Ideally creating a viz will go something like this:

// index file with canvas instigated (stage?), this is the global context
// create module files for each viz - this is the master example
	// each module (viz) file contains:
	// palette (opt otherwise use default)
	// a set (array) of tiles -> possibly here dictate the distribution of said tiles
	// a grid for distribution (opt otherwise default)

// I'm unsure at this time whether the grid should hold the vectors and physics or the tiles should

// then a main controller file imports whichever viz wants to be display, which is switchable

// params are both global and specific and should be passed into controller, which can pass it onto each part of viz

// could each viz have so much manipulation it becomes a 'set' and you switch out the viz to change set? That way you bypass 'sets' and just have 16/32 viz to switch out - yes -> a vis needs: palette, tile, grid all of which are controllable
// midi controllers have 4 banks, one for colour, viz, grid and switching
// Can each grid vector contain direction, weight & friction? What about neighbours -> boid

// viz param suggestions:
// paths & tiles: transforms & fills for each path (maybe even the path itself: manipulate points & curves), tranforms and palette for each tile
// colours & palettes: each individual colour change (h, s, b, a), and overall palette: hue shift, invert, brightness, greyscale
// vectors & grid: manipulate individual vectors, switch out type of grid, change size of grid & whether it is 'drawn' or not -> should this be a property of Vi? No let's keep it as part of the grid for now, there's not enough dials to manipulate each grid item