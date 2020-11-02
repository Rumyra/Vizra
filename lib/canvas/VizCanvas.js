/**
 * Canvas class
 * @description sets up a canvas dom element, with correct dpr and resizing (this means it also adds a wrapping div element)
 * @returns Canvas object:
 *   canvas = {
 * 		element: canvas element set to right dimensions (see cx & cy)
 * 		width: set this in CSS size, returns in correct pixels inc dpr
 * 		height: set this in CSS size, returns in correct pixels inc dpr
 * 		wrapper: canvas' wrapper div element for sizing
 *   }
 * @param {object} [options] takes an options object with the following properties:
 * element: undefined - can be string selector or dom element, either of which already exists in the dom. If nothing is set a fullscreen canvas will be constructed and added to the dom
 * width: undefined - can be a integer or CSS unit value. If nothing is set will default to 100vw
 * height: undefined - can be a integer or CSS unit value. If nothing is set will default to 100vh
 * resize: true - allows for canvas resize on window resize.
 */

class VizCanvas {
	constructor({ element = undefined, width = undefined, height = undefined, resize = true } = {}) {

		this._width = width; // our wrapper width
		this._height = height; // our wrapper height

		this._resize = resize;

		this.wrapper = this._makeWrapper();
		this.element = this._makeElement(element);

		this.init();

	}

	get dpr() {
		return window.devicePixelRatio;
	}

	/**
	 * get width
	 * @returns canvas width in pixels including dpr
	 */
	get width() {
		return this.wrapper.getBoundingClientRect().width * this.dpr;
	}
	/**
	 * set width
	 * @description sets width of canvas
	 * @param {*} [size = '100vw'] Can be an integer which will be set as pixels or a string CSS unit val
	 * @example Canvas.width = 200;
	 * @returns this
	 */
	set width(size = '100vw') {

		// set the size of the wrapper (canvas is always 100%)
		this.wrapper.style.width = size;

		return this;
	}

	/**
	 * get height
	 * @returns canvas height in pixels including dpr
	 */
	get height() {
		return this.wrapper.getBoundingClientRect().height * this.dpr;
	}
	/**
	 * set height
	 * @description sets height of canvas
	 * @param {*} [size = '100vw'] Can be an integer which will be set as pixels or a string CSS unit val
	 * @example Canvas.height = 200;
	 * @returns this
	 */
	set height(size = '100vh') {

		// set the size of the wrapper (canvas is always 100%)
		this.wrapper.style.height = size;

		return this;
	}

	/**
	 * _makeWrapper
	 * @description creates a wrapping div, adds a class and sets the css size
	 * @returns wrapper div
	 */
	_makeWrapper() {
		// create a div
		const wrapper = document.createElement('div');

		// create a class for the div
		const divClass = `viz-canvas-${document.querySelectorAll("div[class^='viz-canvas']").length}`;
		wrapper.classList.add(divClass);

		// set our CSS styles based on input
		wrapper.style.width = this._width ? this._width : '100vw';
		wrapper.style.height = this._height ? this._height : '100vh';

		return wrapper;
	}

	/**
	 * _makeElement
	 * @description creates a canvas element depending on type of param
	 * @returns the canvas element
	 */
	_makeElement(element) {

		// first try to find one from the dom
		let canvasElem = document.querySelector('canvas');
		this._elExists = true;

		// else make one
		if (!canvasElem) {

			if (element === undefined) {
				// if no element was passed in
				canvasElem = document.createElement('canvas');
			} else if (typeof element === 'string' || element instanceof String) {
				// if a string was entered
				canvasElem = document.querySelector(element);
			} else {
				// otherwise it's already a dom elem
				canvasElem = element;
			}

		}

		// set our CSS styles
		canvasElem.style.display = 'block';
		canvasElem.style.width = '100%';
		canvasElem.style.height = '100%';

		return canvasElem;
	}

	// set the absolute pixels of the canvas based on
	/**
	 * sizeCanvas()
	 * @description sets the pixel width and height for the canvas element, taking into account dpr. Can be used for resize elsewhere
	 * @returns this
	 */
	sizeCanvas() {
		this.element.width = this.width;
		this.element.height = this.height;
		return this;
	}

	/**
	 * init()
	 * @description initialises the canvas by appending to the wrapper and then to the dom. Also sets up resize if true
	 * @returns this
	 */
	init() {

		// find out if our element _has_ a parent (it won't have if we created it)
		let parentEl = this.element.parentElement;
		if (!parentEl) {
			// if it doesn't have a parent, make it the body
			parentEl = document.querySelector('body');
			// also set fullscreen styles
			parentEl.style.padding = '0px';
			parentEl.style.margin = '0px';
			document.querySelector('html').style.padding = '0px';
			document.querySelector('html').style.margin = '0px';
			// append to dom
			this.wrapper.appendChild(this.element);
			parentEl.appendChild(this.wrapper);
		} else {
			// append to dom
			this.wrapper.appendChild(this.element);
			parentEl.replaceChild(this.wrapper, this.element);
		}

		// size
		this.sizeCanvas();
		if (this._resize) {
			window.addEventListener("resize", () => {
				this.sizeCanvas();
			}, false);
		}
		return this;
	} // init

} // VizCanvas

export default VizCanvas;