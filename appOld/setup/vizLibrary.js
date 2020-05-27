// function xTileOne() {
// 	let diamond = new Vizra.shape({x: 10, y: 10}, Vizra.paths.rectangle(), 'white', 'pink');
// 	diamond.draw(viz.screen.ctx);
// 	let crossOne = new Vizra.shape({x: 10, y: 10}, Vizra.paths.cross(), 'white', 'pink');
// 	crossOne.draw(viz.screen.ctx);
// 	let crossTwo = new Vizra.shape({x: 10, y: 10}, Vizra.paths.cross(), 'white', 'pink', {x: 0.5, y: 0.5}, 45);
// 	crossTwo.draw(viz.screen.ctx);
// }

import Vizra from '../../Vizra/Vizra.js';
import palettes from './palettes.js';
import grids from './coords.js';

const gridTest = new Vizra.coords('square', [18, 18], false);

const dots = new Vizra.viz(palettes[0], Vizra.paths.circle(4));
dots.debounce = 100;
dots.grid = gridTest;
dots.loop = function(state) {
	this.coords.forEach((el, i) => {
		this.shape.position = el;
		this.shape.draw(this.screen.ctx);
	})
}


export const asiaLion = new Vizra.viz(palettes[1], Vizra.paths.singaporeLion());
asiaLion.debounce = 25;
asiaLion.shape.strokeWidth = 3.0;
asiaLion.shape.stroke = asiaLion.palette.fore.hsla;
// asiaLion.shape2 = new Vizra.shape({x: 20, y: 20}, Vizra.paths.circle(), asiaLion.palette);
// asiaLion.shape2.strokeWidth = 10.0;
asiaLion.grid = grids.triGrid;
asiaLion.loop = function(state) {
	this.coords.forEach((el, i) => {

		// this.palette.setLums(state.bass);

		let colour = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];
		// let colour2 = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];

		if (state.bass > 50) {
			colour = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];
			// colour2 = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];
		}

		this.shape.offset = new Vizra.vector(102, 123);

		const percent = Math.random();
		// console.log(percent);
		const bassScale = new Vizra.vector((state.bass/127)+0.5, (state.bass/127)+0.5);

		if (percent > 0.7) {
			// this.shape.scale = bassScale.multiply(new Vizra.vector(2.0, 2.0));
			this.shape.scale = new Vizra.vector(0.4, 0.4);
		} else if (percent < 0.4) {
			this.shape.scale = new Vizra.vector(0.2, 0.2);
		} else {
			this.shape.scale = bassScale;
		}
		// this.shape.scale = bassScale;

		this.shape.position = el;
		// this.shape2.position = el;

		// if (i%2 === 0) {
		// 	this.shape2.fill = colour2;
		// 	this.shape2.stroke = 'transparent';
		// } else {
		// 	this.shape2.fill = 'transparent';
		// 	this.shape2.stroke = colour2;
		// }

		this.shape.fill = colour;

		if (percent > 0.5) {
			this.shape.draw(this.screen.ctx);
		}

		// this.shape2.draw(this.screen.ctx);

	}) // forEach
}

export const asiaDiamonds = new Vizra.viz(palettes[1], Vizra.paths.diamond('grid'));
asiaDiamonds.debounce = 25;
asiaDiamonds.shape.strokeWidth = 3.0;
asiaDiamonds.shape.stroke = asiaDiamonds.palette.fore.hsla;
// asiaDiamonds.shape2 = new Vizra.shape({x: 20, y: 20}, Vizra.paths.circle(), asiaDiamonds.palette);
// asiaDiamonds.shape2.strokeWidth = 10.0;
asiaDiamonds.grid = grids.diamondGrid;
asiaDiamonds.loop = function(state) {
	this.coords.forEach((el, i) => {

		// this.palette.setLums(state.bass);

		let colour = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];
		// let colour2 = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];

		if (state.bass > 50) {
			colour = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];
			// colour2 = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];
		}

		const percent = Math.random();
		// console.log(percent);
		const bassScale = new Vizra.vector((state.bass/127)+0.5, (state.bass/127)+0.5);

		if (percent > 0.8) {
			// this.shape.scale = bassScale.multiply(new Vizra.vector(2.0, 2.0));
			this.shape.scale = new Vizra.vector(1.6, 1.6);
		} else if (percent > 0.6) {
			this.shape.scale = new Vizra.vector(0.6, 0.6);
		} else {
			this.shape.scale = new Vizra.vector(1.0, 1.0);
		}
		// this.shape.scale = bassScale;

		this.shape.position = el;
		// this.shape2.position = el;

		// if (i%2 === 0) {
		// 	this.shape2.fill = colour2;
		// 	this.shape2.stroke = 'transparent';
		// } else {
		// 	this.shape2.fill = 'transparent';
		// 	this.shape2.stroke = colour2;
		// }

		this.shape.fill = colour;

		if (percent > 0.25) {
			this.shape.draw(this.screen.ctx);
		}

		// this.shape2.draw(this.screen.ctx);

	}) // forEach
}

