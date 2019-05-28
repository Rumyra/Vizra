import Vizra from '../../Vizra/Vizra.js';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ canvas setup
function returnCtx(canvasEl) {
	return canvasEl.getContext('2d');
}
// rectangle
const rectangleCtx = returnCtx(document.querySelector('.rectangle canvas'));

let rectangle = new Vizra.shape({x: 10, y: 10}, Vizra.paths.rectangle(), 'white', 'pink');
rectangle.draw(rectangleCtx); 

// circle
// context, x, y, width, height, fillStyle, strokeStyle = 'white', strokeWidth = 1.0, startAngle, endAngle
// const circleCtx = returnCtx(document.querySelector('.circle canvas'));
// Vizra.draw.circle(circleCtx, options);

// diamond
// const diamondCtx = returnCtx(document.querySelector('.diamond canvas'));
// context, x, y, width, height, fillStyle, strokeStyle, strokeWidth, style
// Vizra.draw.diamond(diamondCtx, 50, 10, 100, 200, 'hotpink', 'white', 2.0, 'sliced');
// Vizra.draw.diamond(diamondCtx, 200, 10, 100, 100, 'hotpink', 'yellow', 4.0, 'grid');

// rectangle with disgonal lines
// const diaLineRectCtx = returnCtx(document.querySelector('.dialinerect canvas'));
// Vizra.draw.diaLineRect(diaLineRectCtx, 10, 10, 150, 50, 'hotpink', 0.5, 10);
// Vizra.draw.diaLineRect(diaLineRectCtx, 10, 70, 200, 70, 'hotpink', 0.3, 5);

// lantern
// const lanternCtx = returnCtx(document.querySelector('.lantern canvas'));
// Vizra.draw.lantern(lanternCtx, 10, 10, 150, 50, 'hotpink', 'yellow', 3.0);
// Vizra.draw.lantern(lanternCtx, 10, 70, 200, 70, 'hotpink', 'yellow', 3.0, false);

// swoosh
// const swooshCtx = returnCtx(document.querySelector('.swoosh canvas'));
// Vizra.draw.swoosh(swooshCtx, 10, 50, 200, 100, 'hotpink', 'yellow', 0.5, 10);
// Vizra.draw.swoosh(swooshCtx, 10, 70, 200, 70, 'hotpink', 0.3, 5);

// swoosh
// context, x, y, width, height, fillStyle, strokeStyle = 'white', strokeWidth = 1.0, lineWidth = 5
// const crossCtx = returnCtx(document.querySelector('.cross canvas'));
// Vizra.draw.cross(crossCtx, options);
// Vizra.draw.swoosh(swooshCtx, 10, 70, 200, 70, 'hotpink', 0.3, 5);
