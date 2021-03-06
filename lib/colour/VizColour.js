/**
 * VizColour class
 * @description create a new colour type, allows for object notation of hue, sat, lum and op. Plus colour functions.
 * @author Ruth John
 * @copyright 2019 Ruth John
 */

/**
 * @todo add return error to all classes
 * @todo get shifts to loop
 */

class VizColour {
	/**
	 *
	 * @param {*} colour can be hex, hsla or object
	 */
	constructor(colour) {
		this._original = colour;

		this.col = this._getOrigColVals(colour);

		this._hue = this.col.hue;
		this._sat = this.col.sat;
		this._lum = this.col.lum;
		this._op = this.col.op;
	}

	/**
	 *
	 * @param {*} origVal
	 * @private
	 * @description get object back from what is passed in
	 */
	_getOrigColVals(origVal) {
		let col = origVal;
		if (typeof col === 'string') {
			if (col.startsWith('#')) {
				return this._colFromHex(col);
			} else if (col.startsWith('h')) {
				return this._colFromHsla(col);
			} else {
				this._returnError('Colour string is not hex or hsla');
			}
		} else {
			return col;
		}
	}

	/**
	 * @description original colour
	 */
	get orig() {
		return `hsla(${this.col.hue}, ${this.col.sat}%, ${this.col.lum}%, ${this.col.op})`;
	}
	/**
	 * @description reset hue, sat, lum & op to colour on instantiation
	 */
	reset() {
		this._hue = this.col.hue;
		this._sat = this.col.sat;
		this._lum = this.col.lum;
		this._op = this.col.op;
	}

	/**
	 * @description returns formatted hsla string
	 */
	get hsla() {
    return `hsla(${this.hue}, ${this.sat}%, ${this.lum}%, ${this.op})`;
	}

	/**
	 * @description return an hsla string of an inverted version of colour without touching original colour
	 */
	invertHsla() {
		// only need to change hue and lum
		let invertHue = this.hue - 180;
		if (invertHue < 0) {
			invertHue += 360;
		}

		let invertLum = 100 - this.lum;

		return `hsla(${invertHue}, ${this.sat}%, ${invertLum}%, ${this.op})`;
	}

	/**
	 * @description inverts colour
	 */
	invert() {
		// only need to change hue and lum
		this.hue = this.hue - 180;
		this.hue = this.hue < 0 ? this.hue += 360 : this.hue;

		this.lum = 100 - this.lum;
	}

	get hue() { return this._hue; }
	/**
	 * @description set hue
	 */
	set hue(val) {
		// correct val
		if (val < 0) {
			val = 0;
		} else if (val > 360) {
			val = 360;
		}
		this._hue = val;
	}
	/**
	 *
	 * @param {int} val
	 * @description shifts hue
	 */
	hueShift(val) {
		this._hue = this._hue + val;

		if (this._hue < 0) {
			this._hue = 360 + this._hue;
		} else if (this._hue > 360) {
			this._hue = this._hue - 360;
		}
	}


	get sat() { return this._sat; }
	/**
	 * @description set saturation
	 */
	set sat(val) {
		if (val < 0) {
			val = 0;
		} else if (val > 100) {
			val = 100;
		}
		this._sat = val;
	}
	/**
	 *
	 * @param {int} val
	 * @description shifts saturation
	 */
	satShift(val) {
		this._sat = this._sat + val;

		if (this._sat < 0) {
			this._sat = 100 + this._sat;
		} else if (this._sat > 100) {
			this._sat = this._sat - 100;
		}
	}

	get lum() { return this._lum; }
	/**
	 * @description set luminosity
	 */
	set lum(val) {
		if (val < 0) {
			val = 0;
		} else if (val > 100) {
			val = 100;
		}
		this._lum = val;
	}
	/**
	 *
	 * @param {int} val
	 * @description shift luminosity value
	 */
	lumShift(val) {
		this._lum = this._lum + val;

		if (this._lum < 0) {
			this._lum = 100 + this._lum;
		} else if (this._lum > 100) {
			this._lum = this._lum - 100;
		}
	}

	get op() { return this._op; }
	/**
	 * @description sets opacity
	 */
	set op(val) {
		if (val < 0.0) {
			val = 0.0;
		} else if (val > 1.0) {
			val = 1.0;
		}
		this._op = val;
	}
	/**
	 *
	 * @param {float} val
	 * @description shift opacity value
	 */
	opShift(val) {
		this._op = this._op + val;

		if (this._op < 0) {
			this._op = 1 + this._op;
		} else if (this._op > 1) {
			this._op = this._op - 1;
		}
	}
	/**
	 *
	 * @param {*} hslaString
	 * @private
	 * @description returns a colour object from hsla string
	 */
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

	/**
	 *
	 * @param {*} hex
	 * @description returns object from hex string
	 * @private
	 */
	_colFromHex(hex) {
		let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		// console.log('hex',hex,'result',result);

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

export default VizColour;
