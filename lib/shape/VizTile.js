import VizSymbol from './VizSymbol.js';
import VizVector from '../physics/VizVector.js';

// the tile is purely the group of shapes -> shapes needs a type/class...
// possibly a boid has all the physics and the tile (facade)
// TODO tile should have background
// TODO addShape() method -> maybe use maps and name shapes.

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

class VizTile extends VizSymbol {

	constructor({ x = 0, y = 0, w = 100, h = 100, rotate = 0, isAlive = true, shapes = [], scale = 1, offset = 0 } = {}) {

		super({
			x: x, y: y, w: w, h: h, rotate: rotate, inAlive: isAlive
		});

		this.shapes = shapes;

		this._scale = this._setMesurement(scale);
		this._offset = this._setMesurement(offset);

		this._clip = false;
	}

	/**
	 * @description adds a shape to the array of tile shapes
	 * @param VizShape
	 */
	addShape(shape) {
		this.shapes.push(shape);
	}

	get scale() { return this._scale; }
	set scale(scale) {
		this._scale = this._setMesurement(scale);
	}

	get offset() { return this._offset; }
	set offset(os) {
		this._offset = this._setMesurement(os);
	}

	/**
	 * You can clip tiles by setting VizTile.clip(). If nothing is passed it will clip a rectangle to the tails dimensions. You can set a custom shape by passing a path2d or reset by passing false
	 * clip
	 * @description Set a clip for the tile
	 * @param {*} true/false/path2d
	 * @default false when tile is instigated. True if Viztile.clip() is called
	 */

	get clip() { return this._clip; }
	set clip(path = true) {

		if (path === true) {
			const clipPath = new Path2D();

			clipPath.moveTo(0, 0);
			clipPath.moveTo(this.w / 2, this.h / 2);
			clipPath.lineTo(-this.w / 2, this.h / 2);
			clipPath.lineTo(-this.w / 2, -this.h / 2);
			clipPath.lineTo(this.w / 2, -this.h / 2);
			clipPath.closePath();

			this._clip = clipPath;
		} else {
			this._clip = path;
		}
	}


	/**
	 *
	 * @param {*} context
	 * @private
	 * @description drawing function for vi, sets fill, stroke, translate, rotate, scale
	 */
	_draw(context) {
		if (this.isAlive) {
			context.save();

			// NOTE to skew a tile set a different scale on x & y and then rotate
			// transforms for tile
			context.translate(this.x - this.offset.x, this.y - this.offset.y);



			context.rotate(this.rotate);
			context.scale(this.scale.x, this.scale.y);


			// move canvas back to top left corner of tile for drawing - we might have to multiply this by scale
			// context.translate(-(this.w / 2), -(this.h / 2));

			// add clipping
			if (this.clip) {
				context.clip(this.clip);
			}


			// draw shapes
			this.shapes.forEach((el, i) => {
				// save our current state
				context.save();
				// make a copy of our shape so we don't alter the original
				const shape = el;

				// decide whether shape should be drawn at pixels or percentage
				// if measurments are less than one, convert to percentage
				shape.x = el.x <= 1 ? this.w * el.x : el.x;
				shape.y = el.y <= 1 ? this.h * el.y : el.y;
				shape.w = el.w <= 1 ? this.w * el.w : el.w;
				shape.h = el.h <= 1 ? this.h * el.h : el.h;

				// move to our position
				context.translate(shape.x, shape.y);
				shape.draw(context);

				// restore to before this draw ready for the next shape
				context.restore();

			})

			context.resetTransform();
			context.restore();
		}
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