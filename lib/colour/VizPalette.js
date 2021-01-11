// Takes an array of colours and returns fills based on requested, with pattern fills and light and dark etc...
// Also includes effects functionality like lighten, hue etc...


import utils from '../utils.js';
import tinycolor from './tinyCol.js';

// Vizra palette module

// returns a fills property with colours & patterns (also properties - stroke can only be colour)
// accepts an array of hex codes OR one colour and size of palette (default 5).and type of palette if being generated
// analogus (size), monochromatic (size), splitcomplement (3), triad (3), tetrad (4)
// All optional if nothig specified a random palette is returned

// figures out the lightest and darkest for you - good for strokes and backgrounds

// size sets amount of colours, chops if less than input

// constructor(opts)
// opts = {arr: , colour: , amountOfCols: , bkgrnd: } -> these may or may not exist - and you can check in the constructor

let randomCol = tinycolor.random().toHexString();

class VizPalette {

	constructor({ colourOrArr = randomCol, size = 5, type = 'tetrad' } = {}) {
		this._startingCols = colourOrArr;
		this._size = size;
		this._type = type;

		this.colours = this.makeColours();
		this.patterns = this.makePatterns();
		this.original = this.makeColours();

		this.palette = this._getPalette();

	}

	// set() { }

	// if startingCols is array make new vizcolour and return in new palette
	// if it's a hex create a new palette based on colour
	// if nothing create random
	makeColours() {
		let tempColours = [];

		if (Array.isArray(this._startingCols)) {
			this._startingCols.forEach((el, i) => {
				if (i < this._size) {
					tempColours.push(tinycolor(el));
				}
			});
		} else {
			switch (this._type) {
				case 'tetrad':
					this._size = 4;
					tempColours = tinycolor(this._startingCols).tetrad();
					break;

				case 'analogous':
					tempColours = tinycolor(this._startingCols).analogous(this._size);
					break;

				case 'mono':
					tempColours = tinycolor(this._startingCols).monochromatic(this._size);
					break;

				case 'split':
					this._size = 3;
					tempColours = tinycolor(this._startingCols).splitcomplement();
					break;

				case 'triad':
					this._size = 3;
					tempColours = tinycolor(this._startingCols).triad();
					break;

				default:
					break;
			}
		}
		return tempColours;
	}

	makePatterns() {
		return [
			this.makeDots(),
			this.makeLines(),
			this.makeGradient(),
		];
	}

	_getPalette() {
		return this.colours.concat(this.patterns);
	}



	// TODO hsla palette based on modified palette NOT original
	get hslaPalette() {
		const newPalette = [];
		this.palette.forEach((el, i) => {
			newPalette.push(el.toHslString());
		});
		return newPalette;
	}

	get reset() {
		this.palette = this._palette();
	}

	/**
	 * @description size property
	 * @returns length of all values in palette - 1 for array loops
	 * @param {int} size Set to how many colours you want in the palette - get returns all inc patterns. Setting size also resets colours & patterns
	 */
	get size() { return this.palette.length - 1; }
	set size(size) {
		this._size = size;
		this.colours = this.makeColours();
		this.patterns = this.makePatterns();
		this.palette = this._getPalette();
		return this.palette.length - 1;
	}

	// Lightest, darkest, background, foreground selection ~~~~~~~~~~~
	// rudementary way to get lightest colour
	get lightest() {

		let lightest = this.colours[0];

		this.colours.forEach((el, i) => {
			if (el.getLuminance() > lightest.getLuminance()) {
				lightest = el;
			}
		});

		return lightest;
	}

	// rudementary way to get darkest colour
	get darkest() {

		let darkest = this.colours[0];

		this.colours.forEach((el, i) => {
			if (el.getLuminance() < darkest.getLuminance()) {
				darkest = el;
			}
		});

		return darkest;
	}

	get midCols() {
		let midCols = [];

		this.colours.forEach(el => {
			if (!(el === this.lightest) || !(el === this.darkest)) {
				midCols.push(el);
			}
		})
		return midCols;
	}

