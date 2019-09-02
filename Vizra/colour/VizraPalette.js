import VizraColour from './VizraColour.js';

// Vizra palette module

/* use:

const palette = new VizraPalette(['#000, #000 ...'])
const palette = new VizraPalette('blue', 10)
const palette = new VizraPalette('#111', 5)

palette.back // background colour based on light or dark flag
palette.fore // foreground colour - usually stroke - based on light or dark flag

Have a colour type
Set hue, sat, light, op values of each col

`Viz.colours.hue/sat/light/op(val) changes entire pallette

addColour
removeColour

palette[3] = 'hsla...' -> resets that one colour

TODO figure out how to put amount of colours in palette

*/

// constructor(opts)
// opts = {arr: , colour: , amountOfCols: , bkgrnd: } -> these may or may not exist - and you can check in the constructor


class VizraPalette {
	
	constructor(colourOrArr, darkBkgrnd = true) {
		this._startingCols = colourOrArr;
		this._darkBkgrnd = darkBkgrnd;
		
		this.palette = this._palette();
		
	}

	// if startingCols is array make new vizcolour and return in new palette
	// if it's a hex create a new palette based on colour
	// if it's a string make a palette from that string

	// get palette() {
	// 	const newPalette = [];
	// 	this._startingCols.forEach((el, i) => {
	// 		const col = new VizraColour(el);
	// 		newPalette.push(col); 
	// 	});
	// 	return newPalette;
	// }

	_palette() {
		const newPalette = [];

		if (Array.isArray(this._startingCols)) {
			this._startingCols.forEach((el, i) => {
				const col = new VizraColour(el);
				newPalette.push(col);
			});
		} else if (this._startingCols.slice(0,1) === '#') {
			return;
		} else {
			this._makePaletteFromCol(this._startingCols);
		}

			
		return newPalette;
	}

	_makePaletteFromCol(col) {

		const newPalette = [];

		// if colour is rainbow, hue rotates

		// else hue is set
		// default is red
		let hue = 0;

		switch (col) {
		  case 'red':
		  	hue = 0;
		    break;
		  case 'orange':
		  	hue = 40;
		    break;
		  case 'yellow':
		  	hue = 80;
		    break;
		  case 'lime':
		  	hue = 100;
		    break;
		  case 'green':
		  	hue = 150;
		    break;
		  case 'turquoise':
		  	hue = 200;
		    break;
		  case 'cyan':
		  	hue = 220;
		    break;
		  case 'blue':
		  	hue = 250;
		    break;
		  case 'indigo':
		  	hue = 300;
		    break;
		  case 'violet':
		  	hue = 320;
		    break;
		  case 'pink':
		  	hue = 350;
		    break;
		}

		return newPalette;

	}
	
	// TODO hsla palette based on modified palette NOT original
	get hslaPalette() {
		const newPalette = [];
		this.palette.forEach((el, i) => {
			newPalette.push(el.hsla); 
		});
		return newPalette;
	}
	
	get reset() {
		this.palette = this._palette();
	}
	
	get length() {
		return this.palette.length;
	}
	
	// Lightest, darkest, background, foreground selection ~~~~~~~~~~~
	// rudementary way to get lightest colour
	get lightest() {
		
		let lightest = this.palette[0];
		
		this.palette.forEach((el, i) => {
			if (el.lum > lightest.lum) {
				lightest = el;
			}
		});
		
		return lightest;
	}
	
	// rudementary way to get darkest colour
	get darkest() {
		
		let darkest = this.palette[0];
		
		this.palette.forEach((el, i) => {
			if (el.lum < darkest.lum) {
				darkest = el;
			}
		});
		
		return darkest;
	}
	
	get back() {
		if (this._darkBkgrnd) {
			return this.darkest;
		} else {
			return this.lightest;
		}
	}
	
	get fore() {
		if (this._darkBkgrnd) {
			return this.lightest;
		} else {
			return this.darkest;
		}
	}
	
	// effects
	
	// inverts all colours except background if omitBk is set to true
	invert(omitBk = false) {
		this.palette.forEach((el, i) => {
			
			if ( !omitBk && !(this.back === el) ) {
				el.invert;
			}
			
		});
	}
	
	get resetHues() {
		this.palette.forEach((el, i) => {
			el.hue = el.original.hue;
		});
	}
	
	// this is based on the original hue of the colour - if it is set, this ignores it - at the moment I can't think of a better way of doing it - plus it should work with midi better
	setHues(offset) {
		this.palette.forEach((el, i) => {
			// cycle happens in colour class
			let hueVal = el.original.hue + offset;
			// if new val is greater than 360 or less than 0, cycle
			if (hueVal > 360) {
				hueVal = hueVal - 360;
			} else if (hueVal < 0) {
				hueVal = 360 + hueVal;
			}
			// el.hue = hueVal;
			this.palette[i].hue = hueVal;
			// return el.hue;
		})
	}
	
	// this is what I really want to do but it will be based on controllers
	// set hue
	// rotateHue(val) {
	// 	this.palette.forEach((el, i) => {
	// 		// cycle happens in colour class
	// 		let origHue = el.hue;
	// 		// if new val is greater than 360 or less than 0, cycle
	// 		if (origHue + val > 360) {
	// 			val = (origHue + val)
	// 		}
	// 		el.hue += val;
	// 	})
	// }
	
	get resetSats() {
		this.palette.forEach((el, i) => {
			el.sat = el.original.sat;
		});
	}
	
	// set sat -> this is the same as hue, based on original val
	setSats(offset) {
		this.palette.forEach((el, i) => {
			// cycle happens in colour class
			let satVal = el.original.sat + offset;
			// if new val is greater than 100 or less than 0, stay
			if (satVal > 100) {
				satVal = 100;
			} else if (satVal < 0) {
				satVal = 0;
			}
			el.sat = satVal;
		})
	}
	
	get resetLums() {
		this.palette.forEach((el, i) => {
			el.lum = el.original.lum;
		});
	}
	
	// set sat -> this is the same as hue, based on original val
	setLums(offset) {
		this.palette.forEach((el, i) => {
			// cycle happens in colour class
			let lumVal = el.original.lum + offset;
			// if new val is greater than 100 or less than 0, stay
			if (lumVal > 100) {
				lumVal = 100;
			} else if (lumVal < 0) {
				lumVal = 0;
			}
			el.lum = lumVal;
		})
	}
	
	get resetOps() {
		this.palette.forEach((el, i) => {
			el.op = el.original.op;
		});
	}
	
	// set sat -> this is the same as hue, based on original val
	setOps(offset) {
		this.palette.forEach((el, i) => {
			// cycle happens in colour class
			let opVal = el.original.op + offset;
			// if new val is greater than 100 or less than 0, stay
			if (opVal > 1.0) {
				opVal = 1.0;
			} else if (opVal < 0.0) {
				opVal = 0.0;
			}
			el.op = opVal;
		})
	}
	
	
}

export default VizraPalette;
