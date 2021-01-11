console.clear();

// NB this whole vix could be done with a polar shape - at the moment it is clipped

import utils from '../../lib/utils.js'
import { VizShape, VizCircle, VizRect, VizCross, VizPolar, VizFlower, VizDiamond, VizSVG, VizDrop } from '../../lib/shape/VizShape.js';
import VizTile from '../../lib/shape/VizTile.js'
import Viz2d from '../../lib/canvas/Viz2d.js';
import VizGrid from '../../lib/physics/VizGrid.js';

// TODO move this into palletts
import tinycolor from '../../lib/colour/tinyCol.js';
import COLOURPALETTES from '../assets/colour-palettes.js';

let palette = COLOURPALETTES[3];

// palette = palette.map(el => {
// 	return tinycolor(el);
// });
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
vizScreen.clear(palette[0]);


let fills = [
	palette[1],
	palette[2],
	palette[3],
	vizScreen.dots(10, palette[1], 'hsla(0, 0%, 0%, 0)'),
	vizScreen.dots(10, palette[2], 'hsla(0, 0%, 0%, 0)'),
	vizScreen.dots(10, palette[3], 'hsla(0, 0%, 0%, 0)'),
	vizScreen.lines(10, palette[1], 'hsla(0, 0%, 0%, 0)'),
	vizScreen.lines(10, palette[2], 'hsla(0, 0%, 0%, 0)'),
	vizScreen.lines(10, palette[3], 'hsla(0, 0%, 0%, 0)'),
]

const gridOptions = {
	type: 'square', // square, iso, polar, size, custom
	dis: 'regular', // tight, regular, loose, sloppy, custom = arr, size == arr
	padding: false, // true or false
	cluster: 'center', // top, bottom, left, right, center, sides
	clusterAmount: 0.1
}

const grid = new VizGrid(vizScreen, gridOptions);
console.log(grid);

grid.shiftGrid(40);

// TILES ===================
// TILE 1
let tile1 = new VizTile({
	shapes: [
		new VizCircle(),
	]
})

// clipping
const clip = new VizPolar({ sides: 6 });

// you could have very random or slightly random for the chance of showing a random tile
grid.coords.forEach((el, i) => {

	tile1.x = el.x;
	tile1.y = el.y;
	tile1.w = grid.xSize * 2 * Math.random();
	tile1.h = grid.ySize * 2 * Math.random();

	tile1.clip = clip.path;
	tile1.shapes[0].fill = fills[utils.randomInt(0, 8)];
	tile1.scale = 3 * Math.random();
	tile1.rotate = 36 * Math.random();

	tile1.update(vizScreen.ctx);
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