import vizraUtils from '../vizraUtils.js';
import VizraVector from '../physics/VizraVector.js';

// all shapes have dimensions: dim{} and styles: style{} passed in
// all have an extra shape specific options{}
// all have an appropriate starting size, are drawn from centre, scalable
// all return their shape as a 2DPath object


// creates a canvas shape
// TODO you could add a gradient method here this.gradient
// TODO add transforms
// TODO you don't need to add everything into the constructor - you can do that thing with static/setters - that way everything can easily have a default

// class Viz {
// 	constructor(position, palette, shape) {
// 		this.position = position;
// 		this.palette = palette;
// 		this.shape = shape;
// 	}

// 	set position(vector) {
// 		return this.position = vector;
// 	}

// }

// symbol takes an array of shapes and draws them
// exposes scale, position and rotation for each shape _and_ itself
// think of each shape like a colour
// maybe you can't control the animation of shapes inside symbols - only that they _do_ animate over time

// GET AUDIO AND MIDI WORKING

// returns a drawing of a symbol, positioned, coloured, scaled
class VizraShape {
	// path is a Path2D object -> this may have to be VizraShape with colours
	// position is a vizra vector
	// palette is a colour scheme
	constructor(position, path, palette) {
		this.position = position;
		this.path = path;
		this.fill = palette.back.hsla;
		this.stroke = palette.fore.hsla;

		this.scale = new VizraVector(1, 1);
		this.strokeWidth = 0.0;

		this.offset = {x: 1, y: 1};

	}

	set rotate(deg) {
		let rads = vizraUtils.degToRad(deg);
		return this._rotate = rads;
	}

	get rotate() {
		return this._rotate;
	}

	draw(context) {
		context.save();

		context.fillStyle = this.fill;
		context.lineWidth = this.strokeWidth;
		context.strokeStyle = this.stroke;

		context.translate(this.position.x-(this.offset.x*this.scale.x), this.position.y-(this.offset.y*this.scale.y));
		// ctx.translate(position.x-(107*scale), position.y-(122*scale));
		context.rotate(this.rotate);
		context.scale(this.scale.x, this.scale.y);

		context.fill(this.path);
		context.stroke(this.path);

		context.resetTransform();
		context.restore();
	}

}

// let's just stick with an object that returns 2DPaths - I'll refactor Vizra - there's an element here for an over-riding library (RAH) which has draw, canvas, maybe colours - anything shared between the two -> or just encorporate Phyzra into Vizra eventually

// every shape has x, y, height, width,
// also every shape needs to be held in memory - rather than being drawn in every frame - what is the best way of doing this?


export default VizraShape;



// const vizraDraw = {
// 	style: function(context, fill, stroke, strokeWidth) {
// 		context.fillStyle = fill;
// 		context.lineWidth = strokeWidth;
// 		context.strokeStyle = stroke;
// 	},
// 	// you have to set all the options if you pass them in as a straight object
// 	rectangle: function(context, {x=0, y=0, width=100, height=200, scale=2, fill='black', stroke='white', strokeWidth='2.0'}={}) {

// 		this.style(context, fill, stroke, strokeWidth);

// 		// context.translate(-( (width/2)*scale), y-( (height/2)*scale));
// 		// context.scale(scale, scale);
// 		width = width*scale;
// 		height = height*scale;

// 		let path = new Path2D();
// 		// outline
// 		path.moveTo( x+(width/2), y-(height/2) );
// 		path.lineTo( x+(width/2), y+(height/2) );
// 		path.lineTo( x-(width/2), y+(height/2) );
// 		path.lineTo( x-(width/2), y-(height/2) );
// 		path.closePath();

// 		context.resetTransform();
// 		context.stroke(path);
// 		context.fill(path);

// 		return path;
// 	},
// 	circle: function(context, {x=0, y=0, width=100, height=200, scale=2, fill='black', stroke='white', strokeWidth='2.0', startAngle=0, endAngle=360}={}) {

// 		this.style(context, fill, stroke, strokeWidth);

// 		const startRad = vizraUtils.degToRad(startAngle);
// 		const endRad = vizraUtils.degToRad(endAngle);
// 		width = width*scale;
// 		height = height*scale;

