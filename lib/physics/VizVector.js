// class to create Vector type, with added methods
// TODO get El & Dad to look over vector class
// TODO you have got to be able to add static methods to this so you have utility methods for any vector - surely
// TODO vizra utils is used in this - but I'm pretty sure a static method would work

import utils from '../utils.js';


class VizVector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	// adds vector to given vector
	// returns given vector with added vector
	add(vector) {
		this.y = this.y + vector.y;
		this.x = this.x + vector.x;
	}

	// subtracts vector from given vector
	// returns given vector with subtracted vector
	sub(vector) {
		this.y = this.y - vector.y;
		this.x = this.x - vector.x;
	}

	// times by vector
	multiply(vector) {
		this.y = this.y * vector.y;
		this.x = this.x * vector.x;
	}

	// divide by vector
	divide(vector) {
		this.y = this.y / vector.y;
		this.x = this.x / vector.x;
	}

	// returns given vector multiplied by parameter multiplier
	scaleUp(num) {
		this.y = this.y * num;
		this.x = this.x * num;
	}

	// returns given vector divided by parameter divider
	scaleDown(num) {
		this.y = this.y / num;
		this.x = this.x / num;
	}

	// gets dot of this vector
	dot(vector) {
		return (vector.x * this.x) + (vector.y * this.y);
	}

	// length
	// returns length of vector
	mag() {
		return Math.sqrt(Math.pow(this.y, 2) + Math.pow(this.x, 2));
	}

	// calculate distance between this vector and another
	distance(otherVector) {
		return Math.sqrt( Math.pow(this.x-otherVector.x, 2) + Math.pow(this.y-otherVector.y, 2) );
	}

	// return normalised vector - ie one unit
	normalise() {
		let m = this.mag();

		if (m != 0) {
			return scaleDown(m);
		}
	}

	// a dot b === mag a * mag b * cos(angle)
	angle2(vector) {
		const vec1 = utils.normalisedVector(this);
		const vec2 = utils.normalisedVector(vector);
		return Math.acos(utils.dotProduct(vec1, vec2));
	}
	angle(vector) {
		return -Math.atan2(vector.y - this.y, vector.x - this.x);
	}

	// limit - vector can not go above these values
	limit(maxVector) {
		if(this.x > maxVector.x) {
			this.x = maxVector.x;
		}

		if (this.y > maxVector.y) {
			this.y = maxVector.y;
		}
	}

	randomise(minX, maxX, minY, maxY) {
		minX = Math.ceil(minX);
    maxX = Math.floor(maxX);
		minY = Math.ceil(minY);
    maxY = Math.floor(maxY);
    this.x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    this.y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
	}

	// static -> can be used without invoking class

	// get -> is called when called
}

export default VizVector;
