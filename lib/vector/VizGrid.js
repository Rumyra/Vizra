import utils from '../utils.js';
import VizVector from 'VizVector.js';
/**
 * Vizra Coordinate Library: set of methods to return different coords for distributing shapes on canvas
 * @author Ruth John
 * @copyright 2019 Ruth John
 */

 /**
	* @todo this should _belong_ with a Vi, like a Vi should have an x & y coord, how I don't know yet
	* @todo create random coords
	* @todo sort out polar coords
	* @todo spiral coords
	* @todo error handling
	* @todo should this return a cluster of vi rather than just coords?
	* @todo resize
	* @todo add cluster amount
	* @todo center cluster
	*/

/**
	* Returns grid distrib
	* @param {*} [new Canvas] of Canvas type from Canvas.js to allow proper dimensions
	* @param {Object} [options]
	* @param {String} options.type can be 'square', 'iso', 'polar'. 'size' or 'custom'. 'custom' means an array of coords should be passed into the next argument
	* @default 'square'
	* @param {*} options.dis distribution. Determines how close the coords should be on the grid. If grid is _not_ 'size' or 'custom' can be 'tight', 'regular', 'loose' or 'sloppy'. If 'custom' is set as the grid type, an array of coord pairs (vector type) should be passed in instead. If 'size' is set one dimentional array of [x, y] size must be specified
	* @default 'regular'
	* @param {*} options.padding Adds padding around grid on canvas. Set to false by default so grid will extend to edges, true will set a calculated padding based on grid size, value can be set in percentage of overall width.
	* @default false
	* @param {String} options.cluster if specified, the grid will drop coordinates away from the specifed point, obtaining a feathered effect. How much to feather is specified in the next param. Can be 'top', 'bottom', 'left', 'right', 'center' or 'sides'.
	* @default false
	* @param {Float} options.clusterAmount value between 0 - 1, 0 being no clustering, 1 being full cluster effect. Good to tweak depending on type & dis.
	* @default 0.5
	* @returns {Array} returns an array of Vector objects with x and y properties.
	* @example
	* new VizraCoords(canvas, 'grid', 'regular', false) // returns [{x: 10, y: 10}, {x: 20, y: 20}]
	* new VizraCoords(canvas, 'custom', [[100, 100], [150, 100]]) // returns [{x: 100, y: 100}, {x: 150, y: 100}]
*/


class VizGrid {

	constructor(canvas, { type = 'square', dis = 'regular', padding = false, cluster = false, clusterAmount = 0.5 } = {}) {
		this._canvas = canvas;
		this._type = type;
		this._distrib = dis;
		this._cluster = cluster;
		this._clusterAmount = clusterAmount

		this._generated = this._isGenerated();

		// this._resize();
		// window.addEventListener("resize", () => {
		// 	this._resize();
		// 	this.coords = this.getCoords(this._type);
		// }, false)

		// update this throughout & use in get
		// all the sizing - order matters
		this._padding = this._calculatePadding(padding);
		this._xSize = this._xGridSize();
		this._ySize = this._yGridSize();

		this._coords = [];
		this.generateCoords();

	}

	/**
	 * @description flag to make things easier to see whether grid is generated or size is set
	 * @private
	 */
	_isGenerated() {
		return this._type === ('size' || 'custom') ? false : true;
	}

	// x & y grid size - generate, then set in get
	/**
	 * @description gets x grid size depending on type
	 * @private
	 */
	_xGridSize() {

		if (!this._isGenerated) {
			// return size based on array
			if (this._type === 'size') {
				return this._distrib[0];

			} else if (this._type === 'custom') {
				let firstX = this._distrib[0].x;
				// find next x which isn't the same
				let nextX = this._distrib.find(item => {
					return item.x != firstX
				})
				// check if we found anything different & return size
				if (nextX) {
					return nextX > firstX ? nextX - firstX : firstX - nextX;
				} else { return 0 }

			}
		} else {
			return this._calculateGridSize(this._distrib)
		}

	}

	/**
	 * @description gets y grid size depending on type
	 * @private
	 */
	_yGridSize() {

		if (!this._isGenerated) {
			// return size based on array
			if (this._type === 'size') {
				return this._distrib[1];

			} else if (this._type === 'custom') {
				let firstY = this._distrib[0].y;
				// find next x which isn't the same
				let nextY = this._distrib.find(item => {
					return item.y != firstY
				})
				// check if we found anything different & return size
				if (nextY) {
					return nextY > firstY ? nextY - firstY : firstY - nextY;
				} else { return 0 }

			}
		} else {
			return this._calculateGridSize(this._distrib)
		}

	}

