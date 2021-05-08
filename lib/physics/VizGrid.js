import utils from '../utils.js'
// welp I'm extending map 🤷🏻‍♀️ hope it works

// TODO you need to re-render the grid if any of the parameters change
// TODO add vizvector
// TODO add type tests (is this an int)
// TODO sort jsdocs
// TODO fix width bug - try window.screenX
// TODO this should JUST return a nested arr or x: y: - no dependencies or other types - remove all 'isAlive' chance, distribution etc... and move to viz layer (where grid, vector, palette & tiles come together)
// DO EVERTHING RETURN THIS

/**
 * @param {int} width
 * @description width of generated grid
 * @param {int} height
 * @description height of generated grid
 * @param {object} options
 * @description includes:
 * // TODO include defaults
 * spacing {float} between 0-1
 * ratio {float} under 1 increases cell width, over 1 increases cell height
 * axis {'x' or 'y'} which direction coords are generated, especially useful with offset
 * offset {float} 0-1 offset every other line
 * // TODO offset every two lines
 * dis {float} between 0-1, whether to distribute shapes. Takes one value for both axis or two (array) for either
 * falloff {float} between 0-1 the spread of distribution. 0 means alive shapes decline quickly (full clustering), 1 means alive shapes decline slowly (no clustering)
 * padding {boolean} whether there should be space around the viewport
 */
class VizGrid extends Map {
	constructor(width, height, { spacing = 0.5, ratio = 1, axis = 'x', offset = 0, dis = 0, falloff = 0, padding = false } = {}) {
		super();
		this._width = width;
		this._height = height;
		this._spacing = spacing;
		this._ratio = ratio;
		this._axis = axis;
		this._dis = this._parseValToXy(dis);
		this._falloff = this._parseValToXy(falloff);
		this.padding = padding;

		// these things need to happen in order
		this._spacingConstant = 80;
		// for use later if calculating cell width & height
		this.origSize = this._returnOrigSize();
		this._offset = this._calculateOffset(offset);

		this.grid = [];
		this._generate();

	}

	// GETTERS & SETTERS ==========================

	/**
	 * @property {int} width The width of the grid
	 * @description Set width of grid
	 * @param {int} val pixels only
	 * @returns {int}
	 */
	get width() { return this._width; }
	set width(val) { this._width = val; }

	/**
	 * @description Set height of grid
	 * @param {int} val pixel only
	 */
	get height() { return this._height; }
	set height(val) { this._height = val; }

	/**
	 * @description Set spacing property
	 * @param {float}
	 */
	get spacing() {
		return this._spacing;
	}
	set spacing(val) {
		this._spacing = val;
		// !TODO rerun things
		// !TODO allow for integer vals or custom
	}
	
	/**
	 * @description return an initial size for use later when calculating cell width & cell height. This is always based on screen width, spacing and spacing constant
	 * @returns {int}
	 * @private
	 */
	_returnOrigSize() {
		return (this._width) /
			(this._spacingConstant *
				Math.pow(this._spacing, 2));
	}
	/**
	 * @description Return cell width
	 * @returns {float}
	 * @readOnly
	 */
	get cw() {
		// if ratio is below 1 width is smaller
		if (this._ratio < 1) {
			return this.origSize / this._ratio;
		} else {
			return this.origSize;
		}
	}
	/**
	 * @description Return cell height
	 * @returns {float}
	 * @readOnly
	 */
	get ch() {
		if (this._ratio > 1) {
			return this.origSize * this._ratio;
		} else {
			return this.origSize;
		}
	}

	/**
	 * @description Set ratio
	 * @param {float} val If less than 1 x increases, if greater than 1 y increases
	 */
	get ratio() { return this._ratio; }
	set ratio(val) { this._ratio = val; }

	/**
	 * @description Set axis
	 * @param {'x' or 'y'} direction set whether coordinates are created left to right or top to bottom
	 */
	get axis() { return this._axis; }
	set axis(direction) { this._axis = direction; }

	_calculateOffset(val) {
		if (val <= 1) {
			if (this.axis === 'x') {
				return this.cw*val;
			} else {
				return this.ch*val;
			}
		} else {
			return val;
		}
	}
	/**
	 * @description Set offset
	 * @param {float} val Offset can be set explicitly with a pixel value, or a ratio of cell size with a value between 0 & 1. 0 being no offset and 1 begin the cell size. Whether cell width or height is used depends on axis.
	 */
	get offset() { return this._offset; }
	set offset(val) { 
		this._offset = this._calculateOffset(val);
	}

	/**
	 * @description Set distribution
	 * @param {float or array} position Describe the starting point for distribution. A value between 0 & 1 which maps to the x and y axis. One float is both axis, an array of two floats is x then y. Works with falloff.
	 */
	get dis() { return this._dis; }
	set dis(position) {
		this._dis = this._parseValToXy(position);
	}

	/**
	 * @description Set falloff - how quickly distribution disappears (1) or stays (0)
	 * @param {float or array} amount A value between 0 (no falloff) and 1 (full falloff)
	 */
	get falloff() { return this._falloff; }
	set falloff(amount) {
		this._falloff = this._parseValToXy(amount);
	}

	// TODO this chould probably happen on grid generation
	get xCount() {
		// if x axis, total x will length of nested arr
		if (this.axis === 'x') {
			return this.grid[0].length;
		} else {
			return this.grid.length;
		}
	}

