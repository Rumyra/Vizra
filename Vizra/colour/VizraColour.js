// Vizra Colour module -> to be used in Vizra Palette module

// const col = new VizraColour('#000000')
// const col = new VizraColour('hsla(40, 10%, 50%, 1)')
// const col = new VizraColour({hue: sat: lum: op:})
// The latter is also what is returned, along with a few methods for lightening, darkening, inverting, transparency & hue rotation


// get col.hue/sat/lum/op
// set col.hue = int
// string col.hsla
// original col.original
class VizraColour {
	constructor(col) {
		this._orig = col;

		// this.col = this._makeHsla(this._orig);

		// return this.col;
	}

	// if passed in is hex use make hsla function, otherwise is it an hsla string, or is it an hsla object already
	get col() {
		const char = this._orig.slice(0, 1);
		// if hex
		if (char === '#') {
			return this._colFromHex(this._orig);
		} else if (char === 'h') {
			return this._colFromHsla();
		} else {
			return this._orig;
		}
	}

	get original() {
		const char = this._orig.slice(0, 1);
		// if hex
		if (char === '#') {
			return this._colFromHex(this._orig);
		} else if (char === 'h') {
			return this._colFromHsla();
		} else {
			return this._orig;
		}
	}

	get hue() {
		return this.col.hue;
	}

	get sat() {
		return this.col.sat;
	}

	get lum() {
		return this.col.lum;
	}

	get op() {
		return this.col.op;
	}

	// The descision is: Is this a colour that's returned with the class, or a method that you can call on a colour that changes the colour forever
	get invert() {
		// only need to change hue and lum
		let invertHue = this.col.hue - 180;
		if (invertHue < 0) {
			invertHue += 360;
		}

		let invertLum = 100 - this.col.lum;

		this.col.hue = invertHue;
		this.col.lum = invertLum;

		return this.col;
	}

	// set hue
	set hue(val) {
		// correct val
		if (val < 0) {
			val = 0;
		} else if (val > 360) {
			val = 360;
		}
		this.col.hue = val;

		return this.col.hue;
	}

	// set sat
	set sat(val) {
		if (val < 0) {
			val = 0;
		} else if (val > 100) {
			val = 100;
		}
		this.col.sat = val;
	}

	// set light
	set lum(val) {
		if (val < 0) {
			val = 0;
		} else if (val > 100) {
			val = 100;
		}
		this.col.lum = val;
	}

	// set op
	set op(val) {
		if (val < 0.0) {
			val = 0.0;
		} else if (val > 1.0) {
			val = 1.0;
		}
		this.col.op = val;
	}

	// returns formatted hsla string for use
	get hsla() {
		// return 'hello';
    return `hsla(${this.hue}, ${this.sat}%, ${this.lum}%, ${this.op})`;
	}

	_colFromHsla(hslaString) {
		let sep = hslaString.indexOf(",") > -1 ? "," : " ";
	  hslaString = hslaString.substr(5).split(")")[0].split(sep);

	  if (hslaString.indexOf("/") > -1)
	    hslaString.splice(3,1);
		
		let col = {
			hue: Number(hslaString[0]),
			sat: Number(hslaString[1].substr(0,hslaString[1].length - 1)),
			lum: Number(hslaString[2].substr(0,hslaString[2].length - 1)),
			op: Number(hslaString[3])
		}

		return col;
		
	}
	
	// return hsla of colour
	// takes a hex value and returns it's hsla
	_colFromHex(hex) {
		let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

		if (result === null) {
			this._returnError('hex value not recognised');
		}

    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    s = s*100;
    s = Math.round(s);
    l = l*100;
    l = Math.round(l);
		h = Math.round(360*h);

		let col = {
			hue: h,
			sat: s,
			lum: l,
			op: 1
		}

		return col;
	}


}

export default VizraColour;
