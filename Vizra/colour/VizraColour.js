// const col = new VizraCol('#000000')

// get col.hue/sat/lum/op
// set col.hue = int
// string col.hsla
// original col.original
class VizraColour {
	constructor(col) {
		this._hex = col;
		
		this.col = this._makeHsla(this._hex);
		
		// return this.col;
	}
	
	get original() {
		return this._makeHsla(this._hex);
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
	// return hsla of colour
	// takes a hex value and returns it's hsla
	_makeHsla(hex) {
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
