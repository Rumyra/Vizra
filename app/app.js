console.clear();

import VizTile from '../lib/shape/VizTile.js'
import Canvas from '../lib/Canvas.js';
import paths from '../lib/shape/vizPaths.js';
import VizGrid from '../lib/physics/VizGrid.js';

// don't select this, add it to vizcanvas
const vizScreen = new Canvas();

const grid = new VizGrid(vizScreen, 'grid', 'regular', false);

grid.coords.forEach((el, i) => {
	const shape = new VizTile(el.x, el.y, paths.circle());
	shape.fill = 'hsla(0, 50%, 50%, 1)';
	shape.update(vizScreen.ctx);
} )



// Ideally creating a viz will go something like this:

// index file with canvas instigated (stage?), this is the global context
// create module files for each viz - this is the master example
// create colour palette (made from colours), tile (made from paths) & grid (made from boids). Each of these has it's own set of global params, controlled by audio & midi state
// create an array of 'VizTiles', by looping over grid, using boid physics and adding a facade

// draw viz by passing in array and params (loop over VizTiles array & draw)
// could each viz have so much manipulation it becomes a 'set' and you switch out the viz to change set? That way you bypass 'sets' and just have 16/32 viz to switch out
// Can each grid vector contain direction, weight & friction? What about neighbours -> boid

// what do you want to be able to change via params? -> adding to state
// viz
// paths & tiles: transforms & fills for each path (maybe even the path itself: manipulate points & curves), tranforms and palette for each tile
// colours & palettes: each individual colour change (h, s, b, a), and overall palette: hue shift, invert, brightness, greyscale
// vectors & grid: manipulate individual vectors, switch out type of grid, change size of grid & whether it is 'drawn' or not -> should this be a property of Vi?