	/**
	 * Depends on _xSize
	 * @param {*} val
	 * @private
	 */
	_calculatePadding(val) {
		let newVal;
		if (!val) {
			newVal = 0
		} else if (val === true) {
			newVal = Math.round((this._canvas.width/100) * this._getSpaceVal());
		} else {
			newVal = Math.round((this._canvas.width / 100) * val);
		}
		return newVal;
	}
	get padding() { return this._padding; }
	/**
	 * @description get and set padding
	 * @param {*} can be false (0), true (generated) or a percentage val
	 */
	set padding(val) {
		this._padding = this._calculatePadding(val);
	}

	/**
	 * @property
	 * @description calculated grid width after padding has been substracted
	 */
	get gridWidth() {
		return this._canvas.width - (this._padding);
	}
/**
 * @property
 * @description calculated grid height after padding has been substracted
 */
	get gridHeight() {
		return this._canvas.height - (this._padding);
	}

	/**
	 * @description returns an int based on options.dis input
	 */
	_getSpaceVal() {
		// percentage of space between grid items
		let space = 4;

		if (this._distrib === 'tight') {
			space = 3;
		} else if (this._distrib === 'loose') {
			space = 8;
		} else if (this._distrib === 'sloppy') {
			space = 12;
		}

		return space;
	}
	/**
	 * @description used for generated grid
	 * @todo create a 'grid' type which is rectangular and ustilises y
	 */
	_calculateGridSize() {

		const space = this._getSpaceVal();

		return Math.round((this.gridWidth/100) * space);

	}

	get xSize() { return this._xSize }
	/**
	 * @description set xSize in pixels
	 */
	set xSize(val) {
		this._xSize = val;
	}
	get ySize() { return this._ySize }
	/**
	 * @description set ySize in pixels
	 */
	set ySize(val) {
		this._ySize = val;
	}

	// set up distribution
	get dis() {return this._distrib}
	/**
	 * @description set distribution
	 * @todo you may need to rerun creating coords
	 */
	set dis(val) {
		this._distrib = val;
	}

	/**
	 * @description get coordinates based on type
	 *
	 */
	generateCoords() {

		if (this._type === ('square' || 'size')) {

			this._getSquareCoords();

		} else if (this._type === 'iso') {

			this._getIsoCoords();

		} else if (this._type === 'polar') {

			this._getPolarCoords();

		} else if (this._type === 'custom') {

			this._getCustomCoords();

		} else {
			throw new Error('Grid type must be square, iso, polar, size or custom');
		}

	}

	get coords() {return this._coords;}

	/**
	 * @description create square coords
	 * @private
	 */
	_getSquareCoords() {
		let startX = this._padding;
		let startY = this._padding;
		let maxX = this.gridWidth;
		let maxY = this.gridHeight;
		// if padding is nothing extend the width & height by a margin to fill
		if (this._padding === 0) {
			maxX = maxX + this._xSize;
			maxY = maxY + this._ySize;
		}

		for (let y = startY; y < maxY; y += this._ySize) {
			for (let x = startX; x < maxX; x += this._xSize) {

				// cluster
				let chance = 0;
				if (this._cluster === 'top') {
					chance = utils.smoothstep(0, maxY, y);
				} else if (this._cluster === 'bottom') {
					chance = utils.smoothstep(maxY, 0, y);
				} else if (this._cluster === 'left') {
					chance = utils.smoothstep(0, maxX, x);
				} else if (this._cluster === 'right') {
					chance = utils.smoothstep(maxX, 0, x)
				} else if (this._cluster === 'center') {
					let chanceY, chanceX;
					// y chance
					if (y < maxY / 2) {
						chanceY = utils.smoothstep(maxY / 2, 0, y);
					} else {
						chanceY = utils.smoothstep(0, maxY / 2, y)
					}
					// x chance
					if (x < maxX / 2) {
						chanceX = utils.smoothstep(maxX / 2, 0, x);
					} else {
						chanceX = utils.smoothstep(0, maxX / 2, x);
					}
					chance = (chanceY + chanceX) / 2;
				}
				if (utils.chance(chance)) continue;

				this._coords.push(new VizVector(x, y));
			}
		}
	} // square