export const lanterns = new Vizra.viz(palettes[1], Vizra.paths.lantern());
lanterns.debounce = 25;
lanterns.shape.strokeWidth = 2.0;
lanterns.shape.stroke = lanterns.palette.fore.hsla;
// lanterns.shape2 = new Vizra.shape({x: 20, y: 20}, Vizra.paths.circle(), lanterns.palette);
// lanterns.shape2.strokeWidth = 10.0;
lanterns.grid = grids.diamondGrid;
lanterns.loop = function(state) {
	this.coords.forEach((el, i) => {

		// this.palette.setLums(state.bass);

		let colour = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];
		// let colour2 = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];

		if (state.bass > 50) {
			colour = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];
			// colour2 = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];
		}

		// this.shape.offset = new Vizra.vector(102, 123);
		// context.translate(x-113.75-35, y-8-35);

		const percent = Math.random();
		// console.log(percent);
		const bassScale = new Vizra.vector((state.bass/127)+0.5, (state.bass/127)+0.5);

		if (percent > 0.8) {
			// this.shape.scale = bassScale.multiply(new Vizra.vector(2.0, 2.0));
			this.shape.scale = new Vizra.vector(1.6, 1.6);
		} else if (percent > 0.6) {
			this.shape.scale = new Vizra.vector(0.6, 0.6);
		} else {
			this.shape.scale = new Vizra.vector(1.0, 1.0);
		}
		// this.shape.scale = bassScale;

		this.shape.position = el;
		// this.shape2.position = el;

		// if (i%2 === 0) {
		// 	this.shape2.fill = colour2;
		// 	this.shape2.stroke = 'transparent';
		// } else {
		// 	this.shape2.fill = 'transparent';
		// 	this.shape2.stroke = colour2;
		// }

		this.shape.fill = colour;

		if (percent > 0.25) {
			this.shape.draw(this.screen.ctx);
		}

		// this.shape2.draw(this.screen.ctx);

	}) // forEach
}

export const hexagons = new Vizra.viz(palettes[2], Vizra.paths.hexagon());
hexagons.debounce = 2;
hexagons.shape.strokeWidth = 4.0;
// hexagons.shape2 = new Vizra.shape({x: 20, y: 20}, Vizra.paths.circle(), hexagons.palette);
// hexagons.shape2.strokeWidth = 10.0;
hexagons.grid = grids.diamondGrid;
hexagons.loop = function(state) {
	this.coords.forEach((el, i) => {

		// this.palette.setLums(state.bass);

		let colour = this.palette.hslaPalette[i%9];

		this.shape.stroke = colour;
		this.shape.offset = new Vizra.vector(30, 30);

		const percent = Math.random();
		// console.log(percent);
		const bassScale = new Vizra.vector((state.bass/127)+0.5, (state.bass/127)+0.5);

		this.shape.scale = bassScale;

		this.shape.position = el;

		// this.shape.fill = colour;

		if (percent > 0.25) {
			this.shape.draw(this.screen.ctx);
		}

		// this.shape2.draw(this.screen.ctx);

	}) // forEach
}

