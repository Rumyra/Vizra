import utils from '../utils.js';
import tinycolor from '../colour/tinyCol.js';
import VizSymbol from './VizSymbol.js';

// TODO swap the test for the fill - if it's a string make a col, otherwise just pass the fill

//  A VizTile takes an array of VizShapes
// shapes are simple and single. They have a path, a size and a relative position to the tile.
// Both are child classes of VizSymbol which isn't supposed to used directly, but accounts for the similarities of position, scale and rotation
// VizShape is extended to be simple shapes (circle, rect etc..) or an SVG. The parent class isn't supposed to be used directly, although you can extend it to create a new shape by declaring a Path2D via the makePath() method
// If you want to use an SVG use the exetnded VizSVG class
// All simple shapes start from (0, 0) and are drawn from center. Position for the tile is handled by the tile class and uses transforms

class VizShape extends VizSymbol {
/**
 * VizShape
 * @description Parent class for all shapes, can be used standalone. Set a path by using the makePath method - good for one off shapes where you want to draw to canvas.
 * @param {float} x if a number between 0-1 is used the shape is drawn as a percentage of it's tile, otherwise the value is in pixels
 * @param {float} y if a number between 0-1 is used the shape is drawn as a percentage of it's tile, otherwise the value is in pixels
 * @param {float} w if a number between 0-1 is used the shape is drawn as a percentage of it's tile, otherwise the value is in pixels
 * @param {float} h if a number between 0-1 is used the shape is drawn as a percentage of it's tile, otherwise the value is in pixels
 * @param {int} rotate rotation in degrees
 * @param {boolean} isAlive whether the shape is alive and thus drawn
 * @param {*} fill anything a tinycolor takes, plus tiny color, canvas gradient and canvas pattern
 * @param {string} stroke a colour string for the stroke colour. Gets converted to a tinycolor
 * @param {float} strokeWidth size of stroke e.g.2.5
 */
	constructor({ x = 0, y = 0, w = 100, h = 100, rotate = 0, isAlive = true, fill = '#000000', stroke = 'hsla(0, 0%, 0%, 0)', strokeWidth = 1.0 } = {}) {

		super({
			x: x, y: y, w: w, h: h, rotate: rotate, isAlive: isAlive
		});

		this._path = this.makePath();

		this._fill = this._returnFill(fill);
		this._stroke = new tinycolor(stroke);
		this._strokeWidth = strokeWidth;
	}

	/**
	 * path
	 * @description get or set path
	 * @param {path2D, svgPath} set the shape path with a path2D object
	 */
	// get and set path
	get path() {
		this._path = this.makePath();
		return this._path;
	};
	set path(path2D = null) {
		if (path2D) {
			this._path = path2D;
		} else {
			this._path = this.makePath();
		}
	}

	/**
	 * makePath
	 * @returns Path2D
	 * @description create the path2d object which is passed to path atrribute
	 * @default in the shape parent class, this is a rectangle
	 */
	makePath() {
		const rectPath = new Path2D();

		rectPath.moveTo(0, 0);
		rectPath.moveTo(this.w / 2, this.h / 2);
		rectPath.lineTo(-this.w / 2, this.h / 2);
		rectPath.lineTo(-this.w / 2, -this.h / 2);
		rectPath.lineTo(this.w / 2, -this.h / 2);
		rectPath.closePath();

		return rectPath;
	}

	/**
	 * @description sorts fill type
	 * @private
	 * @returns a fill of type tinycolor, canvasgradient or canvaspattern
	 */
	_returnFill(input) {
		// if (input instanceof (tinycolor || CanvasGradient || CanvasPattern)) {
		if (input instanceof CanvasPattern) {
			return input;
		} else if (input instanceof CanvasGradient) {
			return input;
		} else if (input instanceof tinycolor) {
			return input;
		} else {
			return tinycolor(input);
		}
	}

	get fill() { return this._fill; }
	/**
	 * @description shape fill
	 * @param {*} Can anything tinycolor, canvas gradient, canvas pattern
	 */
	set fill(newFill = '#ff0000') {
		this._fill = this._returnFill(newFill);
	}

	/**
	 * strokeWidth
	 * @description sets the width of the stroke on the shape
	 * @param {float} the width of the stroke as a float
	 */
	get strokeWidth() { return this._strokeWidth; }
	set strokeWidth(w) { this._strokeWidth = w; }

