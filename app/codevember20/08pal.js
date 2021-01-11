console.clear();

// shows all palettes with index

// this is the one that first introduces palettes properly - it will have broken previous

import utils from '../../lib/utils.js'
import { VizShape, VizCircle, VizRect, VizCross, VizPolar, VizFlower, VizDiamond, VizSVG, VizDrop } from '../../lib/shape/VizShape.js';
import VizTile from '../../lib/shape/VizTile.js'
import Viz2d from '../../lib/canvas/Viz2d.js';
import VizGrid from '../../lib/physics/VizGrid.js';
import SVGPATHS from '../assets/svg-paths.js';
import VizPalette from '../../lib/colour/VizPalette.js';

import COLOURPALETTES from '../assets/colour-palettes.js';

console.log(COLOURPALETTES.length);

const paletteOpts = {
	colourOrArr: COLOURPALETTES[0],
	size: 6,
	type: 'mono' // analogous (size), mono (size), split (3), triad (3), tetrad (4)
}

let palette = new VizPalette(paletteOpts);

const vizScreen = new Viz2d();
// vizScreen.clear(palette[0]);
vizScreen.clear(palette.lightest.toHslString());

const gridOptions = {
	type: 'size', // square, iso, polar, size, custom
	dis: 'loose', // tight, regular, loose, sloppy, custom = arr, size == arr
	padding: true, // true or false
	// cluster: 'top', // top, bottom, left, right, center, sides
	clusterAmount: 0.8
}

const grid = new VizGrid(vizScreen, gridOptions);
console.log(grid.coords.length);

// TILES ===================
let tiles = [];
// TILE 1
let tile1 = new VizTile({
	shapes: [
		new VizRect({ x: 0.05, y: 0.05, w: 0.19, h: 0.9, fill: palette.palette[0] }),
		new VizRect({ x: 0.24, y: 0.05, w: 0.19, h: 0.9, fill: palette.palette[1] }),
		new VizRect({ x: 0.43, y: 0.05, w: 0.19, h: 0.9, fill: palette.palette[2] }),
		new VizRect({ x: 0.62, y: 0.05, w: 0.19, h: 0.9, fill: palette.palette[3] }),
		new VizRect({x: 0.81, y: 0.05, w: 0.19, h: 0.9, fill: palette.palette[4]})
	]
})
tiles.push(tile1);

// you could have very random or slightly random for the chance of showing a random tile
grid.coords.forEach((el, i) => {

	// const cTileIndex = utils.randomInt(0, 1);
	const currentTile = tiles[0];

	currentTile.x = el.x;
	currentTile.y = el.y;
	currentTile.w = grid.xSize;
	currentTile.h = grid.ySize;

	const palIndex = (i % 200) + 71;
	const curPal = COLOURPALETTES[palIndex];
	currentTile.shapes.forEach((el, i) => {
		el.fill = curPal[i];
	})

	currentTile.update(vizScreen.ctx);

	// purely just for index val
	vizScreen.ctx.save();
	vizScreen.ctx.translate(el.x, el.y);
	vizScreen.ctx.fillStyle = 'black';
	vizScreen.ctx.font = '40px sans-serif';
	vizScreen.ctx.fillText(palIndex, 20, 20);
	vizScreen.ctx.restore();
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