	get yCount() {
		// if x axis, total x will length of grid arr
		if (this.axis === 'x') {
			return this.grid.length;
		} else {
			return this.grid[0].length;
		}
	}
	

	// GENERATION =========================
	/**
	 * @description make a two dimensional array of objects with x and y points based on sizing. Includes padding & offset, but not distribution, which is achieved later. Nesting is based on axis: x is default so rows (y coord) are nested array & cols (x coord) is the value
	 * @returns {this} populates this.grid with a 2d array
	 * TODO make sure this is the right place for padding
	 */
	getGrid() {

		// loop starts
		let xStart = 0
		let yStart = 0

		// loop increments
		let xInc = this.cw;
		let yInc = this.ch;

		// loop ends -> adding a pixels so grid fills
		// TODO figure this out
		let xEnd = this._width+1;
		let yEnd = this._height+1;

		// if (this._padding) {
		// }

		// loop changes depending on axis
		const coords = [];
		if (this._axis === 'x') {
			// need a flag for offset
			let isOffset = false;

			// loop over y increments
			for (let y = yStart; y <= yEnd; y += yInc) {
				const row = []; // row array

				// loop over x increments
				for (let x = xStart; x <= xEnd; x += xInc) {
					// copy for offset
					let dx = x;
					// test for if row is offset
					if (isOffset) {dx = dx+this.offset;}
					row.push({x: dx, y: y});
				}
				coords.push(row);
				isOffset = isOffset ? false : true;
			}
		} else {
			// offset flag
			let isOffset = false;
			for (let x = xStart; x <= xEnd; x += xInc) {
				const col = [];
				for (let y = yStart; y <= yEnd; y += yInc) {
					// copy for offset
					let dy = y;
					// test for if col is offset
					if (isOffset) {dy = dy+this.offset;}
					col.push({x: x, y: dy});
				}
				coords.push(col);
				isOffset = isOffset ? false : true;
			}
		}
		this.grid = coords;
		return this;
	}

	// _isAliveTest() {
	// 	if (this.)
	// }
	// THIS DEFO NEEDS TO BE ONE LAYER UP -> ALL OF THE DISTRIB STUFF

	/**
	 * Returns a val between 0-1 as to how alive a point is depending on distribution
	 * @param  {int}  d          dx or dy index
	 * @param  {Boolean} x       Whether we're working on x or y axis
	 * @return {float} 1 is defo alive, 0.5 is 50:50, 0 is defo dead
	 */
	
	// new way
	// point = pixel position of x or y coord
	// x: we are currently passing an x point. Set to false for y
	// TODO add falloff
	_aliveChance(point, x = true) {

		// we need to know the starting pixel
		let startingPx = this.height * this.dis.y;

		// what's the furthest away we can be
		let maxAway = Math.max(startingPx, this.height - startingPx);

		let falloff = this.falloff.y;

		// reassign for x axis
		if (x) {
			startingPx = this.width * this.dis.x;
			maxAway = Math.max(startingPx, this.width - startingPx);
			falloff = this.falloff.x;
			// falloff = Math.pow(this.falloff.x, 2)-0.2;
		}

		// how far away from that is our current position
		let howFar = point > startingPx ? point - startingPx : startingPx - point;

		// normalise how far away current pos as a value between 0-1
		// mapped on how far away you could possibly be
		let chance = utils.smoothstep(0, maxAway, howFar);
		// chance = chance + falloff;

		let isAlive = chance;

		// isAlive = isAlive-chance;
		return isAlive;
	}

	generateCoords() {

		this.grid.forEach((arr, dy) => {

			arr.forEach((coord, dx) => {

				// set up whether to render el or not
				let isAlive = true;
				let chanceX = this._aliveChance(coord.x, true);
				let chanceY = this._aliveChance(coord.y, false);
				if ( utils.chance((chanceX + chanceY)/2) ) {
					isAlive = false;
				}


				// it's the chance of x AND y to be alive
				

				this.set([dx, dy], {
					x: coord.x, y: coord.y,
					isAlive: isAlive
				})
			})
		})

		// } else {

		// 	this.grid.forEach((arr, dx) => {
		// 		arr.forEach((coord, dy) => {
		// 			this.set([dx, dy], {
		// 				x: coord[0], y: coord[1],
		// 				// isAlive: isAlive
		// 			})
		// 		})
		// 	})
		// }

	}

	/**
	 * @description Spacing constant: Spacing by and large is controlled by the spacing option/property. This works for most general screens, however a constant is also exposed for more control. By default it's 80, more will work better with bigger screens, less for smaller ones..
	 * @param {int}
	 */
	get spacingConstant() {
		return this._spacingConstant;
	}
	set spacingConstant(val = 80) {
		this._spacingConstant = val;
	}

	/**
	 * @description Regenerate grid if any params change
	 * @private
	 */
	_generate() {
		this.getGrid();
		this.generateCoords();
	}

	/**
	 * @description as many properties take either a single value, array or can be set via .x / .y, this function tests for an array (at this time) and returns an object with x & y properties
	 * @private
	 */
	// TODO add test for an object
	_parseValToXy(val) {
		// if val is array, split up items and return x & y
		if (Array.isArray(val)) {
			return {
				x: val[0],
				y: val[1]
			}
		} else {
			return {
				x: val,
				y: val
			}
		}
	}
}

export default VizGrid;