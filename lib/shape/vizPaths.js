import utils from '../utils.js';

// TODO we need to take the params from Shape and make sure path can access them 🤔
// paths could take options from shape
// maybe shape could be extended to be circle square etc...

/**
 * Vizra Paths Library
 * A bunch of path drawing functions - each returns a Path2D object, starts from (0, 0) which is it's centre
 * @type {Object}
 * @author Ruth John
 * @copyright 2019 Ruth John
 * @namespace
 */

const paths = {

	// radial shape: points, radius, innerRad (if set make a star)
	polar: function (size = 100, sides = 4, innerRadius) {
		const polarPath = new Path2D();

		// set side count, radius and theta based on whether there's an inner radius or not
		let sideCount = !innerRadius ? sides : (sides * 2);

		for (let i = 0; i < sideCount; i++) {
			const theta = utils.degToRad(i * (360 / sideCount));
			let radius = size / 2;
			// if innerRadius is set then reduce radius every other point
			if (innerRadius && (i%2 === 1)) {
				radius = innerRadius / 2;
			}

			if (i === 0) {
				polarPath.moveTo(
					(radius * Math.cos(0)),
					(radius * Math.sin(0))
				)
			} else {
				polarPath.lineTo(
					(radius * Math.cos(theta)),
					(radius * Math.sin(theta))
				);
				// if ((i === sideCount) && half) { break; }
			}
		}
		polarPath.closePath();
		return polarPath;
	},

	line: function (x1, y1, x2, y2) {
		const linePath = new Path2D();

		linePath.moveTo(0, 0);
		linePath.lineTo(x2 - x1, y2 - y1);
		linePath.closePath();

		return linePath;
	},

	/**
	 * @param {int} radius half full size of circle
	 * @param {int} arcFrom start
	 * @param {int} arcTo end
	 * @param {boolean} anticlockwise default is false
	 */
	circle: function(radius = 50, arcFrom = 0, arcTo = 360, anticlockwise = false) {
		let radFrom = utils.degToRad(arcFrom);
		let radTo = utils.degToRad(arcTo);

		const circlePath = new Path2D();
		circlePath.arc(0, 0, radius, radFrom, radTo, anticlockwise);

		return circlePath;
	},
	/**
	 *
	 * @param {int} width pixels
	 * @param {int} height pixels
	 * @param {int} rotation degrees
	 * @param {int} arcFrom degrees
	 * @param {int} arcTo degreed
	 * @param {boolean} anticlockwise set false by default
	 */
	ellipse: function (width = 100, height = 150, rotation = 0, arcFrom = 0, arcTo = 360, anticlockwise = false) {
		let radFrom = utils.degToRad(arcFrom);
		let radTo = utils.degToRad(arcTo);

		const ellipsePath = new Path2D();
		ellipsePath.arc(0, 0, width, height, radius, radFrom, radTo, anticlockwise);

		return ellipsePath;
	},
	/**
	 *
	 * @param {int} width pixels
	 * @param {int} height pixels
	 */
	rectangle: function(width = 100, height = 100) {
		const rectPath = new Path2D();
		// outline
		rectPath.moveTo( width/2, height/2 );
		rectPath.lineTo( -width/2, height/2 );
		rectPath.lineTo( -width/2, -height/2 );
		rectPath.lineTo( width/2, -height/2 );
		rectPath.closePath();

		return rectPath;
	},
	/**
	 *
	 * @param {int} width pixels
	 * @param {int} height pixels
	 * @param {int} thickness pixels how 'thick' the cross is
	 */
	cross: function(width = 100, height = 100, thickness = 5) {

		const halfThickness = thickness/2;

		const xPath = new Path2D();
		xPath.moveTo(-halfThickness, -(height/2));
		xPath.lineTo(-halfThickness, -halfThickness);
		xPath.lineTo(-(width/2)-halfThickness, -halfThickness);
		xPath.lineTo(-(width/2)-halfThickness, halfThickness);
		xPath.lineTo(-halfThickness, halfThickness);
		xPath.lineTo(-halfThickness, (height/2));
		xPath.lineTo(halfThickness, (height/2));
		xPath.lineTo(halfThickness, halfThickness);
		xPath.lineTo((width/2), halfThickness);
		xPath.lineTo((width/2), -halfThickness);
		xPath.lineTo(halfThickness, -halfThickness);
		xPath.lineTo(halfThickness, -(height/2));
		xPath.closePath();

		return xPath;
	},
	/**
	 * @description no params, just a heart
	 */
	heart: "M0,58.097c0.004-15.985,12.918-28.966,28.904-29.048C28.628,13.283,41.184,0.278,56.95,0.005c0.286-0.006,0.57-0.006,0.856-0.002c16.328-0.062,28.61,12.159,29.051,29.694l0.14,56.329l-56.329,0.138 C12.718,87.021,0.041,74.404,0,58.097",

	/**
	 *
	 * @param {string} style 'plain', 'grid' or 'sliced'
	 * @param {int} width pixels
	 * @param {int} height pixels
	 */
	diamond: function(style = 'plain', width = 100, height = 100) {

		// outline
		const diaPath = new Path2D();
		// context.rect(x, y, size, size);
		diaPath.moveTo(width/2, 0);
		diaPath.lineTo(0, height/2);
		diaPath.lineTo(-width/2, 0);
		diaPath.lineTo(0, -height/2);
		diaPath.lineTo(width/2, 0);

		if (style === 'grid' || style === 'sliced') {
			// grid lines
			diaPath.moveTo(width/4, height/4);
			diaPath.lineTo(-(width/4), -height/4);
			diaPath.moveTo(width/4, -height/4);
			diaPath.lineTo(-width/4, height/4);

			if (style === 'sliced') {
				// diagonal lines
				diaPath.moveTo(width/2, 0);
				diaPath.lineTo(-width/2, 0);
				diaPath.moveTo(0, -height/2);
				diaPath.lineTo(0, height/2);
			}
		}
		diaPath.closePath();

		return diaPath;
	},
	/**
	 *
	 * @param {int} width pixels
	 * @param {*} height pixels height will be half
	 * @description draws a half diamond pointing down
	 */
	halfDiamond: function(width = 100, height = 100) {

		const halfDiaPath = new Path2D();

		halfDiaPath.moveTo(width/2, 0);
		halfDiaPath.lineTo(0, height/2);
		halfDiaPath.lineTo(-width/2, 0);
		halfDiaPath.closePath();

		return halfDiaPath;
	},
	/**
	 * @description returns a curved ended cross, no allowance for adjustment
	 */
	curvedCross: "M72.542,30.792h-22.14V9.057c0-5.002-3.997-9.057-9-9.057s-9,4.055-9,9.057v21.734H9.057c-5.002,0-9.057,4.497-9.057,9.5s4.055,9.5,9.057,9.5h23.345v22.75c0,5.003,3.997,9.058,9,9.058s9-4.055,9-9.058v-22.75h22.14c5.003,0,9.058-4.497,9.058-9.5S77.544,30.792,72.542,30.792z",

	/**
	 *
	 * @param {int} sideLength pixels
	 */
	hexagon: function(sideLength = 60) {

		const triSide = Math.floor(Math.cos(utils.degToRad(30))*sideLength);
		const half = Math.floor(sideLength/2);

	  const hexPath = new Path2D();

		hexPath.moveTo(0, 0);
	  hexPath.moveTo(-half, -triSide);
	  hexPath.lineTo(half, -triSide);
	  hexPath.lineTo(sideLength, 0);
	  hexPath.lineTo(half, triSide);
	  hexPath.lineTo(-half, triSide);
	  hexPath.lineTo(-sideLength, 0);
	  hexPath.closePath();

	  return hexPath;

  },
	/**
	 *
	 * @param {boolean} insideLines true by deafult
	 */
	lantern: function(insideLines = true) {

		const lanternPath = new Path2D();
		lanternPath.moveTo(186,44);
		lanternPath.bezierCurveTo(186,24,150,28,150,8);
		lanternPath.bezierCurveTo(150,28,114,24,114,44);
		lanternPath.bezierCurveTo(114,64,150,60,150,80);
		lanternPath.bezierCurveTo(150,60,186,64,186,44);
		lanternPath.closePath();

		if (insideLines) {
			lanternPath.moveTo(150,10);
			lanternPath.bezierCurveTo(150,30,120,28,120,48);
			lanternPath.moveTo(150,10);
			lanternPath.bezierCurveTo(150,30,128,32,128,52);
			lanternPath.moveTo(150,10);
			lanternPath.bezierCurveTo(150,30,136,38,136,58);
			lanternPath.moveTo(150,10);
			lanternPath.bezierCurveTo(150,30,144,42,144,62);
			lanternPath.moveTo(150,10);
			lanternPath.bezierCurveTo(150,30,180,28,180,48);
			lanternPath.moveTo(150,10);
			lanternPath.bezierCurveTo(150,30,172,32,172,52);
			lanternPath.moveTo(150,10);
			lanternPath.bezierCurveTo(150,30,164,38,164,58);
			lanternPath.moveTo(150,10);
			lanternPath.bezierCurveTo(150,30,156,42,156,62);
		}

		return lanternPath;
	}


}

export default paths;
