console.clear();

import Vi from '../Vizra/vi/Vi.js'
import Canvas from '../Vizra/Canvas.js';
import paths from '../Vizra/paths.js';

// don't select this, add it to vizcanvas
const vizScreen = new Canvas();

const shape = new Vi(100, 100, paths.circle());

shape.fill = 'hsla(0, 50%, 50%, 1)';
shape.update(vizScreen.ctx);

console.log(shape);