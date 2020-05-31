/**
 * Vizra Utils Library
 * A bunch of math, random number & other util functions
 * @type {Object}
 * @author Ruth John
 * @copyright 2019 Ruth John
 * @namespace
 */
const utils = (() => {

/**
 * degToRad
 * @param  {int} degrees
 * @return {float} radians
 * @description turns degrees into radians
 * @example
 * // returns 3.14
 * utils.degToRad(180)
 */
	let degToRad = function(deg) {
		return deg*(Math.PI/180);
	}
	/**
	 * randomInt
	 * @param {number} min
	 * @param {number} max
	 * @description returns random integer between min and max inclusive - will floor min & ceil max if floats are used.
	 */
	let randomInt = function (min, max) {
		min = Math.floor(min);
		max = Math.ceil(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// Some useful maths functions from https://github.com/mattdesl/canvas-sketch-util/blob/master/math.js
	/**
	 * clamp
	 * @param {float} value
	 * @param {float} min
	 * @param {float} max
	 * @description Clamps value between min & max
	 */
	let clamp = function(value, min, max) {
		return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value);
	}
/**
 * lerp
 * @param {float} min
 * @param {float} max
 * @param {float} t
 * @description Linearly interpolates between min and max using the parameter t, where t is generally expected to be between 0..1 range. None of the inputs or outputs are clamped.
 */
	let lerp = function(min, max, t) {
		return min * (1 - t) + max * t;
	}
/**
 * inverseLerp
 * @param {float} min
 * @param {float} max
 * @param {float} t
 * @description Produces the inverse of lerp, in that you pass a value (a number between the range min and max) and get back a t value typically within the 0..1 range. None of the inputs or outputs are clamped.
 */
	let inverseLerp = function(min, max, t) {
			if (Math.abs(min - max) < Number.EPSILON) return 0;
		else return (t - min) / (max - min);
	}
/**
 * smoothstep
 * @param {float} min
 * @param {float} max
 * @param {float} t
 * @description Performs smooth Hermite interpolation between 0 and 1 when edge0 < x < edge1. This is useful in cases where a threshold function with a smooth transition is desired.
 */
	let smoothstep = (min, max, t) => {
		var x = clamp(inverseLerp(min, 	max, t), 0, 1);
		return x * x * (3 - 2 * x);
	}
/**
 * mod
 * @param {int} a
 * @param {int} b
 * @description Computes a % b but handles negatives and always returns a positive result, so that mod(-1, 4) will return 3 (instead of -1 with regular modulo).
 */
	let mod = function(a, b) {
		return ((a % b) + b) % b;
	}
/**
 * pingpong
 * @param {int} t
 * @param {int} length
 * @description PingPongs the value t, so that it is never larger than length and never smaller than 0. The returned value will move back and forth between 0 and length.
 */
	let pingPong = function(t, length) {
		t = mod(t, length * 2);
		return length - Math.abs(t - length);
	}
/**
 *
 * @param {float} value
 * @param {float} inputMin
 * @param {float} inputMax
 * @param {float} outputMin
 * @param {float} outputMax
 * @param {boolean} clamp
 * @description Maps the value from one range of [inputMin..inputMax] to another range of [outputMin..outputMax], with min/max being inclusive. By default, value is not clamped, but you can specify clamp as true to clamp the output within outputMin and outputMax.
 */
	let mapRange = function(value, inputMin, inputMax, outputMin, outputMax, clamp = false) {
		// Reference:
		// https://openframeworks.cc/documentation/math/ofMath/
		if (Math.abs(inputMin - inputMax) < Number.EPSILON) {
			return outputMin;
		} else {
			var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
			if (clamp) {
				if (outputMax < outputMin) {
					if (outVal < outputMax) outVal = outputMax;
					else if (outVal > outputMin) outVal = outputMin;
				} else {
					if (outVal > outputMax) outVal = outputMax;
					else if (outVal < outputMin) outVal = outputMin;
				}
			}
			return outVal;
		}
	}

	/**
	 *
	 * @param {float} chance
	 * @description where chance is 0 -> 1 0 being no chance, 1 being yes - returns true or false
	 * @returns {Boolean}
	 */
	let chance = function(chance) {
		const test = Math.random();

		return test < chance ? true : false;
	}

	let bellCurve = function () {
		return Math.sin(Math.random() * (Math.PI / 2));
	}

	let bellCurveInput = function (float) {
		return Math.sin(float * (Math.PI / 2));
	}

/**
 *
 * @param {float} chance
 * @description where chance is 0 -> 1 0 being no chance, 1 being yes. Smooths chance to be higher at higher and lower at lower
 * @returns {Boolean}
 */
	let smoothChance = function(chance) {

	}


	// do I need a random float, OR do I need to return a whole bunch of math.rand
	let normalDistrib = function(amountOfNumbers) {
		let returnAr = [];
		for (let i=0; i<amountOfNumbers; i++) {
			returnAr.push(Math.random());
		}
	}

	let gaussianArr = function(itemCount) {
		const returnAr = [];
		for (let i=0; i<itemCount; i++) {
			let random = 0;
			for (let i=0; i<10; i++) {
				random += Math.random();
			}
			returnAr.push(random/10);
		}
		return returnAr;
	}



	// monte carlo
	let monteCarlo = function() {
		while(true) {
			const randOne = Math.random();
			const randTwo = Math.random();
			if (randTwo < randOne) {
				return randOne;
			}
		}
	}

	/**
	 * @todo put vector methods back into vector class as static
	 */

	// vector utils -> for when you want to return a new vector and not effect the original
	// utility for two given vectors
	let multiplyVectors = function(vector1, vector2) {
		const y = vector1.y * vector2.y;
		const x = vector1.x * vector2.x;
		return new Vector(x, y);
	}

	// utlity for two given vectors
	let divideVectors = function(vector1, vector2) {
		const y = vector1.y / vector2.y;
		const x = vector1.x / vector2.x;
		return new Vector(x, y);
	}

	// takes both vectors, returns dot product
	let dotProduct = function(vector1, vector2) {
		return (vector1.x * vector2.x) + (vector1.y * vector2.y);
	}

	// return a normalised vector - ie one unit
	let normalisedVector = function(vector) {
		let m = vector.mag();

		if (m != 0) {
			return new Vector(vector.x*m, vector.y*m);
		} else {
			return new Vector(0,0);
		}
	}

	let returnRandomVector = function(minX, maxX, minY, maxY) {
		minX = Math.ceil(minX);
    maxX = Math.floor(maxX);
		minY = Math.ceil(minY);
    maxY = Math.floor(maxY);
    const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
		return new Vector(x,y);
	}

	return {
		degToRad,
		randomInt,
		clamp,
		lerp,
		inverseLerp,
		mod,
		pingPong,
		mapRange,
		smoothstep,
		chance,
		bellCurve,
		bellCurveInput,
		smoothChance,
		normalDistrib,
		gaussianArr,
		monteCarlo,
		multiplyVectors,
		divideVectors,
		dotProduct,
		normalisedVector,
		returnRandomVector
	};

})();

export default utils;