export const diamonds = new Vizra.viz(palettes[2], Vizra.paths.diamond('grid'));
diamonds.debounce = 2;
diamonds.shape.strokeWidth = 4.0;
// diamonds.shape2 = new Vizra.shape({x: 20, y: 20}, Vizra.paths.circle(), diamonds.palette);
// diamonds.shape2.strokeWidth = 10.0;
diamonds.grid = grids.diamondGrid;
diamonds.loop = function(state) {
	this.coords.forEach((el, i) => {

		// this.palette.setLums(state.bass);

		let colour = this.palette.hslaPalette[i%9];

		this.shape.stroke = colour;

		const percent = Math.random();
		// console.log(percent);
		const bassScale = new Vizra.vector((state.bass/127)+0.5, (state.bass/127)+0.5);

		this.shape.scale = bassScale;

		this.shape.position = el;

		// this.shape.fill = colour;

		if (percent > 0.25) {
			this.shape.draw(this.screen.ctx);
		}

		// this.shape2.draw(this.screen.ctx);

	}) // forEach
}

// ================================
const vizLibrary = [
	dots,
	asiaLion,
	asiaDiamonds,
	lanterns,
	hexagons,
	diamonds
	// heart,
	// liveJS,
	// festivalX,
	// liveJSheart,

	// festHeart,
	// festHeartBounce,
	// liveJSlogo,
	// liveJSlogoBounce,

	// xSquare,
	// xSquareSquare,
	// xSquareCircle,

	// basicSquare,
	// jseuCircle,
	// jseuHalfDia,
	// jseuCurveCross,
	// jseuCircSquare,
	// jseuSquare,
	// jseuLogo,
	// jseuArcs,

]


// const heart = new Vizra.viz(palettes[1], Vizra.paths.diamond());
// heart.debounce = 2;
// heart.grid = grids.halfCoords;
// heart.heart = new Vizra.shape({x: 10, y: 10}, Vizra.paths.heart(), heart.palette);
// heart.loop = function(state) {
// 	this.coords.forEach((el, i) => {

// 		this.shape.scale = new Vizra.vector((state.bass/127)+2, (state.bass/127)+2);
// 		this.heart.scale = new Vizra.vector((state.bass/127)+0.2, (state.bass/127)+0.2);

// 		// this.heart.offset = this.heart.scale;
// 		this.shape.position = el;
// 		this.heart.position = el;

// 		this.heart.offset = new Vizra.vector(40, 40);

// 		this.shape.fill = this.palette.hslaPalette[2];
// 		this.heart.fill = this.palette.hslaPalette[5];

// 		this.shape.draw(this.screen.ctx);

// 		this.heart.draw(this.screen.ctx);

// 	}) // forEach
// }

// const liveJS = new Vizra.viz(palettes[4], Vizra.paths.liveJS());
// liveJS.debounce = 2;
// liveJS.grid = grids.halfCoords;
// liveJS.shape.strokeWidth = 5.0;
// liveJS.loop = function(state) {
// 	this.coords.forEach((el, i) => {

// 		this.shape.scale = new Vizra.vector((state.bass/127)+1, (state.bass/127)+1);

// 		this.shape.offset = new Vizra.vector(157, 40);

// 		this.shape.position = el;

// 		this.shape.fill = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-2)];
// 		this.shape.stroke = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-2)];
// 		this.shape.draw(this.screen.ctx);

// 	}) // forEach
// }

// const festivalX = new Vizra.viz(palettes[2], Vizra.paths.festivalX());
// festivalX.debounce = 2;
// festivalX.grid = grids.halfCoords;
// festivalX.shape.strokeWidth = 0.0;
// festivalX.loop = function(state) {
// 	this.coords.forEach((el, i) => {

// 		this.shape.scale = new Vizra.vector((state.bass/127)+1, (state.bass/127)+1);

// 		this.shape.position = el;
// 		this.shape.offset = new Vizra.vector(186, 76);

// 		if (state.bass > 50) {
// 			this.shape.fill = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-2)];
// 		}

// 		this.shape.stroke = 'transparent';
// 		this.shape.draw(this.screen.ctx);

// 	}) // forEach
// }

