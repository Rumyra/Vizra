import Vizra from '../../Vizra/Vizra.js';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ canvas setup
function returnCtx(canvasEl) {
	return canvasEl.getContext('2d');
}
// rectangle
const gridCtx = returnCtx(document.querySelector('.grid canvas'));
const gridCoords = new Vizra.coords('grid', [40, 40]);

gridCoords.forEach(function(el) {
	Vizra.draw.rectangle(gridCtx, el.x, el.y, 2, 2, 'hotpink');
})

// isometric
const isoCtx = returnCtx(document.querySelector('.iso canvas'));
const isoCoords = new Vizra.coords('iso', 'even', false);

isoCoords.forEach(function(el) {
	Vizra.draw.rectangle(isoCtx, el.x, el.y, 2, 2, 'hotpink');
})

// polar
const polarCtx = returnCtx(document.querySelector('.polar canvas'));
const polCoords = new Vizra.coords('polar', 'even');
console.log(polCoords);

polCoords.forEach(function(el) {
	Vizra.draw.rectangle(polarCtx, el.x, el.y, 2, 2, 'hotpink');
})