	/**
	 * @description return iso coords
	 * @private
	 */
	_getIsoCoords() {
		const halfXSize = Math.round(this._xSize / 2);
		const halfYSize = Math.round(this._ySize / 2);

		let yStart = this._padding;
		let xStart = this._padding;
		let maxHeight = this.gridHeight;
		let maxWidth = this.gridWidth;
		if (this._padding === 0) {
			maxHeight = maxHeight + halfYSize;
			maxWidth = maxWidth +halfXSize;
		}

		for (let y = yStart; y < maxHeight; y += halfYSize) {

			for (let x = xStart; x < maxWidth; x += halfXSize) {

				// cluster
				let chance = 0;
				if (this._cluster === 'top') {
					chance = utils.smoothstep(0, maxHeight, y);
				} else if (this._cluster === 'bottom') {
					chance = utils.smoothstep(maxHeight, 0, y);
				} else if (this._cluster === 'left') {
					chance = utils.smoothstep(0, maxWidth, x);
				} else if (this._cluster === 'right') {
					chance = utils.smoothstep(maxWidth, 0, x)
				} else if (this._cluster === 'center') {
					let chanceY, chanceX;
					// y chance
					if (y < maxHeight/2) {
						chanceY = utils.smoothstep(maxHeight/2, 0, y);
					} else {
						chanceY = utils.smoothstep(0, maxHeight/2, y)
					}
					// x chance
					if (x < maxWidth/2) {
						chanceX = utils.smoothstep(maxWidth/2, 0, x);
					} else {
						chanceX = utils.smoothstep(0, maxWidth/2, x);
					}
					chance = (chanceY + chanceX)/2;
				}
				if (utils.chance(chance)) continue;


				const xRounded = Math.floor(x / halfXSize);
				const yRounded = Math.floor(y / halfYSize);
				// both x & y are odd OR both x & y are even, push coords
				if ((xRounded % 2 === 0 && yRounded % 2 === 0) || (xRounded % 2 === 1 && yRounded % 2 === 1)) {
					this._coords.push(new VizVector(x, y));
				}
			}
		}
	}

	/**
	 * @description return polar coords
	 * @private
	 * @todo include cluster
	 * @todo create spiral
	 */
	_getPolarCoords() {
		// y is radius, x is theta (needs to normalise to within 360)
		let x = 0;
		let y = 0;

		// set max width for first ring loop
		const maxWidth = this.gridHeight;

		// jump r -> circles -> extend to screen width
		for (let r = 0; r < maxWidth; r += this._ySize) {
			// jump theta o -> angle of distrib -> no bigger than 360

			const abc = Math.floor(maxWidth / this._xSize);

			const oGap = Math.abs(360 / Math.abs(r * abc / 300));

			for (let o = 1; o < 360; o += oGap) {

				// cluster (center only)
				let chance = 0;

				if (this._cluster === 'sides') {
					chance = utils.smoothstep(maxWidth, 0, r);
				} else if (this._cluster === 'center') {
					chance = utils.smoothstep(0, maxWidth, r);
				}

				if (utils.chance(chance)) continue;

				let rad = utils.degToRad(o)
				x = (r * Math.cos(rad)) + this._canvas.centerX;
				y = (r * Math.sin(rad)) + this._canvas.centerY;
				this._coords.push(new VizVector(x, y));
			}
		} // for
	}

	/**
	 * @description create custom coords
	 */
	_getCustomCoords() {
		// if type is custom distrib is an array of coord pairs
		this._distrib.forEach((el, i) => {
			this._coords.push(new VizVector(el[0], el[1]));
		})
	}

	/**
	 *
	 * @param {float} x
	 * @param {float} y
	 * @description scale grid based on input x and y
	 */
	scaleGrid(x = 1, y = 1) {

		let vector = new VizVector(x, y);

		this._coords.forEach( (el, i) => {

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

	/**
	 * @description randomely shift grid coords
	 */
	shiftGrid(topAmount = 10) {

		this.coords.forEach( (el, i) => {
			let randomVecX = Math.floor(utils.randomInt(-10, 10)*this._canvas.dpr);
			let randomVecY = Math.floor(utils.randomInt(-10, 10)*this._canvas*dpr);

			let newVector = new ViVector(randomVecX, randomVecY);

			el.add(newVector);
		} )
	}

}

export default VizraCoords;