	/**
	 * stroke
	 * @description sets the stroke colour of the shape
	 * @param {string} a colour string which in turn becomes a tinycolor
	 */
	get stroke() { return this._stroke; }
	set stroke(colourString = '#ffffff') {
		this._stroke = new tinycolor(colourString);
	}

	/**
	 * draw
	 * @description draws the shape on the canvas
	 * @param {context} canvas constext 2d
	 */
	draw(ctx) {
		// only draw if shape isAlive
		if (this.isAlive) {
			ctx.rotate(this.rotate);

			let fill;
			if (this.fill instanceof CanvasPattern) {
				fill = this.fill;
			} else if (this.fill instanceof CanvasGradient) {
				fill = this.fill;
			} else {
				fill = this.fill.toHslString();
			}

			ctx.fillStyle = fill;
			ctx.lineWidth = this.strokeWidth;
			ctx.strokeStyle = this.stroke.toHslString();

			ctx.fill(this.path);
			ctx.stroke(this.path);

			ctx.rotate(-this.rotate);
		}
	}
}

class VizCircle extends VizShape {
	/**
	 * VizCircle
	 *
	 */
	constructor({ x = 0, y = 0, w = 100, h = 100, rotate = 0, isAlive = true, fill = '#000000', stroke = 'hsla(0, 0%, 0%, 0)', strokeWidth = 1.0, arcFrom = 0, arcTo = 360, anticlockwise = false } = {}) {

		super({ x: x, y: y, w: w, h: h, rotate: rotate, isAlive: isAlive, fill: fill, stroke: stroke, strokeWidth: strokeWidth});

		this._af = utils.degToRad(arcFrom);
		this._at = utils.degToRad(arcTo);
		this.anticlockwise = anticlockwise;

	}

	makePath() {
		const ellipsePath = new Path2D();

		ellipsePath.arc(0, 0, this.w / 2, this._af, this._at, this.anticlockwise);

		return ellipsePath;
	}
}

class VizRect extends VizShape {
	constructor({ x = 0, y = 0, w = 100, h = 100, rotate = 0, isAlive = true, fill = '#000000', stroke = '#ffffff', strokeWidth = 1.0 } = {}) {

		super({ x: x, y: y, w: w, h: h, rotate: rotate, isAlive: isAlive, fill: fill, stroke: stroke, strokeWidth: strokeWidth });

	}

	makePath() {
		const rectPath = new Path2D();

		rectPath.moveTo(this.w / 2, this.h / 2);
		rectPath.lineTo(-this.w / 2, this.h / 2);
		rectPath.lineTo(-this.w / 2, -this.h / 2);
		rectPath.lineTo(this.w / 2, -this.h / 2);
		rectPath.closePath();

		return rectPath;
	}
}

class VizCross extends VizShape {
	constructor({ x = 0, y = 0, w = 100, h = 100, rotate = 0, isAlive = true, fill = '#000000', stroke = '#ffffff', strokeWidth = 1.0, thickness = 5 } = {}) {
		super({ x: x, y: y, w: w, h: h, rotate: rotate, isAlive: isAlive, fill: fill, stroke: stroke, strokeWidth: strokeWidth });

		this.thickness = thickness;
	}

	makePath() {
		const halfThickness = this.thickness / 2;

		const xPath = new Path2D();
		xPath.moveTo(0, 0);
		xPath.moveTo(-halfThickness, -(this.h / 2));
		xPath.lineTo(-halfThickness, -halfThickness);
		xPath.lineTo(-(this.w / 2), -halfThickness);
		xPath.lineTo(-(this.w / 2), halfThickness);
		xPath.lineTo(-halfThickness, halfThickness);
		xPath.lineTo(-halfThickness, (this.h / 2));
		xPath.lineTo(halfThickness, (this.h / 2));
		xPath.lineTo(halfThickness, halfThickness);
		xPath.lineTo((this.w / 2), halfThickness);
		xPath.lineTo((this.w / 2), -halfThickness);
		xPath.lineTo(halfThickness, -halfThickness);
		xPath.lineTo(halfThickness, -(this.h / 2));
		xPath.closePath();

		return xPath;
	}
}

