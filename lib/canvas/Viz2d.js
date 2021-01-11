/**
 * Screen class
 * @description creates a fullscreen context using VizCanvas, with added context setup and methods for clearing screen, adding pattern fills, saving etc...
 */

import utils from '../utils.js';
import VizCanvas from './VizCanvas.js';

class Viz2d extends VizCanvas {

	constructor(opts) {
		super(opts);

		this.cx = this.width / 2;
		this.cy = this.height / 2;

		this.ctx = this.element.getContext('2d');

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