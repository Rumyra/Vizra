import vizraUtils from '../vizraUtils.js';
import VizraVector from './VizraVector.js';
// import VizraCanvas from '../VizraCanvas.js';
/**
 * Vizra Coordinate Library: set of methods to return different coords for distributing shapes on canvas
 * @author Ruth John
 * @copyright 2019 Ruth John
 */

/**
	* Returns grid distrib
	* @param {String}
	* @param {String} or {Array}
	* @param {Boolean}
	* @returns {Array}
	* @example
	* new VizraCoords // returns [{x: 10, y: 10}, {x: 20, y: 20}]
*/

class VizraCoords {

	constructor(type, distrib, extendEdges = true) {
		this._type = type;
		this._distrib = distrib;
		this._extendEdges = extendEdges;

		this._xSize = this.xGridSize;
		this._ySize = this.yGridSize;

		this.coords = this.getCoords(this._type);
	}

	set type(type) {
		this._type = type;
	}

	get _screenWidth() {
		return window.innerWidth;
	}

	get _screenHeight() {
		return window.innerHeight;
	}

	get xGridSize() {

		if (Array.isArray(this._distrib)) {
			return this._distrib[0];
		} else {
			return this._calculateGridSize(this._distrib);
		}

	}

	get yGridSize() {

		if (Array.isArray(this._distrib)) {
			return this._distrib[1];
		} else {
			return this._calculateGridSize(this._distrib, false);
		}

	}

	_calculateGridSize(howRelaxed, x = true) {

		// percentage of space between grid items
		let space = 8;

		if (howRelaxed === 'tight') {
			space = 4;
		} else if (howRelaxed === 'loose') {
			space = 12;
		}

		// square?
		// let's start with square and we can add y later
		if (x) {
			return Math.ceil(this._screenWidth/100 * space);
		} else {
			return Math.ceil(this._screenWidth/100 * space);
		}

	}

	getCoords(type) {

		const coords = [];

		if (type === 'grid') {
			// console.log(this._ySize);
			if (this._extendEdges) {
				for (let y=0; y<this._screenHeight+this._ySize; y+=this._ySize) {
					for (let x=0; x<this._screenWidth+this._xSize; x+=this._xSize) {
							coords.push( new VizraVector(x, y) );
					}
				}
			} else {
				for (let y=this._ySize*2; y<this._screenHeight-(this._ySize*3); y+=this._ySize) {
					for (let x=this._xSize*2; x<this._screenWidth-(this._xSize*3); x+=this._xSize) {
							coords.push( new VizraVector(x, y) );
					}
				}
			} // if edges

		} else if (type === 'iso') {

			const halfXSize = Math.ceil(this._xSize/2);
			const halfYSize = Math.ceil(this._ySize/2);

			let yStart = 0
			let xStart = 0
			let maxHeight = this._screenHeight+halfYSize;
			let maxWidth = this._screenWidth+halfXSize;
			if (this._extendEdges === false) {
				yStart = halfYSize*2;
				xStart = halfXSize*2;
				maxHeight = this._screenHeight-(halfYSize*3);
				maxWidth = this._screenWidth-(halfXSize*3);
			}

			for (let y=yStart; y<maxHeight; y+=halfYSize) {

				for (let x=xStart; x<maxWidth; x+=halfXSize) {
					// both x & y are odd OR both x & y are even, push coords
					if ( ((x/halfXSize)%2 === 0 && (y/halfYSize)%2 === 0) || ((x/halfXSize)%2 === 1 && (y/halfYSize)%2 === 1) ) {
						coords.push( new VizraVector(x, y) );
					}
				}

			}

		} else if (type === 'polar') {

			// need to create offset as will start top left
			const xOffset = Math.floor(this._screenWidth/2);
			const yOffset = Math.floor(this._screenHeight/2);

			// y is radius, x is theta (needs to normalise to within 360)
			let x = 0;
			let y = 0;
			// jump r -> circles -> extend to screen width
			for (let r=0; r<this._screenWidth+this._ySize; r+=this._ySize) {
				// jump theta o -> angle of distrib -> no bigger than 360
					for (let o=0; o<361; o+=this._xSize) {
						let rad = vizraUtils.degToRad(o)
						x = (r * Math.cos(rad)) + xOffset;
						y = (r * Math.sin(rad)) + yOffset;
						coords.push( new VizraVector(x, y) );
					}
			} // for

		} else if (type === 'custom') {
			// if type is custom distrib is an array of coord pairs
			this._distrib.forEach( (el, i) => {
				coords.push( new VizraVector(el[0], el[1]) );
			} )

		} else {
			throw new Error('Grid type must be grid, iso or polar');
		}

		return coords;
	}

	scaleGrid(vector = new VizraVector(1, 1)) {


		this.coords.forEach( (el, i) => {

			if (el.x < this._screenWidth/2) {
				el.x = el.x - vector.x;
			} else {
				el.x = el.x + vector.x;
			}

			if (el.y < this._screenHeight/2) {
				el.y = el.y - vector.y;
			} else {
				el.y = el.y + vector.y;
			}

		} )
	} // scaleGrid

	randomiseGrid() {

		this.coords.forEach( (el, i) => {
			let randomVecX = vizraUtils.randomNumber(-10, 10);
			let randomVecY = vizraUtils.randomNumber(-10, 10);
			let newVector = new VizraVector(randomVecX, randomVecY);
			el.add(newVector);
		} )
	}

}

export default VizraCoords;