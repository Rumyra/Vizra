import utils from '../utils.js';
import ViVector from './ViVector.js';
import ViColour from './ViColour.js';
/**
 * Vi
 * The shape on the canvas: includes facade & physics
 * @author Ruth John
 * @copyright 2019 Ruth John
 * @requires utils
 * @requires ViVector
 * @requires ViColour
 * @todo include params affected by audio/midi
 * @todo figure out collision functions
 */

class Vi {
	/**
	 *
	 * @param {int} x pixels
	 * @param {int} y pixels x & y are turned into a vector
	 * @param {*} path Path2D
	 * @todo mass, velocity, acceleration and topspeed can be getters and setters
	 */
	constructor(x, y, path) {
		// position
		this.vector = new ViVector(x, y);
		this.size = new ViVector(100, 100)
		this.scale = new ViVector(1, 1);
		this._rotate = 0;
		this.offset = new ViVector(0, 0);

		// forces
		this.mass = 10;
		this.velocity = new ViVector(0,0);
		this.acceleration = new ViVector(0,0);
		this.topspeed = new ViVector(1, 1);

		// facade
		this.path = path;
		this._fill = new ViColour('#ff0000');
		this.strokeWidth = 1.0;
		this._stroke = new ViColour('#ffffff');
	}

	get fill() { return this._fill; }
	/**
	 * @description set fill as you would ViColour
	 */
	set fill(colourString = '#ff0000') {
		this._fill = new ViColour(colourString);
	}

	get stroke() { return this._stroke; }
	/**
	 * @description set stroke as you would ViColour
	 */
	set stroke(colourString = '#ffffff') {
		const colour = new ViColour(colourString);
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

		context.fillStyle = this.fill.hsla;
		context.lineWidth = this.strokeWidth;
		context.strokeStyle = this.stroke;

		context.translate(this.vector.x-(this.offset.x*this.scale.x), this.vector.y-(this.offset.y*this.scale.y));
		context.rotate(this.rotate);
		context.scale(this.scale.x, this.scale.y);

		context.fill(this.path);
		context.stroke(this.path);

		context.resetTransform();
		context.restore();
	}

	/**
	 * @description set velocity, acc, any forces, edge bounce, collide
	 * @private
	 */
	_applyForces() {
		this.velocity.add(this.acceleration)
		this.velocity.limit(this.topspeed);
		this.vector.add(this.velocity);
		this.acceleration.scaleUp(0)
	}

	/**
	 *
	 * @param {*} ctx
	 * @description draw & apply forces
	 */
	update(ctx) {
		this._draw(ctx);
		this._applyForces();
	}

	/**
	 *
	 * @param {int} xVel
	 * @param {int} yVel
	 * @description velocity returns a vector so we have the same vector powers over it
	 */
	setVelocity(xVel, yVel) {
		const vector = new ViVector(xVel, yVel);
		this.velocity = vector;
	}
	/**
	 *
	 * @param {int} xAcc
	 * @param {int} yAcc
	 * @description sets acceleration as a vector
	 */
	setAcceleration(xAcc, yAcc) {
		const acc = new ViVector(xAcc, yAcc);
		this.acceleration = acc;
	}
	/**
	 *
	 * @param {int} xMax
	 * @param {int} yMax
	 * @description set top speed
	 */
	setTopspeed(xMax, yMax) {
		this.topspeed = new ViVector(xMax, yMax);
	}
	/**
	 *
	 * @param {int} xForce
	 * @param {int} yForce
	 * @description apply force
	 */
	applyForce(xForce, yForce) {
		const forceVector = new ViVector(xForce, yForce);
		forceVector.scaleDown(this.mass);
		this.acceleration.add(forceVector);
	}

