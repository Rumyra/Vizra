import utils from '../utils.js';
import VizVector from '../physics/VizVector.js'

class VizSymbol {
	/**
	 * @description Parent class for VizShape and VizTile. Both have position, dimensions and rotation. Takes an options object with the following
	 * @param {int} x x position of shape in percentage relative to tile
	 * @param {int} y y position of shape in percentage relative to tile
	 * @param {int} w width of shape in in percentage relative to tile
	 * @param {int} h height of shape in in percentage relative to tile
	 * @param {int} rotate in degrees
	 * @param {boolean} isAlive whether the shape of tile is alive, and thus is drawn
	 */

	constructor({ x = 0, y = 0, w = 100, h = 100, rotate = 0, isAlive = true } = {}) {

		this._x = x;
		this._y = y;
		this._position = new VizVector(x, y);

		this._w = w;
		this._h = h;
		this._size = new VizVector(w, h);

		this._rotate = utils.degToRad(rotate);

		this.isAlive = isAlive;
	}

	// set position ----------------
	/**
	 * x
	 * @description get and set x, also updates position vector
	 * @param {int} position of shape in percent relative to tile
	 */
	get x() { return this._x; }
	set x(int) {
		this._position.x = int;
		this._x = int;
	}

	/**
	 * y
	 * @description get and set y, also updates position vector
	 * @param {int} position of shape in percent relative to tile
	 */
	get y() { return this._y; }
	set y(int) {
		this._position.y = int;
		this._y = int;
	}

	/**
	 * position
	 * @description get and set position and also update x and y
	 * @param {int, arr, VizVector} can be one integer, an array of two integers or a VizVector. Also updates x and y.
	 */
	get position() { return this._position; }
	set position(pos) {
		this._position = this._setPositionOrSize(pos);
		this._x = this._position.x;
		this._y = this._position.y;
	}

	// set size ----------------
	/**
	 * w
	 * @description get and set width, also updates size vector
	 * @param {int} width of shape in percent relative to tile
	 */
	get w() { return this._w; }
	set w(int) {
		this.size.w = int;
		this._w = int;
	}

	/**
	 * h
	 * @description get and set height, also updates size vector
	 * @param {int} height of shape in percent relative to tile
	 */
	get h() { return this._h; }
	set h(int) {
		this.size.h = int;
		this._h = int;
	}

	/**
	 * size
	 * @description get and set size and also update width and height
	 * @param {int, arr, VizVector} can be one integer, an array of two integers or a VizVector. Also updates width and height.
	 */
	get size() { return this._size; }
	set size(size) {
		this._size = this._setPositionOrSize(size);
		this._w = this._size.x;
		this._h = this._size.y;
	}
	/**
	 * setPositionOrSize
	 * @private
	 * @description private function to set a vector if position or size have been set directly
	 * @param {int, arr, VizVector} can be one integer, an array of two integers or a VizVector
	 */
	_setPositionOrSize(val) {
		// if array
		if (Array.isArray(val)) {
			return new VizVector(val[0], val[1]);
		} else if (val instanceof VizVector) {
			// if vizvector
			return val;
		} else {
			// if one val
			return new VizVector(val, val);
		}
	}

	get rotate() { return this._rotate; }
	/**
	 * @description set rotate in degrees
	 * @param {int} degrees as an integer
	 * @returns returns rotate in rads
	 */
	set rotate(deg = 0) {
		this._rotate = utils.degToRad(deg);
	}

}

export default VizSymbol;
