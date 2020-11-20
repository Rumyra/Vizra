import utils from '../utils.js';
import tinycolor from '../colour/tinyCol.js';
import VizSymbol from './VizSymbol.js';
import paths from '../shape/vizPaths.js';

//  A VizTile takes an array of VizShapes
// shapes are simple and single. They have a path, a size and a relative position to the tile.
// Both are child classes of VizSymbol which isn't supposed to used directly, but accounts for the similarities of position, scale and rotation
// VizShapes are extended to be circles, rects etc... anything simple, an SVG path can be input into the parent shape class
// all simple paths should draw from centre - custom (svg) paths need to move for size

// TODO you might need an svg shape class, which accounts for offset


class VizShape extends VizSymbol {
/**
 * VizShape
 * @description Parent class for all shapes, can be used standalone but a path has to be passed. Good for if you have cutom svg paths.
 * @param {*} path of type Path2D or svg string (which gets converted)
 * @param {string} fill a colour string for the shape fill OR a canvas gradient. The colour string gets converted to a tinycolor
 * @param {string} stroke a colour string for the stroke colour. Gets converted to a tinycolor
 * @param {float} strokeWidth size of stroke e.g.2.5
 */
	constructor({ path = null, x = 0, y = 0, w = 100, h = 100, rotate = 0, isAlive = true, fill = '#000000', stroke = '#ffffff', strokeWidth = 1.0 } = {}) {

		super({
			x: x, y: y, w: w, h: h, rotate: rotate, inAlive: isAlive
		});

		// this is set to true if an svg path is used
		this.isSvg = false;
		this._path = this._getPath(path);

		this._fill = fill instanceof CanvasGradient ? fill : new tinycolor(fill);
		this._stroke = new tinycolor(stroke);
		this._strokeWidth = strokeWidth;
	}

	/**
	 * path
	 * @description get or set path
	 * @param {path2D, svgPath} set the shape path with a path2D object or an svg path
	 */
	// get and set path
	get path() { return this._path };
	set path(pathOrSvg) { this._path = this._getPath(pathOrSvg); }

	/**
	 * getPath
	 * @private
	 * @returns Path2D
	 * @param {*} pathOrSvg can be a path2D or an svg path as a string
	 */
	_getPath(vizPathOrSvg) {

		// if path is custom svg
		if (typeof vizPathOrSvg === 'string' || vizPathOrSvg instanceof String) {
			this.isSvg = true;
			// create path2d
			const svgPath = new Path2D(vizPathOrSvg);
			// size/position it TODO this will have to happen elsewhere
			return svgPath;
		} else {
			this.isSvg = false;
			// path is already made in vizPaths
			return vizPathOrSvg;
		}

	}

	get fill() { return this._fill; }
	/**
	 * @description shape fill
	 * @param {string, gradient} Can be a colour string (which becomes a tinycolor) or canvas gradient
	 */
	set fill(newFill = '#ff0000') {
		if (newFill instanceof CanvasGradient) {
			this._fill = newFill;
		} else {
			this._fill = new tinycolor(newFill);
		}
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
	// TODO you might have to translate and rotate back after draw, because you can't reset due to tile
	draw(ctx) {
		ctx.translate(this.position.x, this.position.y);
		ctx.rotate(this.rotate);

		ctx.fillStyle = this.fill instanceof CanvasGradient ? this.fill : this.fill.toHslString();
		ctx.lineWidth = this.strokeWidth;
		ctx.strokeStyle = this.stroke.toHslString();

		ctx.fill(this.path);
		ctx.stroke(this.path);
	}

}

class VizCircle extends VizShape {
	/**
	 * VizCircle
	 *
	 */
	constructor({ path = null, x = 0, y = 0, w = 100, h = 100, rotate = 0, isAlive = true, fill = '#000000', stroke = '#ffffff', strokeWidth = 1.0, arcFrom = 0, arcTo = 360, anticlockwise = false } = {}) {

		super({ path: path, x: x, y: y, w: w, h: h, rotate: rotate, isAlive: isAlive, fill: fill, stroke: stroke, strokeWidth: strokeWidth});

		this._af = utils.degToRad(arcFrom);
		this._at = utils.degToRad(arcTo);
		this.anticlockwise = anticlockwise;

		this._path = this._makePath();
	}

