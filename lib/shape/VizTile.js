import utils from '../utils.js';
import VizVector from '../physics/VizVector.js';
import VizColour from '../colour/VizColour.js';
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
	/**
	 *
	 * @param {*} path Path2D
	 * @todo mass, velocity, acceleration and topspeed can be getters and setters
	 */
	constructor(paths) {
		// position
		//! MOVED this.vector = new VizVector(x, y);

		this.size = new VizVector(100, 100)
		this.scaleX = 1;
		this.scaleY = 1;
		this._rotate = 0;
		this.offsetX = 0;
		this.offsetY = 0;
		// forces
		//! MOVED
		//! this.mass = 10;
		//! this.velocity = new VizVector(0,0);
		//! this.acceleration = new VizVector(0,0);
		//! this.topspeed = new VizVector(1, 1);

		// facade
		this.path = path;
		this._fill = new VizColour('#ff0000');
		this._fillByColour = true;
		this.strokeWidth = 1.0;
		this._stroke = new VizColour('#ffffff');
	}

	get fill() { return this._fill; }
	/**
	 * @description set fill as you would VizColour
	 */
	set fill(colourString = '#ff0000') {
		if (typeof colourString === 'string') {
			this._fill = new ViColour(colourString);
		} else {
			this._fill = colourString;
			this._fillByColour = false;
		}
	}

	get stroke() { return this._stroke; }
	/**
	 * @description set stroke as you would VizColour
	 */
	set stroke(colourString = '#ffffff') {
		const colour = new VizColour(colourString);
		this._stroke = colour;
	}

	get rotate() { return this._rotate; }
	/**
	 * @description set rotate in degrees
	 */
	set rotate(deg = 0) {
		let rads = utils.degToRad(deg);
		this._rotate = rads;
	}

	/**
	 *
	 * @param {*} context
	 * @private
	 * @description drawing function for vi, sets fill, stroke, translate, rotate, scale
	 */
	_draw(context) {
		context.save();

		context.fillStyle = this._fillByColour ? this.fill.hsla : this.fill;
		context.lineWidth = this.strokeWidth;
		context.strokeStyle = this.stroke.hsla;

		context.translate(this.vector.x - (this.offsetX * this.scaleX), this.vector.y - (this.offsetY * this.scaleY));
		context.rotate(this.rotate);
		context.scale(this.scaleX, this.scaleY);

		context.fill(this.path);
		context.stroke(this.path);

		context.resetTransform();
		context.restore();
	}

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