// const liveJSheart = new Vizra.viz(palettes[4], Vizra.paths.liveJSheart());
// liveJSheart.debounce = 2;
// liveJSheart.grid = grids.halfCoords;
// liveJSheart.shape.strokeWidth = 5.0;
// liveJSheart.loop = function(state) {
// 	this.coords.forEach((el, i) => {

// 		this.shape.scale = new Vizra.vector((state.bass/127)+1, (state.bass/127)+1);

// 		this.shape.offset = new Vizra.vector(107, 122);

// 		this.shape.position = el;

// 		this.shape.fill = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-2)];
// 		this.shape.stroke = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-2)];
// 		this.shape.draw(this.screen.ctx);

// 	}) // forEach
// }

// const festHeart = new Vizra.viz(palettes[2], Vizra.paths.festivalX());
// festHeart.grid = grids.quarterCoords;
// festHeart.heart = new Vizra.shape({x: 10, y: 10}, Vizra.paths.heart(), festHeart.palette);
// festHeart.rect = new Vizra.shape({x: 10, y: 10}, Vizra.paths.rectangle(window.innerWidth/2, window.innerHeight/2), festHeart.palette);
// festHeart.loop = function(state) {
// 	this.coords.forEach((el, i) => {

// 		this.palette.setLums(Math.floor(state.bass/8));

// 		const colour = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length)];

// 		this.rect.position = el;

// 		this.shape.offset = new Vizra.vector(186, 76);
// 		this.heart.offset = new Vizra.vector(47, 47);

// 		this.shape.fill = colour;
// 		this.heart.fill = colour;

// 		if (i%2 === 0) {
// 			this.rect.fill = this.palette.hslaPalette[4];
// 			this.rect.draw(this.screen.ctx);

// 			this.shape.position = el;
// 			this.shape.draw(this.screen.ctx);
// 		} else {
// 			this.rect.fill = this.palette.hslaPalette[2];
// 			this.rect.draw(this.screen.ctx);

// 			this.heart.position = el;
// 			this.heart.draw(this.screen.ctx);
// 		}

// 	}) // forEach
// }

// const festHeartBounce = new Vizra.viz(palettes[3], Vizra.paths.festivalX());
// festHeartBounce.grid = grids.quarterCoords;
// festHeartBounce.heart = new Vizra.shape({x: 10, y: 10}, Vizra.paths.heart(), festHeartBounce.palette);
// festHeartBounce.rect = new Vizra.shape({x: 10, y: 10}, Vizra.paths.rectangle(window.innerWidth/2, window.innerHeight/2), festHeartBounce.palette);
// festHeartBounce.debounce = 2;
// festHeartBounce.shape.stroke = 'transparent';
// festHeartBounce.heart.stroke = 'transparent';
// festHeartBounce.rect.stroke = 'transparent';
// festHeartBounce.loop = function(state) {
// 	this.coords.forEach((el, i) => {

// 		// this.palette.setLums(state.bass);

// 		let scale = (state.bass/127)+0.5;

// 		const colour = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length)];

// 		this.rect.position = el;

// 		this.shape.offset = new Vizra.vector(186, 76);
// 		this.heart.offset = new Vizra.vector(47, 47);

// 		this.shape.fill = this.palette.hslaPalette[1];
// 		this.heart.fill = this.palette.hslaPalette[1];

// 		this.shape.scale = new Vizra.vector(scale, scale);
// 		this.heart.scale = new Vizra.vector(scale, scale);

// 		if (i%2 === 0) {
// 			this.rect.fill = this.palette.hslaPalette[3];
// 			this.rect.draw(this.screen.ctx);

// 			this.shape.position = el;
// 			this.shape.draw(this.screen.ctx);
// 		} else {
// 			this.rect.fill = this.palette.hslaPalette[4];
// 			this.rect.draw(this.screen.ctx);

// 			this.heart.position = el;
// 			this.heart.draw(this.screen.ctx);
// 		}

// 	}) // forEach
// }