// 		let path = new Path2D();
// 		path.arc(x, y, width/2, startRad, endRad)
// 		path.closePath();

// 		context.stroke(path);
// 		context.fill(path);

// 		return path;
// 	},
// 	// this one is going to start in the center
// 	cross: function(context, {x=0, y=0, width=100, height=200, scale=2, fill='black', stroke='white', strokeWidth='2.0', thickness=5}={}) {

// 		this.style(context, fill, stroke, strokeWidth);

// 		const halfThickness = thickness/2;
// 		width = width*scale;
// 		height = height*scale;

// 		let path = new Path2D();
// 		path.moveTo(x-halfThickness, y-(height/2));
// 		path.lineTo(x-halfThickness, y-halfThickness);
// 		path.lineTo(x-(width/2)-halfThickness, y-halfThickness);
// 		path.lineTo(x-(width/2)-halfThickness, y+halfThickness);
// 		path.lineTo(x-halfThickness, y+halfThickness);
// 		path.lineTo(x-halfThickness, y+(height/2));
// 		path.lineTo(x+halfThickness, y+(height/2));
// 		path.lineTo(x+halfThickness, y+halfThickness);
// 		path.lineTo(x+(width/2), y+halfThickness);
// 		path.lineTo(x+(width/2), y-halfThickness);
// 		path.lineTo(x+halfThickness, y-halfThickness);
// 		path.lineTo(x+halfThickness, y-(height/2));
// 		path.closePath();

// 		context.fill(path);
// 		context.stroke(path);

// 		return path;
// 	},
// 	// ************
// 		// draw a diamond: style can be blank, grid, sliced or lined
// 	diamond: function(context, x, y, width, height, fillStyle, strokeStyle = 'white', strokeWidth = 1.0, style = 'blank') {

// 		let size = width;

// 		context.fillStyle = fillStyle;
// 		context.lineWidth = strokeWidth;
// 		context.strokeStyle = strokeStyle;

// 		// outline
// 		context.beginPath();
// 		// context.rect(x, y, size, size);
// 		context.moveTo(x, y);
// 		context.lineTo(x+(width/2), y+(height/2));
// 		context.lineTo(x, y+height);
// 		context.lineTo(x-(width/2), y+(height/2));
// 		context.lineTo(x, y);
// 		context.fill();

// 		if (style === 'grid' || style === 'sliced') {
// 			// grid lines
// 			context.moveTo(x+(width/4), y+(height/4));
// 			context.lineTo(x-(width/4), y+(height*0.75));
// 			context.moveTo(x-(width/4), y+(height/4));
// 			context.lineTo(x+(width/4), y+(height*0.75));

// 			if (style === 'sliced') {
// 				// diagonal lines
// 				context.moveTo(x, y);
// 				context.lineTo(x, y+height);
// 				context.moveTo(x-(width/2), y+(height/2));
// 				context.lineTo(x+(width/2), y+(height/2));
// 			}
// 		}

// 		context.stroke();
// 		context.closePath();
// 	},
// 	// ************

// 	// context = context, x = coord, y = coord, width = width, height = height, fillStyle = fillStyle, percentageBlock = how much of the rectangle is filled: float 0-1 percentage, thickThin = how thick or thin the lines are int pixels
// 	diaLineRect: function(context, x, y, width, height, fillStyle, strokeStyle = 'white', strokeWidth = 1.0, percentageBlock = 0.5, thickThin = 10) {

// 		let block = width*percentageBlock;

// 		context.fillStyle = fillStyle;
// 		// outline
// 		context.beginPath();
// 		context.moveTo(x, y);
// 		context.lineTo(x+block, y);
// 		context.lineTo(x+block+height, y+height);
// 		context.lineTo(x, y+height);
// 		context.lineTo(x, y);
// 		context.closePath();
// 		context.fill();

// 		let totalLines = Math.floor( (width*(1-percentageBlock))/thickThin );

