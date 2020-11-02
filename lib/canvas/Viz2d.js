/**
 * Screen class
 * @description creates a fullscreen context using VizCanvas, with added context setup and methods for clearing screen, adding pattern fills, saving etc...
 */

import utils from '../utils.js';
import VizCanvas from './VizCanvas.js';

class Viz2d extends VizCanvas {

	constructor(opts) {
		super(opts)

		this.cx = this.width / 2;
		this.cy = this.height / 2;

		this.ctx = this.element.getContext('2d');

	}

	// patterns: dotted, lines (with deg), checkered

	/**
	 * dots()
	 * @param [int] size in pixels
	 * @description returns a dot pattern fill where outer square is size and dot is relative
	 * @returns canvas fill
	 */
	dots(size=10, dotCol='white', bkCol='black') {
		const offCan = new OffscreenCanvas(size, size);
		const offCtx = offCan.getContext('2d');
		offCtx.fillStyle = bkCol;
		offCtx.fillRect(0, 0, size, size);
		offCtx.fillStyle = dotCol;
		offCtx.arc(size / 2, size / 2, (size * 0.5) / 2, 0, utils.degToRad(360));
		offCtx.fill();
		console.log( this.ctx.createPattern(offCan, 'repeat'));
		return this.ctx.createPattern(offCan, 'repeat');
	}

	// let's just start with vertical and see how we go
	lines(size=10, lineCol='white', bkCol='black	') {
		const offCan = new OffscreenCanvas(size, size);
		const offCtx = offCan.getContext('2d');
		offCtx.fillStyle = bkCol;
		offCtx.fillRect(0, 0, size, size);
		offCtx.fillStyle = lineCol;
		offCtx.fillRect(0, 0, size/2, size);
		return this.ctx.createPattern(offCan, 'repeat');
	}

	// gradient
	gradient(size = 10, colOne = 'white', colTwo = 'black') {
		const gradient = this.ctx.createLinearGradient(0, 0, size, -size);
		gradient.addColorStop(0, colOne);
		gradient.addColorStop(1, colTwo);
		return gradient;
	}

	// clear screen
	/**
* clear
* @param {string} ['black' | CSS colour val]
* @description Clears the canvas & fills in a 'background' rectangle with the colour specified. Defaults to black.
* @returns this
*/
	clear(bkCol = 'black') {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.fillStyle = bkCol;
		this.ctx.fillRect(0, 0, this.width, this.height);

		return this;
	}

	// save functionality
	/**
* dataURL
* @param {string} [png/jpg/webp] image type
* @param {number} [0.92] quality
* @description Returns a data url of whatever is on the canvas
* @returns data url
*/
	dataURL(type = 'png', quality = 0.92) {
		return this.element.toDataURL();
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

export default Viz2d;