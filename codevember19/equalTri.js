console.clear();

import utils from '../Vizra/utils.js';
import Vi from '../Vizra/vi/Vi.js';
import Canvas from '../Vizra/Canvas.js';
import paths from '../Vizra/paths.js';

paths.squashedDiamond = function(sideLength = 60, half = false) {
	const triSide = Math.floor(Math.cos(utils.degToRad(30)) * sideLength);
	const halfL = Math.floor(sideLength / 2);

	const sdPath = new Path2D();

	sdPath.moveTo(0, 0);
	sdPath.moveTo(0, -halfL);
	sdPath.lineTo(triSide, 0);
	sdPath.lineTo(0, halfL);
	if (!half) {
		sdPath.lineTo(-triSide, 0);
	}
	sdPath.closePath();

	return sdPath;
}

import VizraCoords from '../Vizra/viz/VizraCoords.js';
const gridOptions = {
	type: 'polar',
	dis: 'regular',
	padding: 3,
	cluster: 'center',
	clusterAmount: 0.5
}

for (let i = 0; i < 100; i++) {
	console.log(utils.smoothstep(100, 0, i));
}


const vizScreen = new Canvas();

const grid = new VizraCoords(vizScreen, gridOptions);
console.log(grid);

grid.coords.forEach( (el, i) => {
	const shape = new Vi(el.x, el.y, paths.squashedDiamond(60*vizScreen.dpr));

	// console.log(shape);

	shape.fill = 'hsla(254, 50%, 50%, 1)';
	shape.fill.hueShift(utils.pingPong(i*10, 360));
	shape.update(vizScreen.ctx);

});