// 		for (let i=1; i<totalLines; i+=2) {
// 			context.beginPath();
// 			context.moveTo(x+block+(i*thickThin), y);
// 			context.lineTo(x+block+(i*thickThin)+thickThin, y);
// 			context.lineTo(x+block+(i*thickThin)+thickThin+height, y+height);
// 			context.lineTo(x+block+(i*thickThin)+height, y+height);
// 			context.lineTo(x+block+(i*thickThin), y);
// 			context.closePath();
// 			context.fill();
// 		}

// 	}, // diaLineRect
// 	// ************

// 	lantern: function(context, x, y, width, height, fillStyle, strokeStyle, strokeWidth, insideLines = true) {

// 		context.fillStyle = fillStyle;
// 		context.strokeStyle = strokeStyle;
// 		context.lineWidth = strokeWidth;
// 		// context.translate(position.x-(186*width), position.y-(150*height));
// 		context.translate(x-113.75-35, y-8-35);
// 		// context.scale(width, height);

// 		context.beginPath();
// 		context.moveTo(186,44);
// 		context.bezierCurveTo(186,24,150,28,150,8);
// 		context.bezierCurveTo(150,28,114,24,114,44);
// 		context.bezierCurveTo(114,64,150,60,150,80);
// 		context.bezierCurveTo(150,60,186,64,186,44);
// 		context.closePath();
// 		context.fill();
// 		context.stroke();
// 		// context.restore();
// 		// context.save();
// 		if (insideLines) {
// 			context.beginPath();
// 			context.moveTo(150,10);
// 			context.bezierCurveTo(150,30,120,28,120,48);
// 			context.stroke();
// 			context.beginPath();
// 			context.moveTo(150,10);
// 			context.bezierCurveTo(150,30,128,32,128,52);
// 			context.stroke();
// 			context.beginPath();
// 			context.moveTo(150,10);
// 			context.bezierCurveTo(150,30,136,38,136,58);
// 			context.stroke();
// 			context.beginPath();
// 			context.moveTo(150,10);
// 			context.bezierCurveTo(150,30,144,42,144,62);
// 			context.stroke();
// 			context.beginPath();
// 			context.moveTo(150,10);
// 			context.bezierCurveTo(150,30,180,28,180,48);
// 			context.stroke();
// 			context.beginPath();
// 			context.moveTo(150,10);
// 			context.bezierCurveTo(150,30,172,32,172,52);
// 			context.stroke();
// 			context.beginPath();
// 			context.moveTo(150,10);
// 			context.bezierCurveTo(150,30,164,38,164,58);
// 			context.stroke();
// 			context.beginPath();
// 			context.moveTo(150,10);
// 			context.bezierCurveTo(150,30,156,42,156,62);
// 			context.stroke();
// 		}
// 		context.resetTransform();
// 	},
// 	// ************

// 	swoosh: function(context, x, y, width, height, fillStyleOne, fillStyleTwo, strokeStyle = 'white', strokeWidth = 1.0) {

// 		// main shape
// 		context.fillStyle = fillStyleOne;
// 		context.beginPath();
// 		context.moveTo(x, y);
// 		context.bezierCurveTo(x+(width/3), -(height/3), x+(width/2), height, x+width, y);
// 		context.lineTo(x+width, y+(height*2));
// 		context.lineTo(x, y+(height*2));
// 		context.lineTo(x, y);
// 		context.closePath();
// 		context.fill();

// 		// flash
// 		context.fillStyle = fillStyleTwo;
// 		context.beginPath();
// 		context.moveTo(x, y+10);
// 		context.bezierCurveTo(width/3, -(height/3)+10, (width*0.75), height+10, x+(width-5), y-5);
// 		context.bezierCurveTo(width*0.75, height+10, width/3, -height/3+20, x, y+20);
// 		context.lineTo(x, y+10);
// 		context.closePath();
// 		context.fill();

// 		// top swoosh
// 		context.fillStyle = fillStyleTwo;
// 		context.beginPath();
// 		context.moveTo(x+(width/4), y-(height/4));
// 		context.bezierCurveTo(width/2, -(height/4)+10, width*0.8, height, width, y);
// 		context.bezierCurveTo(width*0.8, height+10, width/2, -(height/4)+20, x+(width/4), y-(height/4));
// 		context.closePath();
// 		context.fill();

// 	} // swoosh
// }

// export default vizraDraw;