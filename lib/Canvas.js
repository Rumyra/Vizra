/**
 * Canvas class
 * @description Envokes a new canvas 2d context with various properties & methods set up. Uses Typed OM not supported by Firefox, Safari & IE at time of writing
 */
class Canvas {
	/**
	 * @todo create options rather than different params
	 * @todo put @examples through here
	 * @param {string} [element = 'canvas'] string representing element: such as 'canvas' or '#screen'. It is optional, if nothing is set one of two things occurs, the instatiation will try to find a canvas element in the HTML, if it doesn't find one it will create one automatically.
	 * So for the most part don't bother setting anything! Let the class do the work.
	 * @description It's worth noting the canvas is wrapped in a div element due to dpr & sizing. This is given a class according to count in dom, and sized according to width & height. It is also exposed for further styling should you need it (see further docs).
	 * @param {*} [width = CSS.vw(100)] sets the viewed width of the canvas, defaults to full width of window. Takes a CSS value type only.
	 * @param {*} [height = CSS.vh(100)] sets the viewed height of the canvas, defaults to full height of window. Takes a CSS value type only.
	 * @description In the instance that width & height aren't specifed, one assumes a fullscreen canvas which resets styling on the body & html elements.
	 * @param {boolean} [resize = true] canvas sizes will resize if window is resized, draw will disappear atm though if no rqf is running
	 */
	constructor (element = undefined, width = undefined, height = undefined, resize = true) {

		// get or create a canvas element
		/**
		 * @todo make element be a string or a dom element
		 */
		this._passedEl = document.querySelector(element);
		this.elExists = true;

		this._canvas = this._makeCanvasEl();
		this.ctx = this._canvas.getContext('2d');

		this.wrapper = {};
		this.wrapper.element = this._appendCanvasEl();
		this.wrapper.CSSwidth = width;
		this.wrapper.CSSheight = height;

		/**
		 * @todo resize kills the drawing so let's make it optional (good for raf)
		 */
		this._setup();

		if (resize) {
			window.addEventListener("resize", () => {
				this._setSize();
			}, false);
		}

	}

	// =========== properties
	/**
	 * canvas
	 * @returns canvas element
	 */
	get canvas() {
		return this.ctx.canvas;
	}
	/**
	 * dpr
	 * @returns device pixel ratio
	 */
	get dpr() {
		return window.devicePixelRatio;
	}

	// width & height based on window
	/**
	 * width
	 * @description returns width of canvas (in pixels), based on device pixel ratio and wrapper element
	 * @returns width in pixels
	 */
	get width() {
		this._getWrapperDimensions();
		return this.wrapper.width * this.dpr;
	}
	/**
	 * height
	 * @description returns height of canvas (in pixels), based on device pixel ratio and wrapper element
	 * @returns height in pixels
	 */
	get height() {
		this._getWrapperDimensions();
		return this.wrapper.height * this.dpr;
	}
	/**
	 * centerX
	 * @description returns pixels to center of width
	 * @returns horizontal center in pixels
	 */
	get centerX() { return Math.floor(this.width/2); }
	/**
	* centerY
	* @description returns pixels to center of height
	* @returns vertical center in pixels
	*/
	get centerY() { return Math.floor(this.height/2); }

	/**
	* _setSize
	* @private
	* @description sets the canvas elements height & width
	* @returns this
	*/
	_setSize() {
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		return this;
	}
	/**
	* resize
	* @description resets height & width of the canvas if window is resized
	* @returns this
	*/
	resize() {
		window.addEventListener("resize", () => {
			this._setSize();
		}, false)

		return this;
	}

	/**
	* _setup
	* @private
	* @description sets CSS styles of dom elements, sets initial size of canvas, sets up initial canvas styling like linecap & linejoin
	* @returns this
	*/
	_setup() {
		this._styleWrapper()._canvasCSS();
		if (!this.elExists) {this._fullScreenStyles()};
		this._setSize();
		this.ctx.lineCap = 'round';
		this.ctx.lineJoin = 'round';

		return this;
	}

	/**
	 * @todo get pointerX get pointerY
	 */

	// ================== create canvas
	/**
	 * _makeCavasEl
	 * @private
	 * @description Set's the canvas element. If it's specified, if it's found in the DOM or creates one
	* @returns canvas element
	 */
	_makeCanvasEl() {
		let canvasEl;

		// if canvas el is passed in
		if (this._passedEl) {
			canvasEl = this._passedEl;
		} else { // if no element specified
			// get first canvas from DOM
			canvasEl = document.querySelector('canvas');
			// if nothing is there create canvas el
			if (!canvasEl) {
				this.elExists = false;
				canvasEl = document.createElement('canvas');
			}
		}

		return canvasEl;
	}

