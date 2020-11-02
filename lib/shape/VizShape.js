import utils from '../utils.js';
import VizVector from '../physics/VizVector.js'
import tinycolor from '../colour/tinyCol.js';

//  A VizTile takes an array of VizShapes
// shapes are simple and single. They have a path, a size and a relative position to the tile.
// if a path is specified that is drawn, otherwise the parameter taken is a custom svg path
// all simple paths should draw from centre - custom (svg) paths need to move for size

// put the path function in here, if it's a string then it's custom, if it's a function then run it & that's the path

class VizShape {
/**
 *
 * @param {*} path of type Path2D or svg string (which gets converted)
 * @param {*} position
 * @param {*} size
 */

	constructor(path, { position = [0, 0], size = [100, 100], rotate = 0, fill = '#000000', stroke = '#ffffff', strokeWidth = 1.0 } = {}) {

		// this is set to true if an svg path is used
		this.isSvg = false;

		this._path = this.getPath(path);
		this._position = new VizVector(position[0], position[1]);
		this._width = size[0];
		this._height = size[1];
		this._rotate = rotate;

		this._fill = fill instanceof CanvasGradient ? fill : new tinycolor(fill);
		this._strokeWidth = strokeWidth;
		this._stroke = new tinycolor(stroke);
	}

	// get and set path
	get path() { return this._path };
	set path(pathOrSvg) { this._path = this.getPath(pathOrSvg); }

	// this sorts out whether we're using a paths function or svg path for the shape
	getPath(vizPathOrSvg) {

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

	get position() { return this._position; }
	// TODO allow arr or vizvector
	set position(pos) { this._position = new VizVector(pos[0], pos[1]); }

	get width() { return this_width; }
	set width(w) { this._width = w; }

	get height() { return this_height; }
	set height(h) { this._height = h; }

	get rotate() { return this._rotate; }
	/**
	 * @description set rotate in degrees
	 */
	set rotate(deg = 0) {
		let rads = utils.degToRad(deg);
		this._rotate = rads;
	}

	get fill() { return this._fill; }
	/**
	 * @description set fill as you would VizColour
	 */
	set fill(newFill = '#ff0000') {
		if (newFill instanceof CanvasGradient) {
			this._fill = newFill;
		} else {
			this._fill = new tinycolor(newFill);
		}
	}

	get strokeWidth() { return this._strokeWidth; }
	set strokeWidth(w) { this._strokeWidth = w; }

	get stroke() { return this._stroke; }
	/**
	 * @description set stroke as you would VizColour
	 */
	set stroke(colourString = '#ffffff') {
		this._stroke = new tinycolor(colourString);
	}

}

export default VizShape;