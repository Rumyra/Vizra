// class to create Vector type, with added methods
class VizraVector {
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

	// multiply
	// returns given vector multiplied by parameter multiplier
	scaleUp(num) {
		this.y = this.y * num;
		this.x = this.x * num;
	}

	// divide
	// returns given vector divided by parameter divider
	scaledown(num) {
		this.y = this.y / num;
		this.x = this.x / num;
	}

	// length
	// returns length of vector
	mag() {
		return Math.sqrt(Math.pow(this.y, 2) + Math.pow(this.x, 2));
	}

	// return normalised vector - ie one unit
	normalize() {
		let m = this.mag();

		if (m != 0) {
			return scaleDown(m);
		} else {
			return 0;
		}
	}

	// static -> can be used without invoking class

	// get -> is called when called
}

export default VizraVector;