	_makePath() {
		const ellipsePath = new Path2D();

		ellipsePath.arc(this.x, this.y, this.w / 2, this._af, this._at, this.anticlockwise);

		return ellipsePath;
	}
}

class VizRect extends VizShape {
	constructor({ path = null, x = 0, y = 0, w = 100, h = 100, rotate = 0, isAlive = true, fill = '#000000', stroke = '#ffffff', strokeWidth = 1.0 } = {}) {

		super({ path: path, x: x, y: y, w: w, h: h, rotate: rotate, isAlive: isAlive, fill: fill, stroke: stroke, strokeWidth: strokeWidth });

		this._path = this._makePath();
	}

	_makePath() {
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
	constructor({ path = null, x = 0, y = 0, w = 100, h = 100, rotate = 0, isAlive = true, fill = '#000000', stroke = '#ffffff', strokeWidth = 1.0, thickness = 5 } = {}) {
		super({ path: path, x: x, y: y, w: w, h: h, rotate: rotate, isAlive: isAlive, fill: fill, stroke: stroke, strokeWidth: strokeWidth });

		this.thickness = thickness;
		this._path = this._makePath();
	}

	_makePath() {
		const halfThickness = this.thickness / 2;

		const xPath = new Path2D();
		xPath.moveTo(-halfThickness, -(this.h / 2));
		xPath.lineTo(-halfThickness, -halfThickness);
		xPath.lineTo(-(this.w / 2) - halfThickness, -halfThickness);
		xPath.lineTo(-(this.w / 2) - halfThickness, halfThickness);
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
	constructor({ path = null, x = 0, y = 0, w = 100, h = 100, rotate = 0, isAlive = true, fill = '#000000', stroke = '#ffffff', strokeWidth = 1.0, sides = 4, innerRadius = null } = {}) {

		super({ path: path, x: x, y: y, w: w, h: h, rotate: rotate, isAlive: isAlive, fill: fill, stroke: stroke, strokeWidth: strokeWidth });

		this.sides = sides;
		this.innerRadius = innerRadius;
		this._path = this._makePath();

	}

	_makePath() {
		const polarPath = new Path2D();

		// set side count, radius and theta based on whether there's an inner radius or not
		let sideCount = !innerRadius ? sides : (sides * 2);

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

class VizFlower extends VizShape {

	constructor({ path = null, x = 0, y = 0, w = 100, h = 100, rotate = 0, isAlive = true, fill = '#000000', stroke = '#ffffff', strokeWidth = 1.0, petals = 4, roundness = 0.666, thickness = 0.5, twist = 0 } = {}) {

		super({ path: path, x: x, y: y, w: w, h: h, rotate: rotate, isAlive: isAlive, fill: fill, stroke: stroke, strokeWidth: strokeWidth });

		this.petals = petals;
		this.roundness = roundness;
		this.thickness = thickness;
		this.twist = twist;
		this._path = this._makePath();
	}

	_makePath() {
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
	constructor({ path = null, x = 0, y = 0, w = 100, h = 100, rotate = 0, isAlive = true, fill = '#000000', stroke = '#ffffff', strokeWidth = 1.0, style = 0} = {}) {

		super({ path: path, x: x, y: y, w: w, h: h, rotate: rotate, isAlive: isAlive, fill: fill, stroke: stroke, strokeWidth: strokeWidth });

		this.style = style;
		this._path = this._makePath();

	}

	_makePath() {
		// outline
		const diaPath = new Path2D();
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

export { VizShape, VizCircle, VizRect, VizCross, VizPolar, VizFlower, VizDiamond };
