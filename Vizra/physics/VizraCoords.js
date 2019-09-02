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

// TODO pass in an object of options so we can test to see if they are there
// add in some nice error handling
// This will eventually create a cluster of vi rather than just coords

class VizraCoords {

	constructor(type, distrib, extendEdges = true) {
		this._type = type;
		this._distrib = distrib;
		this._extendEdges = extendEdges;

		this._resize();
		window.addEventListener("resize", () => {
			this._resize();
			this.coords = this.getCoords(this._type);
		}, false)

		this._xSize = this.xGridSize;
		this._ySize = this.yGridSize;

		this.coords = this.getCoords(this._type);

	}

	_resize() {
		const dpr = window.devicePixelRatio;
		this._screenWidth = window.innerWidth;
		this._screenHeight = window.innerHeight;
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

	_calculateGridSize(howRelaxed, dim = 'x') {

		// percentage of space between grid items
		let space = 8;

		if (howRelaxed === 'tight') {
			space = 4;
		} else if (howRelaxed === 'loose') {
			space = 12;
		} else if (howRelaxed === 'sloppy') {
			space = 18;
		}

		// square?
		// let's start with square and we can add y later
		if (dim === 'x') {
			return Math.round(this._screenWidth/100 * space);
		} else if (dim === 'y') {
			return Math.round(this._screenWidth/100 * space);
		}

	}

	getCoords(type) {

		const coords = [];

		if (type === 'square') {
			// console.log(this._ySize);
			if (this._extendEdges) {
				for (let y=0; y<this._screenHeight+this._ySize; y+=this._ySize) {
					for (let x=0; x<this._screenWidth+this._xSize; x+=this._xSize) {
							coords.push( new VizraVector(x, y) );
					}
				}
			} else {
				for (let y=this._ySize*1.67; y<this._screenHeight-(this._ySize); y+=this._ySize) {
					for (let x=this._xSize*1.67; x<this._screenWidth-(this._xSize); x+=this._xSize) {
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
				yStart = halfYSize*1.34;
				xStart = halfXSize*1.34;
				maxHeight = this._screenHeight-(halfYSize);
				maxWidth = this._screenWidth-(halfXSize);
			}

			for (let y=yStart; y<maxHeight; y+=halfYSize) {

				for (let x=xStart; x<maxWidth; x+=halfXSize) {
					const xRounded = Math.floor(x/halfXSize);
					const yRounded = Math.floor(y/halfYSize);
					// both x & y are odd OR both x & y are even, push coords
					if ( (xRounded%2 === 0 && yRounded%2 === 0) || (xRounded%2 === 1 && yRounded%2 === 1) ) {
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

			// set max width for first ring loop
			const maxWidth = this._screenWidth+this._ySize;

			// jump r -> circles -> extend to screen width
			for (let r=0; r<maxWidth; r+=this._ySize) {
				// jump theta o -> angle of distrib -> no bigger than 360
				const abc = Math.floor(maxWidth/this._ySize);
				// y = a * cos(2 pi x / b) + c // where a = 13, b = 26, c = 260
				// const oGap = 360/Math.abs(abc * ( Math.cos( (2*Math.PI*r) / (abc*20) ) )+abc);
				const oGap = 360/Math.abs(r*abc/100);
				// console.log(360/Math.abs(r*abc/100));
					for (let o=1; o<360; o+=oGap) {
						let rad = vizraUtils.degToRad(o)
						x = (r * Math.cos(rad)) + xOffset;
						y = (r * Math.sin(rad)) + yOffset;
						coords.push( new Entity(x, y) );
					}
			} // for

		} else if (type === 'custom') {
			// if type is custom distrib is an array of coord pairs
			this._distrib.forEach( (el, i) => {
				coords.push( new VizraVector(el[0], el[1]) );
			} )

		} else {
			throw new Error('Grid type must be square, iso, polar or custom');
		}

		return coords;
	}

	// return square coords

	// return iso coords

	// return polar coords

	// return spiral coords

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