	get removeDark() {
		let midCols = [];

		this.colours.forEach(el => {
			if (!(el === this.darkest)) {
				midCols.push(el);
			}
		})
		return midCols;
	}

	// effects
	// TODO patterns are not included below
	// inverts all colours except background if omitBk is set to true
	invert(omitBk = false) {
		this.colours.forEach((el, i) => {

			if ( !omitBk && !(this.darkest === el) ) {
				el.complement();
			}

		});
	}

	get resetHues() {
		this.colours.forEach((el, i) => {
			el = this.original[i];
		});
	}

	// from -360 -> 360
	setHues(offset) {

		if (offset > 360) {
			offset = -360;
		};
		if (offset < -360) {
			offset = 360;
		}

		this.colours.forEach((el) => {
			el.spin(offset);
		})
	}

	resetCols() {
		this.colours.forEach((el) => {
			const origCol = el.getOriginalInput();
			el = tinycolor(origCol);
		})
	}

	// set sat -> from -100 -> 100
	setSat(offset) {
		this.colours.forEach((el) => {
			if (offset < 0) {
				el.desaturate(Maths.abs(offset))
			} else {
				el.saturate(offset);
			}
		})
	}

	get resetLighten() {
		this.colours.forEach((el) => {
			el.lighten(0);
		});
	}

	// set light 0 -> 100
	setLighten(offset) {
		this.palette.forEach((el) => {
			el.lighten(offset);
		})
	}

	get resetDarken() {
		this.colours.forEach((el) => {
			el.darken(0);
		});
	}

	// set dark 0 -> 100
	setDarken(offset) {
		this.palette.forEach((el) => {
			el.darken(offset);
		})
	}

	get resetBrighten() {
		this.colours.forEach((el) => {
			el.brighten(0);
		});
	}

	// set light 0 -> 100
	setBrighton(offset) {
		this.palette.forEach((el) => {
			el.brighten(offset);
		})
	}

	// opacity
	get resetAlpha() {
		this.palette.forEach((el) => {
			el.setAlpha(1);
		});
	}

	// set alpha 0-1
	setAlpha(offset) {
		this.palette.forEach((el) => {
			el.setAlpha(offset);
		})
	}

	// patterns
	/**
	 * @descrition dots pattern from lightest col to darkest col
	 * @param {tinycolor} dotCol
	 * @param {tinycolor} bkCol
	 * @param {int} size
	 * @returns CanvasPattern
	 */
	makeDots(dotCol=this.lightest, bkCol=this.darkest, size=12) {
		const offCan = new OffscreenCanvas(size, size);
		const offCtx = offCan.getContext('2d');
		offCtx.fillStyle = bkCol.toHslString();
		offCtx.fillRect(0, 0, size, size);
		offCtx.fillStyle = dotCol.toHslString();
		offCtx.arc(size / 2, size / 2, (size * 0.5) / 2, 0, utils.degToRad(360));
		offCtx.fill();
		// console.log( offCtx.createPattern(offCan, 'repeat'));
		return offCtx.createPattern(offCan, 'repeat');
	}

	// let's just start with vertical and see how we go
	makeLines(lineCol=this.midCols[utils.randomInt(0, this.midCols.length-1)], bkCol=this.darkest, size=10) {
		const offCan = new OffscreenCanvas(size, size);
		const offCtx = offCan.getContext('2d');
		offCtx.fillStyle = bkCol.toHslString();
		offCtx.fillRect(0, 0, size, size);
		offCtx.fillStyle = lineCol.toHslString();
		offCtx.fillRect(0, 0, size/2, size);
		return offCtx.createPattern(offCan, 'repeat');
	}

	// gradient
	makeGradient(colOne = this.lightest, colTwo = this.darkest, size = 50) {
		const offCan = new OffscreenCanvas(size, size);
		const offCtx = offCan.getContext('2d');
		const gradient = offCtx.createLinearGradient(0, 0, size, -size);
		gradient.addColorStop(0, colOne.toHslString());
		gradient.addColorStop(1, colTwo.toHslString());
		return gradient;
	}
}

export default VizPalette;
