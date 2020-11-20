console.clear();

// import VizShape from '../../lib/shape/VizShape.js'
import { VizShape, VizCircle } from '../../lib/shape/VizShape.js';
import VizTile from '../../lib/shape/VizTile.js'
import Viz2d from '../../lib/canvas/Viz2d.js';
import paths from '../../lib/shape/vizPaths.js';
import VizGrid from '../../lib/physics/VizGrid.js';

// TODO move this into palletts
import tinycolor from '../../lib/colour/tinyCol.js';
import COLOURPALETTES from '../assets/colour-palettes.js';

let palette = COLOURPALETTES[26];

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
	dis: 'loose', // tight, regular, loose, sloppy, custom = arr, size == arr
	padding: false, // true or false
	cluster: null, // top, bottom, left, right, center, sides
	clusterAmount: 0.8
}

const grid = new VizGrid(vizScreen, gridOptions);

// TODO figure out shape fills
// TODO can we render tiles offscreen?
const star1opts = {
	path: paths.flower(60, 5),
	position: [0, 0],
	size: [100, 100],
	// fill: vizScreen.gradient(),
	// fill: '#00ffee',
	fill: palette[0],
	stroke: '#8C578A',
	strokeWidth: 3.0
}

const star1 = new VizShape(star1opts);

const circleOpts = {
	x: 20,
	y: 0,
	w: 50,
	h: 50,
	fill: palette[0],
	stroke: '#8C578A',
	strokeWidth: 3.0
}

const circle = new VizCircle(circleOpts);

const shapes = [
	star1,
	circle
]

// what we want to do
// new Tile([
// 	circle(x, y, w, h, fill, stroke, strokeWidth),
// 	rect(x, y, w, h, fill, stroke, strokeWidth),
// ])

// TODO allow for one value in each of the vectors - if there is one value both x & y are the same - infact no arrays, either one or .x .y
grid.coords.forEach((el, i) => {

	const tileOptions = {
		position: [el.x, el.y],
		size: [el.xSize, el.ySize],
		// scale: [Math.random() + 1, Math.random() + 1],
		scale: [2, 2],
		// rotate: Math.random() * 360,
		// offset: [Math.random() * 50, Math.random() * 50]
	}

	const tile = new VizTile(shapes, tileOptions);
	tile.shapes.forEach((el) => {
		const fill = palette[i % palette.length].setAlpha(0.4);
		el.fill = fill;
	});


	tile.update(vizScreen.ctx);
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