	/**
	 *
	 * @param {int} pointX
	 * @param {int} pointY
	 * @description move to a point - this sets a direction for the acceleration - you still need to call accelerate
	 */
	setDirection(pointX, pointY) {
		const direction = new ViVector(pointX, pointY);
		direction.sub(this.vector);
		direction.normalise();
		direction.scaleUp(0.5);
		this.acceleration = direction;
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

	// edited from christopher4lis https://gist.github.com/christopher4lis/f9ccb589ee8ecf751481f05a8e59b1dc
	rotateVel(angle) {
		this.velocity.x = (this.velocity.x * Math.cos(angle)) - (this.velocity.y * Math.sin(angle)),
		this.velocity.y = (this.velocity.x * Math.sin(angle)) + (this.velocity.y * Math.cos(angle))
	}

	resolveCollision2(otherEntity) {
		this.velocity.x = -this.velocity.x;
		otherEntity.velocity.x = -otherEntity.velocity.x;
	}

	resolveCollision(otherEntity) {
		const velDiff = new Vector(this.velocity.x, this.velocity.y);
		velDiff.sub(otherEntity.velocity);

		const dist = new Vector(otherEntity.vector.x, otherEntity.vector.y);
		dist.sub(this.vector);

		// Prevent accidental overlap of particles
		if (velDiff.x * dist.x + velDiff.y * dist.y > 1) {

			// Grab angle between the two colliding particles
			const angle = this.vector.angle(otherEntity.vector);

			// Store mass in var for better readability in collision equation
			const m1 = this.mass;
			const m2 = otherEntity.mass;

			// Velocity before equation
			this.rotateVel(angle);
			otherEntity.rotateVel(angle);

			// Velocity after 1d collision equation
			this.setVelocity(this.velocity.x * (m1 - m2) / (m1 + m2) + otherEntity.velocity.x * 2 * m2 / (m1 + m2), this.velocity.y)
			otherEntity.setVelocity(otherEntity.velocity.x * (m1 - m2) / (m1 + m2) + this.velocity.x * 2 * m2 / (m1 + m2), otherEntity.velocity.y)
			// console.log(this.velocity);

			// Final velocity after rotating axis back to original location
			this.rotateVel(-angle);
			otherEntity.rotateVel(-angle);
		}
	} // resolve

	// NEED THESE
// 	function distance(x1,y1,x2,y2) {
//   var x = x1 - x2;
//   var y = y1 - y2;
//   return Math.sqrt( x * x + y * y);
// }
// function willCollide(b1,b2) {
//   var dMax = b1.radius + b2.radius;
//   var d = distance(b1.entity.vector.x+b1.entity.velocity.x, b1.entity.vector.y+b1.entity.velocity.y, b2.entity.vector.x+b2.entity.velocity.x, b2.entity.vector.y+b2.entity.velocity.y);
//   return d < dMax;
// }

	// same as above but from https://codepen.io/ATreur/pen/owxwxV?editors=0010 THIS IS THE ONE
	addCollisionResponse(otherEntity) {
  	const dx = this.vector.x - otherEntity.vector.x;
  	const dy = this.vector.y - otherEntity.vector.y;
  	const collisionAngle = Math.atan2(dy, dx);

  	// Get velocities of each ball before collision
  	const speed1 = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
  	const speed2 = Math.sqrt(otherEntity.velocity.x * otherEntity.velocity.x + otherEntity.velocity.y * otherEntity.velocity.y);

  	// Get angles (in radians) for each ball, given current velocities
  	const direction1 = Math.atan2(this.velocity.y, this.velocity.x);
  	const direction2 = Math.atan2(otherEntity.velocity.y, otherEntity.velocity.x);

  	// Rotate velocity vectors so we can plug into equation for conservation of momentum
  	const rotatedVelocityX1 = speed1 * Math.cos(direction1 - collisionAngle);
  	const rotatedVelocityY1 = speed1 * Math.sin(direction1 - collisionAngle);
  	const rotatedVelocityX2 = speed2 * Math.cos(direction2 - collisionAngle);
  	const rotatedVelocityY2 = speed2 * Math.sin(direction2 - collisionAngle);

  // Update actual velocities using conservation of momentum
  /* Uses the following formulas:
           velocity1 = ((mass1 - mass2) * velocity1 + 2*mass2 * velocity2) / (mass1 + mass2)
           velocity2 = ((mass2 - mass1) * velocity2 + 2*mass1 * velocity1) / (mass1 + mass2)
      */
  	const finalVelocityX1 = ((this.mass - otherEntity.mass) * rotatedVelocityX1 + (otherEntity.mass + otherEntity.mass) * rotatedVelocityX2) / (this.mass + otherEntity.mass);
  	const finalVelocityX2 = ((this.mass + this.mass) * rotatedVelocityX1 + (otherEntity.mass - this.mass) * rotatedVelocityX2) / (this.mass + otherEntity.mass);

  	// Y velocities remain constant
  	const finalVelocityY1 = rotatedVelocityY1;
  	const finalVelocityY2 = rotatedVelocityY2;

		// Rotate angles back again so the collision angle is preserved
		this.velocity.x = Math.cos(collisionAngle) * finalVelocityX1 + Math.cos(collisionAngle + Math.PI/2) * finalVelocityY1;
		this.velocity.y = Math.sin(collisionAngle) * finalVelocityX1 + Math.sin(collisionAngle + Math.PI/2) * finalVelocityY1;
		otherEntity.velocity.x = Math.cos(collisionAngle) * finalVelocityX2 + Math.cos(collisionAngle + Math.PI/2) * finalVelocityY2;
		otherEntity.velocity.y = Math.sin(collisionAngle) * finalVelocityX2 + Math.sin(collisionAngle + Math.PI/2) * finalVelocityY2;
	} //addCollisionResponse

}

export default Vi;