class VizPolar extends VizShape {
	constructor({ x = 0, y = 0, w = 100, h = 100, rotate = 0, isAlive = true, fill = '#000000', stroke = '#ffffff', strokeWidth = 1.0, sides = 4, innerRadius = null } = {}) {

		super({ x: x, y: y, w: w, h: h, rotate: rotate, isAlive: isAlive, fill: fill, stroke: stroke, strokeWidth: strokeWidth });

		this.sides = sides;
		this.innerRadius = innerRadius;

	}

	makePath() {
		const polarPath = new Path2D();
		polarPath.moveTo(0, 0);

		// set side count, radius and theta based on whether there's an inner radius or not
		let sideCount = !this.innerRadius ? this.sides : (this.sides * 2);

		for (let i = 0; i < sideCount; i++) {
			const theta = utils.degToRad(i * (360 / sideCount));
			let radius = this.w / 2;
			// if innerRadius is set then reduce radius every other point
			if (this.innerRadius && (i % 2 === 1)) {
				radius = this.innerRadius / 2;
			}

			if (i === 0) {
				polarPath.moveTo(
					(radius * Math.cos(0)),
					(radius * Math.sin(0))
				)
			} else {
				polarPath.lineTo(
					(radius * Math.cos(theta)),
					(radius * Math.sin(theta))
				);
				// if ((i === sideCount) && half) { break; }
			}
		}
		polarPath.closePath();
		return polarPath;
	}
}

class VizTri extends VizShape {
	constructor({ x = 0, y = 0, w = 100, h = 100, rotate = 0, isAlive = true, fill = '#000000', stroke = '#ffffff', strokeWidth = 1.0, ratio = 1 } = {}) {

		super({ x: x, y: y, w: w, h: h, rotate: rotate, isAlive: isAlive, fill: fill, stroke: stroke, strokeWidth: strokeWidth });

		this.ratio = ratio;

	}

	makePath() {
		const polarPath = new Path2D();
		polarPath.moveTo(0, 0);

		// set side count, radius and theta based on whether there's an inner radius or not
		let sideCount = 3;

		for (let i = 0; i < sideCount; i++) {
			const theta = utils.degToRad(i * (360 / sideCount));
			let radius = this.w / 2;

			if (i === 0) {
				radius = radius * this.ratio;
				polarPath.moveTo(
					(radius * Math.cos(0)),
					(radius * Math.sin(0))
				)
			} else {
				polarPath.lineTo(
					(radius * Math.cos(theta)),
					(radius * Math.sin(theta))
				);
				// if ((i === sideCount) && half) { break; }
			}
		}
		polarPath.closePath();
		return polarPath;
	}
}

/**
 * @description Like a polar shape but draws 'petals' instead of straight lines
 * @param {int} petals amount of petals to draw
 * @param {float} roundness how round the petals should be
 * @param {float} thicknees how wide the petals are
 * @param {float} twist whether the petals should skew and by how much
 */
class VizFlower extends VizShape {

	constructor({ x = 0, y = 0, w = 100, h = 100, rotate = 0, isAlive = true, fill = '#000000', stroke = '#ffffff', strokeWidth = 1.0, petals = 4, roundness = 0.666, thickness = 0.5, twist = 0 } = {}) {

		super({ x: x, y: y, w: w, h: h, rotate: rotate, isAlive: isAlive, fill: fill, stroke: stroke, strokeWidth: strokeWidth });

		this.petals = petals;
		this.roundness = roundness;
		this.thickness = thickness;
		this.twist = twist;
	}

	makePath() {
		const controlPoints = this.petals * 2;
		const radius = this.w / 2;

		const polarPath = new Path2D();
		polarPath.moveTo(0, 0);

		for (let i = 0; i < controlPoints; i++) {
			const theta = i * (Math.PI * 2 / controlPoints);

			// set up whether we're moving in or out
			const moveIn = i % 2 === 1;

			const controlPointTheta = (moveIn ? i + this.twist + this.thickness : i - 1 + this.twist - this.thickness) * (Math.PI * 2 / controlPoints);

			// set up our points
			const cpx = radius * this.roundness * Math.cos(controlPointTheta);
			const cpy = radius * this.roundness * Math.sin(controlPointTheta);
			const x = moveIn ? 0 : radius * Math.cos(theta);
			const y = moveIn ? 0 : radius * Math.sin(theta);
			polarPath.quadraticCurveTo(cpx, cpy, x, y);
		}
		polarPath.closePath();
		return polarPath;
	}
}

/**
 * @param {int} style 0 = plain, 1 = sliced, 2 = grid
 */
