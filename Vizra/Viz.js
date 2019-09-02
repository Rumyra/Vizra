import vizraUtils from './vizraUtils.js';
import VizraCanvas from './VizraCanvas.js';
import VizraShape from './shape/VizraShape.js';
import VizraCoords from './physics/VizraCoords.js';

const canvasEl = document.querySelector('canvas');
const vizScreen = new VizraCanvas(canvasEl);

class Viz {
	constructor(palette, path, params = true, screen = vizScreen) {
		this.grid = new VizraCoords('square', 'loose');
		this.palette = palette;
		this.path = path;

		this.screen = screen;

		this.frame = 0;
		this.debounceCount = 0;
		this.debounce = 25;

		this.shape = new VizraShape({x: 10, y: 10}, this.path, this.palette);
	}

	get coords() {
		return this.grid.coords;
	}

	get incFrame() {
		return this.frame++;
	}

	get incDeCount() {
		return this.debounceCount++;
	}

	drawViz(state) {
		if (this.debounceCount === this.debounce) {

			this.screen.clear(this.palette.back.hsla);

			this.loop(state);

			this.debounceCount = 0;
		} else {
			this.debounceCount++;
		}

		this.frame++;
	}

	loop(state) {
		this.coords.forEach((el, i) => {

			const colour = this.palette.hslaPalette[vizraUtils.randomNumber(0, this.palette.length)];

			this.shape.position = el;

			this.shape.fill = colour;
			this.shape.draw(this.screen.ctx);

		}) // forEach
	}

}


export default Viz;