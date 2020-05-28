console.clear();

import VizTile from '../lib/shape/VizTile.js'
import Canvas from '../lib/Canvas.js';
import paths from '../lib/shape/vizPaths.js';

// don't select this, add it to vizcanvas
const vizScreen = new Canvas();

const shape = new VizTile(100, 100, paths.circle());

shape.fill = 'hsla(0, 50%, 50%, 1)';
shape.update(vizScreen.ctx);

console.log(shape);

// Ideally creating a viz will go something like this:

// index file with canvas instigated, this is the global context
// create module files for each viz - this is the master example
// create colour palette (made from colours), tile (made from paths) & grid (made from vectors). Each of these has it's own set of global params, controlled by audio & midi state
// create an array of 'Vi', with grid vector & colours & tiles

// draw viz by passing in array and params (loop over Vi array & draw)
// could each viz have so much manipulation it becomes a 'set' and you switch out the viz to change set? That way you bypass 'sets' and just have 16/32 viz to switch out
// Can each grid vector contain direction, weight & friction? What about neighbours

// what do you want to be able to change via params?
// viz
// paths & tiles: transforms & fills for each path (maybe even the path itself: manipulate points & curves), tranforms and palette for each tile
// colours & palettes: each individual colour change (h, s, b, a), and overall palette: hue shift, invert, brightness, greyscale
// vectors & grid: manipulate individual vectors, switch out type of grid, change size of grid & whether it is 'drawn' or not -> should this be a property of Vi?