// const liveJSlogo = new Vizra.viz(palettes[4], Vizra.paths.liveJS());
// liveJSlogo.grid = grids.quarterCoords;
// liveJSlogo.heart = new Vizra.shape({x: 10, y: 10}, Vizra.paths.liveJSheart(), liveJSlogo.palette);
// liveJSlogo.rect = new Vizra.shape({x: 10, y: 10}, Vizra.paths.rectangle(window.innerWidth/2, window.innerHeight/2), liveJSlogo.palette);
// liveJSlogo.shape.strokeWidth = 4.0;
// liveJSlogo.heart.stroke = 'transparent';
// liveJSlogo.loop = function(state) {
// 	this.coords.forEach((el, i) => {

// 		this.palette.setLums(Math.floor(state.bass/8));

// 		const colour = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-2)];

// 		this.rect.position = el;

// 		this.shape.offset = new Vizra.vector(157, 40);
// 		this.heart.offset = new Vizra.vector(107, 122);

// 		this.shape.fill = colour;
// 		this.shape.stroke = colour;
// 		this.heart.fill = colour;

// 		if (i%2 === 0) {
// 			this.rect.fill = this.palette.hslaPalette[0];
// 			this.rect.draw(this.screen.ctx);

// 			this.shape.position = el;
// 			this.shape.draw(this.screen.ctx);
// 		} else {
// 			this.rect.fill = this.palette.hslaPalette[5];
// 			this.rect.draw(this.screen.ctx);

// 			this.heart.position = el;
// 			this.heart.draw(this.screen.ctx);
// 		}

// 	}) // forEach
// }

// const liveJSlogoBounce = new Vizra.viz(palettes[4], Vizra.paths.liveJS());
// liveJSlogoBounce.grid = grids.quarterCoords;
// liveJSlogoBounce.heart = new Vizra.shape({x: 10, y: 10}, Vizra.paths.liveJSheart(), liveJSlogoBounce.palette);
// liveJSlogoBounce.rect = new Vizra.shape({x: 10, y: 10}, Vizra.paths.rectangle(window.innerWidth/2, window.innerHeight/2), liveJSlogoBounce.palette);
// liveJSlogoBounce.debounce = 2;
// liveJSlogoBounce.shape.strokeWidth = 4.0;
// liveJSlogoBounce.heart.stroke = 'transparent';
// liveJSlogoBounce.rect.stroke = 'transparent';
// liveJSlogoBounce.loop = function(state) {
// 	this.coords.forEach((el, i) => {

// 		// this.palette.setLums(state.bass);

// 		let scale = (state.bass/127)+0.5;

// 		const colour = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-2)];

// 		this.rect.position = el;

// 		this.shape.offset = new Vizra.vector(186, 76);
// 		this.heart.offset = new Vizra.vector(47, 47);

// 		this.shape.fill = this.palette.hslaPalette[1];
// 		this.shape.stroke = this.palette.hslaPalette[1];
// 		this.heart.fill = this.palette.hslaPalette[2];

// 		this.shape.scale = new Vizra.vector(scale, scale);
// 		this.heart.scale = new Vizra.vector(scale, scale);

// 		if (i%2 === 0) {
// 			this.rect.fill = this.palette.hslaPalette[0];
// 			this.rect.draw(this.screen.ctx);

// 			this.shape.position = el;
// 			this.shape.draw(this.screen.ctx);
// 		} else {
// 			this.rect.fill = this.palette.hslaPalette[5];
// 			this.rect.draw(this.screen.ctx);

// 			this.heart.position = el;
// 			this.heart.draw(this.screen.ctx);
// 		}

// 	}) // forEach
// }

// const xSquare = new Vizra.viz(palettes[1], Vizra.paths.rectangle(192, 192));
// xSquare.debounce = 15;
// xSquare.grid = grids.xCoords;
// xSquare.loop = function(state) {
// 	this.coords.forEach((el, i) => {

// 		this.palette.setLums(Math.floor(state.bass/8));

// 		const colour = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];

// 		this.shape.position = el;

// 		this.shape.fill = colour;
// 		this.shape.draw(this.screen.ctx);

// 	}) // forEach
// }