	/**
	 * _appendCanvasEl
	 * @private
	 * @description appends canvas to div wrapper and div wrapper to whatever parent element is either found, or to body if canvas el is getting created. Returns wrapper.
	* @returns wrapper element
	 */
	_appendCanvasEl() {

		let parentEl;
		// if canvas already exists, get parent element and remove child to be replaced later
		if (this.elExists) {
			parentEl = this._canvas.parentElement;
			parentEl.removeChild(this._canvas)
		} else { // otherwise parent is body
			parentEl = document.querySelector('body');
		}

		// create a wrapper el & append canvas
		const wrapper = document.createElement('div');
		wrapper.classList.add(this._getWrapperClass());
		wrapper.appendChild(this._canvas);
		// append wrapper to parent
		parentEl.appendChild(wrapper);

		return wrapper;
	}

	/**
	 * _getWrapperClass
	 * @private
	 * @description creates a class for the wrapping div element, based on divs already in dom. canvas-1, canvas-2 etc...
	* @returns class as string
	 */
	_getWrapperClass() {
		const allWrappers = document.querySelectorAll("div[class^='canvas-']");
		return `canvas-${allWrappers.length + 1}`
	}

	// ================== style & dimensions


	/**
	 * _styleWrapper
	 * @private
	 * @description adds CSS width & height styles to wrapper based on instatiation of class. If no arguments are passed in, set to full width & height of window
	 * @returns this
	 */
	_styleWrapper() {
		if (this.wrapper.element.attributeStyleMap) {
			this.wrapper.element.attributeStyleMap.set('width', this.wrapper.CSSwidth ? this.wrapper.CSSwidth : CSS.vw(100));
			this.wrapper.element.attributeStyleMap.set('height', this.wrapper.CSSheight ? this.wrapper.CSSheight : CSS.vh(100));
		} else {
			this.wrapper.element.style.width = '100vw';
			this.wrapper.element.style.height = '100vh';
		}


		return this;
	}

/**
 * _getWrapperDimensions
 * @private
 * @description sets the pixel width and height of the wrapper element
 * @returns this
 */
	_getWrapperDimensions() {
		this.wrapper.width = this.wrapper.element.getBoundingClientRect().width;
		this.wrapper.height = this.wrapper.element.getBoundingClientRect().height;

		return this;
	}

/**
 * _canvasCSS
 * @private
 * @description sets canvas to be 100% width and height so dpr works
 * @returns this
 */
	_canvasCSS() {
		if (this.canvas.attributeStyleMap) {
			this.canvas.attributeStyleMap.set('width', CSS.percent(100));
			this.canvas.attributeStyleMap.set('height', CSS.percent(100));
		} else {
			this.canvas.style.width = '100%';
			this.canvas.style.height = '100%';
		}


		return this;
	}

/**
* _fullScreenStyles
* @private
* @description removes padding & margin on html and body for fullscreen canvas
* @returns this
*/
	_fullScreenStyles() {
		document.querySelector('body').style.padding = '0px';
		document.querySelector('body').style.margin = '0px';
		document.querySelector('html').style.padding = '0px';
		document.querySelector('html').style.margin = '0px';

		return this;
	}

/**
* clear
* @param {string} ['black' | CSS colour val]
* @description Clears the canvas & fills in a 'background' rectangle with the colour specified. Defaults to black.
* @returns this
*/
	clear(bkCol = 'black') {
		this.ctx.clearRect(0,0, this.width, this.height);
		this.ctx.fillStyle = bkCol;
		this.ctx.fillRect(0,0, this.width, this.height);

		return this;
	}

/**
* dataURL
* @param {string} [png/jpg/webp] image type
* @param {number} [0.92] quality
* @description Returns a data url of whatever is on the canvas
* @returns data url
*/
	dataURL(type = 'png', quality = 0.92) {
		return this.canvas.toDataURL();
	}
/**
* createFile
* @param {string} [png/jpg/webp] image type
* @param {number} [0.92] quality
* @description Creates a link and adds to the DOM which allows image download of whatever is on canvas
* @return this
* @todo style the button and position it
*/
	createFile(type = 'png', quality = 0.92) {
		const callback = function (blob) {
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.innerText = 'canvas image';
			link.download = 'download';
			document.querySelector('body').append(link);
		}

		const data = this.canvas.toBlob(callback, type, quality);

		return this;
	}

}

export default Canvas;