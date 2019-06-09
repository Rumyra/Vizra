/**
 * Vizra Utils Library
 * @author Ruth John
 * @copyright 2019 Ruth John
 */

const vizraUtils = {
	/**
	* Returns radian value from passed in degrees
	* @param {Number} deg
	* @returns {Number}
	* @example
	* degToRad(90) // returns 1.57
	*/
	degToRad: function(deg) {
		return deg*(Math.PI/180);
	},
	randomNumber: function(min, max) {
		min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	// TODO make this a map function -> map(val, startRange, endRange)
	// input val between 0-255 & return val 0-1
	mapData(val, firstRange, lastRange) {
		return Number((lastRange/firstRange)*val).toFixed(2);
	},

	normaliseData: function(dataVal) {
		return dataVal/255;
	},
	returnFPS: function(frame, fps = 24) {
		return true;
	}
}

export default vizraUtils;