// const xSquareSquare = new Vizra.viz(palettes[1], Vizra.paths.rectangle(192, 192));
// xSquareSquare.debounce = 2;
// xSquareSquare.shape2 = new Vizra.shape({x: 10, y: 10}, Vizra.paths.rectangle(96, 96), xSquareSquare.palette);
// xSquareSquare.grid = grids.xCoords;
// xSquareSquare.loop = function(state) {
// 	this.coords.forEach((el, i) => {

// 		// this.palette.setLums(state.bass);

// 		let colour = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];
// 		let colour2 = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];

// 		if (state.bass > 50) {
// 			colour = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];
// 			colour2 = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];
// 		}

// 		this.shape.position = el;
// 		this.shape2.position = el;

// 		this.shape2.scale = new Vizra.vector((state.bass/127)+0.5, (state.bass/127)+0.5);

// 		this.shape.fill = colour;
// 		this.shape2.fill = colour2;

// 		this.shape.draw(this.screen.ctx);
// 		this.shape2.draw(this.screen.ctx);

// 	}) // forEach
// }

// const xSquareCircle = new Vizra.viz(palettes[1], Vizra.paths.rectangle(192, 192));
// xSquareCircle.debounce = 15;
// xSquareCircle.shape2 = new Vizra.shape({x: 10, y: 10}, Vizra.paths.circle(), xSquareCircle.palette);
// xSquareCircle.shape2.strokeWidth = 10.0;
// xSquareCircle.grid = grids.xCoords;
// xSquareCircle.loop = function(state) {
// 	this.coords.forEach((el, i) => {

// 		// this.palette.setLums(state.bass);

// 		let colour = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];
// 		let colour2 = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];

// 		if (state.bass > 50) {
// 			colour = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];
// 			colour2 = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];
// 		}

// 		this.shape2.scale = new Vizra.vector((state.bass/127)+0.5, (state.bass/127)+0.5);

// 		this.shape.position = el;
// 		this.shape2.position = el;

// 		if (i%2 === 0) {
// 			this.shape2.fill = colour2;
// 			this.shape2.stroke = 'transparent';
// 		} else {
// 			this.shape2.fill = 'transparent';
// 			this.shape2.stroke = colour2;
// 		}

// 		this.shape.fill = colour;

// 		this.shape.draw(this.screen.ctx);
// 		this.shape2.draw(this.screen.ctx);

// 	}) // forEach
// }













// const basicSquare = new Vizra.viz(palettes[1], Vizra.paths.rectangle());
// // basicSquare.drawViz = function() {

// // }
// basicSquare.debounce = 5;
// basicSquare.loop = function(state) {
// 	this.coords.forEach((el, i) => {

// 		this.palette.setLums(Math.floor(state.bass/8));

// 		const colour = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length)];

// 		this.shape.position = el;

// 		this.shape.fill = colour;
// 		this.shape.draw(this.screen.ctx);

// 	}) // forEach
// }

// const jseuCircle = new Vizra.viz(palettes[1], Vizra.paths.circle());
// jseuCircle.grid = new Vizra.coords('iso', 'regular');
// jseuCircle.shape.strokeWidth = 20.0;
// jseuCircle.shape.scale = new Vizra.vector(0.2, 0.2);
// jseuCircle.loop = function() {

// 	this.coords.forEach((el, i) => {

// 		this.shape.fill = 'transparent';
// 		this.shape.stroke = 'transparent';

// 		if (Math.random() > 0.5) {
// 			this.shape.fill = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length)];
// 		} else {
// 			this.shape.stroke = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length)];
// 		}

// 		this.shape.position = el;

// 		if (Math.random() < 0.3) {
// 			this.shape.draw(this.screen.ctx);
// 		}

// 	}) // forEach
// }

// const jseuHalfDia = new Vizra.viz(palettes[2], Vizra.paths.diamond());
// jseuHalfDia.grid = new Vizra.coords('iso', 'loose');
// jseuHalfDia.shape2 = new Vizra.shape({x: 10, y: 10}, Vizra.paths.halfDiamond(), jseuHalfDia.palette);
// jseuHalfDia.loop = function() {

// 	this.coords.forEach((el, i) => {

// 		this.shape.fill = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];
// 		this.shape2.fill = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];

// 		this.shape.position = el;
// 		this.shape2.position = el;

