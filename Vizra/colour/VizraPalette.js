// Vizra colour module

/* use:

I want two use cases, one enter an array of colours, the other is to auto generate a palette, either based on a colour or not, with a 'light' or 'dark' flag to set background.

Pallettes are made from colour types

Always returns an array of hsla strings

palette.back // background colour based on light or dark flag
palette.fore // foreground colour - usually stroke - based on light or dark flag

Have a colour type
Set hue, sat, light, op values of each col

`Viz.colours.hue/sat/light/op(val) changes entire pallette

addColour
removeColour

Abstract when creating a Viz to use [0], [1] etc... so you can switch out palettes. This requires a minimum number of colours per palette. Also possibly keep background and line colour out of this library and just have it generate colours - keep that in the Viz.

*/

// start with a colour class

// then have a palette class which takes colour types

// Use cass one: work with an array of colour values
class VizraPalette {
	
	constructor(colArray, darkBkgrnd = true) {
		this._origPalette = colArray;
		this._darkBkgrnd = darkBkgrnd;
		
		// this.palette = this.palette;
		
	}
	
	// TODO hsla palette based on modified palette NOT original
	get hslaPalette() {
		const newPalette = [];
		this.palette.forEach((el, i) => {
			newPalette.push(el.hsla); 
		});
		return newPalette;
	}
	
	get palette() {
		const newPalette = [];
		this._origPalette.forEach((el, i) => {
			newPalette.push(el); 
		});
		return newPalette;
	}
	
	get reset() {
		this.palette.forEach((el, i) => {
			el.col = el.original;
		});
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
		
		return lightest.hsla;
	}
	
	// rudementary way to get darkest colour
	get darkest() {
		
		let darkest = this.palette[0];
		
		this.palette.forEach((el, i) => {
			if (el.lum < darkest.lum) {
				darkest = el;
			}
		});
		
		return darkest.hsla;
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
			el.hue = hueVal;
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
