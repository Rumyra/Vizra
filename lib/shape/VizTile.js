import utils from '../utils.js';
import VizVector from '../physics/VizVector.js';

// the tile is purely the group of shapes -> shapes needs a type/class...
// possibly a boid has all the physics and the tile (facade)
//

/**
 * Vi
 * The shape on the canvas: includes facade & physics
 * @author Ruth John
 * @copyright 2019 Ruth John
 * @requires utils
 * @requires VizVector
 * @requires VizColour
 * @todo include params affected by audio/midi
 * @todo figure out collision functions
 */

class VizTile {

	constructor(shapes, { position = [0, 0], size = [100, 100], scale = [1, 1], rotate = 0, offset = [0, 0] } = {}) {

		this.shapes = shapes;

		// everything is a vector apart from rotate - but you add it as an array
		this._pos = new VizVector(position[0], position[1]);
		this._size = new VizVector(size[0], size[1]);
		this._scale = new VizVector(scale[0], scale[1]);
		this._rotate = utils.degToRad(rotate);
		this._offset = new VizVector(offset[0], offset[1]);

	}

	// get and set all the params
	get position() { return this._pos; }
	set position(arr) {
		this._pos = new VizVector(arr[0], arr[1]);
	}

	get size() { return this._size; }
	set size(arr) {
		this._size = new VizVector(arr[0], arr[1]);
	}

	get scale() { return this._scale; }
	set scale(arr) {
		this._scale = new VizVector(arr[0], arr[1]);
	}

	get rotate() { return this._rotate; }
	/**
	 * @description set rotate in degrees
	 */
	set rotate(deg = 0) {
		let rads = utils.degToRad(deg);
		this._rotate = rads;
	}

	get offset() { return this._offset; }
	set offset(arr) {
		this._offset = new VizVector[arr[0], arr[1]];
	}

	/**
	 *
	 * @param {*} context
	 * @private
	 * @description drawing function for vi, sets fill, stroke, translate, rotate, scale
	 */
	_draw(context) {
		context.save();

		// transforms for tile
		context.translate(this.position.x - (this.offset.x * this.scale.x), this.position.y - (this.offset.y * this.scale.y));
		// context.translate(this.position.x - (this.offset.x * this.scale.x), this.position.y - (this.offset.y * this.scale.y));
		context.rotate(this.rotate);
		context.scale(this.scale.x, this.scale.y);

		// draw shapes
		this.shapes.forEach( (el, i) => {

			context.fillStyle = el.fill instanceof CanvasGradient ? el.fill : el.fill.toHslString();
			console.log(el.fill);
			context.lineWidth = el.strokeWidth;
			context.strokeStyle = el.stroke.hsla;

			context.fill(el.path);
			context.stroke(el.path);

		})

		context.resetTransform();
		context.restore();
	}

	// CAN PROLLY MOVE THIS TO CANVAS AS WELL
	/**
	 *
	 * @param {*} ctx
	 * @description draw & apply forces
	 */
	update(ctx) {
		this._draw(ctx);
		//! this._applyForces();
	}

	/**
	 * bounce off edges
	 * @todo use canvas sizes and move to canvas class
	 */
	edgeBounce() {
		if (this.vector.x - this.size.x < 0 || this.vector.x + this.size.x > window.innerWidth) {
			this.velocity.x = -this.velocity.x;
		}
		if (this.vector.y - this.size.y < 0 || this.vector.y + this.size.y > window.innerHeight) {
			this.velocity.y = -this.velocity.y;
		}
	}


}

export default VizTile;