// 		if (Math.random() < 0.3) {
// 			this.shape.draw(this.screen.ctx);
// 			this.shape2.draw(this.screen.ctx);
// 		}

// 	}) // forEach
// }

// const jseuCurveCross = new Vizra.viz(palettes[1], Vizra.paths.curvedCross());
// jseuCurveCross.grid = new Vizra.coords('iso', 'loose');
// jseuCurveCross.loop = function() {

// 	this.coords.forEach((el, i) => {

// 		// let colour = this.palette[i%5];
// 		// console.log(colour);
// 		// colour.op = Math.random();

// 		this.shape.fill = this.palette.hslaPalette[Vizra.utils.randomNumber(0,this.palette.length-1)];

// 		this.shape.position = el;

// 		let rotate = Math.floor(Math.random()*360);

// 		this.shape.rotate = rotate;

// 		if (Math.random() < 0.3) {
// 			this.shape.draw(this.screen.ctx);
// 		}

// 	}) // forEach
// }

// const jseuCircSquare = new Vizra.viz(palettes[2], Vizra.paths.diamond());
// jseuCircSquare.grid = new Vizra.coords('iso', 'loose');
// jseuCircSquare.shape2 = new Vizra.shape({x: 10, y: 10}, Vizra.paths.circle(), jseuCircSquare.palette);
// jseuCircSquare.loop = function() {

// 	this.coords.forEach((el, i) => {

// 		this.shape.fill = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];
// 		this.shape2.fill = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];

// 		this.shape.position = el;
// 		this.shape2.position = el;

// 		this.shape2.scale = new Vizra.vector(0.3, 0.3);

// 		if (Math.random() < 0.3) {
// 			this.shape.draw(this.screen.ctx);
// 			this.shape2.draw(this.screen.ctx);
// 		}

// 	}) // forEach
// }

// const jseuSquare = new Vizra.viz(palettes[3], Vizra.paths.diamond());
// jseuSquare.grid = new Vizra.coords('iso', 'loose');
// jseuSquare.shape2 = new Vizra.shape({x: 10, y: 10}, Vizra.paths.diamond(), jseuSquare.palette);
// jseuSquare.loop = function() {

// 	this.coords.forEach((el, i) => {

// 		this.shape.fill = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];
// 		this.shape2.fill = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];

// 		this.shape.position = el;
// 		this.shape2.position = el;

// 		this.shape2.scale = new Vizra.vector(0.3, 0.3);

// 		if (Math.random() < 0.3) {
// 			this.shape.draw(this.screen.ctx);
// 			this.shape2.draw(this.screen.ctx);
// 		}

// 	}) // forEach
// }

// const jseuLogo = new Vizra.viz(palettes[3], Vizra.paths.diamond());
// jseuLogo.grid = new Vizra.coords('iso', 'loose');
// jseuLogo.shape2 = new Vizra.shape({x: 10, y: 10}, Vizra.paths.heart(), jseuLogo.palette);
// jseuLogo.loop = function() {

// 	this.coords.forEach((el, i) => {

// 		this.shape.fill = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];
// 		this.shape2.fill = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];

// 		this.shape.position = el;
// 		this.shape2.position = el;

// 		this.shape2.scale = new Vizra.vector(0.3, 0.3);

// 		if (Math.random() < 0.3) {
// 			this.shape.draw(this.screen.ctx);
// 			this.shape2.draw(this.screen.ctx);
// 		}

// 	}) // forEach
// }

// const jseuArcs = new Vizra.viz(palettes[3], Vizra.paths.circle(50, 20, 200));
// jseuArcs.grid = new Vizra.coords('polar', 'loose');
// jseuArcs.shape.strokeWidth = 20.0;
// jseuArcs.loop = function() {

// 	this.coords.forEach((el, i) => {

// 		this.shape.fill = 'transparent';
// 		this.shape.stroke = this.palette.hslaPalette[Vizra.utils.randomNumber(0, this.palette.length-1)];

// 		this.shape.position = el;


// 		if (Math.random() < 0.3) {
// 			this.shape.draw(this.screen.ctx);
// 		}

// 	}) // forEach
// }




export default vizLibrary;