class VizDiamond extends VizShape {
	constructor({ x = 0, y = 0, w = 100, h = 100, rotate = 0, isAlive = true, fill = '#000000', stroke = '#ffffff', strokeWidth = 1.0, style = 0} = {}) {

		super({ x: x, y: y, w: w, h: h, rotate: rotate, isAlive: isAlive, fill: fill, stroke: stroke, strokeWidth: strokeWidth });

		this.style = style;

	}

	makePath() {
		// outline
		const diaPath = new Path2D();
		diaPath.moveTo(0, 0);
		// context.rect(x, y, size, size);
		diaPath.moveTo(this.w / 2, 0);
		diaPath.lineTo(0, this.h / 2);
		diaPath.lineTo(-this.w / 2, 0);
		diaPath.lineTo(0, -this.h / 2);
		diaPath.lineTo(this.w / 2, 0);

		if (this.style === 1 || this.style === 2) {
			// grid lines
			diaPath.moveTo(this.w / 4, this.h / 4);
			diaPath.lineTo(-(this.w / 4), -this.h / 4);
			diaPath.moveTo(this.w / 4, -this.h / 4);
			diaPath.lineTo(-this.w / 4, this.h / 4);

			if (this.style === 2) {
				// diagonal lines
				diaPath.moveTo(this.w / 2, 0);
				diaPath.lineTo(-this.w / 2, 0);
				diaPath.moveTo(0, -this.h / 2);
				diaPath.lineTo(0, this.h / 2);
			}
		}
		diaPath.closePath();

		return diaPath;
	}

}

class VizDrop extends VizShape {
	constructor({ x = 0, y = 0, w = 100, h = 100, rotate = 0, isAlive = true, fill = '#000000', stroke = '#ffffff', strokeWidth = 1.0 } = {}) {

		super({ x: x, y: y, w: w, h: h, rotate: rotate, isAlive: isAlive, fill: fill, stroke: stroke, strokeWidth: strokeWidth });

	}

	makePath() {
		const dropPath = new Path2D();

		dropPath.arc(0, 0, this.w / 2, 0, 4.72);
		dropPath.lineTo(this.w / 2, -this.h / 2);
		dropPath.closePath();

		return dropPath;
	}

}

/**
 * VizSVG
 * @description this is slightly different in that SVG's are difficult to size. Try to export the SVG at a resonable size for the vis and an estimate of the width and height in pixels should be input on instantiation. This provides the offset so the path can be drawn from the centre. Use scale to change the size.
 */
class VizSVG extends VizShape {
	constructor({ x = 0, y = 0, w = 100, h = 100, rotate = 0, isAlive = true, fill = '#000000', stroke = '#ffffff', strokeWidth = 1.0, path = null, scale = 1 } = {}) {

		super({ x: x, y: y, w: w, h: h, rotate: rotate, isAlive: isAlive, fill: fill, stroke: stroke, strokeWidth: strokeWidth });

		this._svgPath = path;
		this._path = this.makePath();
		this._scale = this._setMesurement(scale);

	}

	/**
	 * path
	 * @description get or set path
	 * @param {svgPath} set the shape path with an svg path
	 */
	// get and set path
	get path() { return this._path };
	set path(svgPath) {
		this._svgPath = svgPath;
		this._path = this.makePath();
	}

	makePath() {
		return new Path2D(this._svgPath);
	}

	get scale() { return this._scale; }
	set scale(scale) {
		this._scale = this._setMesurement(scale);
	}

	/**
	 * draw needs to take into account offset
	 */
	draw(ctx) {
		// only draw if shape isAlive
		if (this.isAlive) {
			// move to seem like shape is drawn from centre
			ctx.translate(-(this.w / 2), -(this.h / 2));
			ctx.rotate(this.rotate);

			ctx.fillStyle = this.fill instanceof CanvasGradient ? this.fill : this.fill.toHslString();
			ctx.lineWidth = this.strokeWidth;
			ctx.strokeStyle = this.stroke.toHslString();

			ctx.fill(this.path);
			ctx.stroke(this.path);

			// reset our transforms
			ctx.rotate(-this.rotate);
			ctx.translate(this.w / 2, this.h / 2);
		}
	}
}

export { VizShape, VizCircle, VizRect, VizCross, VizPolar, VizFlower, VizDiamond, VizSVG, VizDrop, VizTri };
