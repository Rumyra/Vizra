console.clear();

import VizShape from '../../lib/shape/VizShape.js'
import VizTile from '../../lib/shape/VizTile.js'
import Viz2d from '../../lib/canvas/Viz2d.js';
import paths from '../../lib/shape/vizPaths.js';
import VizGrid from '../../lib/physics/VizGrid.js';
import tinycolor from '../../lib/colour/tinyCol.js';

import COLOURPALETTES from '../assets/colour-palettes.js';
// create a palette
// var colors = tinycolor.random().analogous(6, 20);
// var colors = tinycolor.random().monochromatic(6);
// var colors = tinycolor.random().splitcomplement();
// var colors = tinycolor.random().triad();
var colors = tinycolor.random().tetrad();
var colors = tinycolor.random().tetrad();
colors.map(function (t) { return t.toHexString(); });

// don't select this, add it to vizcanvas
const vizScreen = new Viz2d();

const gridOptions = {
	type: 'square', // square, iso, polar, size, custom
	dis: 'sloppy', // tight, regular, loose, sloppy, custom = arr, size == arr
	padding: true, // true or false
	cluster: 'right', // top, bottom, left, right, center, sides
	// clusterAmount: 0.8
}

const grid = new VizGrid(vizScreen, gridOptions);
console.log(grid);

// we want to auto generate tiles, based on different shapes in different positions and with different colours
// each tile on the grid can be auto generated, what we need is say three shapes, a way of changing their size & position and a colour pallette

// I knid of want to be able to do shapes like this:
// shapes = [circle, ratri, hex, rect]
// but also all the control too
// maube each shape needs exactly the same params and they are acessible - you can be precise about where you want them, what size they are and what colour they are.


// let's do a test with just the fill
// vizScreen.ctx.fillStyle = vizScreen.dots();
// vizScreen.ctx.arc(50, 50, 200, 0, 5);
// vizScreen.ctx.fill();

// TODO figure out shape fills
// TODO can we render tiles offscreen?
const shapeOptions = {
	position: [0, 0],
	size: [100, 100],
	// fill: vizScreen.gradient(),
	// fill: '#00ffee',
	fill: colors[0],
	stroke: '#8C578A',
	strokeWidth: 3.0
}

const diamond = new VizShape(paths.polar(100, 6, 50), shapeOptions);

// TODO sort out paths -> need only circle, radius one, couple of others, maybe a triangle with ratio
// TODO try them here
const shapes = [diamond,
	new VizShape(paths.circle(), shapeOptions)
]

// TODO allow for one value in each of the vectors - if there is one value both x & y are the same
grid.coords.forEach((el, i) => {

	const tileOptions = {
		position: [el.x, el.y],
		size: [el.xSize, el.ySize],
		scale: [Math.random() + 1, Math.random() + 1],
		rotate: Math.random() * 360,
		offset: [Math.random() * 50, Math.random() * 50]
	}

	const tile = new VizTile(shapes, tileOptions);
	tile.shapes.forEach(el => el.fill = colors[i % colors.length]);


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