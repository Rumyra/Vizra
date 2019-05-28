// import vizraUtils from '../../vizraUtils.js';

// fighter.bankOne.arcade[0].on = [146, 96, 127]
// fighter.bankOne.arcade[0].cc = [180, 51]
// fighter.bankOne.side.left[0].on = [146, 96, 127]
// fighter.tilt./on/off/up/down etc =
// fighter.pickUp/putDown etc =

// generate pad values
function generateArcadeVals(bank) {
	// bank one = 0
	const startVal = 16*bank;

	const vals = [];

	for (let i=0; i<16; i++) {
		var toPush = {
			on: [146, 36+i+startVal, 127],
			off: [130, 36+i+startVal, 127],
			cc: [180, 36+i+startVal]
		};
		vals.push(toPush);
	}
	return vals;
}


const fighter = {

	bankOne: {
		switch: [147, 0, 127],
		arcade: generateArcadeVals(0),
		side: {
			left: [ {on: [147, 26, 127], off: [131, 26, 127]}, {on: [147, 27, 127], off: [131, 27, 127]}, {on: [147, 28, 127], off: [131, 28, 127]} ],
			right: [ {on: [147, 29, 127], off: [131, 29, 127]}, {on: [147, 30, 127], off: [131, 30, 127]}, {on: [147, 31, 127], off: [131, 31, 127]} ]
		}
	},

	bankTwo: {
		switch: [147, 1, 127],
		arcade: generateArcadeVals(1),
		side: {
			left: [ {on: [147, 26, 127], off: [131, 26, 127]}, {on: [147, 27, 127], off: [131, 27, 127]}, {on: [147, 28, 127], off: [131, 28, 127]} ],
			right: [ {on: [147, 29, 127], off: [131, 29, 127]}, {on: [147, 30, 127], off: [131, 30, 127]}, {on: [147, 31, 127], off: [131, 31, 127]} ]
		}
	},

	bankThree: {
		switch: [147, 2, 127],
		arcade: generateArcadeVals(2),
		side: {
			left: [ {on: [147, 26, 127], off: [131, 26, 127]}, {on: [147, 27, 127], off: [131, 27, 127]}, {on: [147, 28, 127], off: [131, 28, 127]} ],
			right: [ {on: [147, 29, 127], off: [131, 29, 127]}, {on: [147, 30, 127], off: [131, 30, 127]}, {on: [147, 31, 127], off: [131, 31, 127]} ]
		}
	},

	bankFour: {
		switch: [147, 3, 127],
		arcade: generateArcadeVals(3),
		side: {
			left: [ {on: [147, 26, 127], off: [131, 26, 127]}, {on: [147, 27, 127], off: [131, 27, 127]}, {on: [147, 28, 127], off: [131, 28, 127]} ],
			right: [ {on: [147, 29, 127], off: [131, 29, 127]}, {on: [147, 30, 127], off: [131, 30, 127]}, {on: [147, 31, 127], off: [131, 31, 127]} ]
		}
	},

	pickup: [147, 18, 127],

	putDown: [131, 18, 127],

	tilt : {
		on: [147, 17, 127],
		off: [131, 17, 127],
		up: [179, 1],
		down: [179, 3],
		left: [179, 0],
		right: [179, 2]
	}

};

console.log(fighter.bankOne.arcade);

// See cheat sheets
const controls = {

	// bank one is shape switcher
	setOne: fighter.bankOne.switch,
	setOneShape: fighter.bankOne.arcade[0].on, // lowest value for buttons
	setOneReset: fighter.bankOne.side.left[2].on,

	// bank two is shape switcher
	setTwo: fighter.bankTwo.switch,
	setTwoShape: fighter.bankTwo.arcade[0].on, // lowest value for buttons
	setTwoReset: fighter.bankTwo.side.left[2].on,

	// bank three is for colours
	colourControls: fighter.bankThree.switch,
	// returns cc vals
	hueShift: fighter.bankThree.arcade[3].cc[1],
	satShift: fighter.bankThree.arcade[2].cc[1],
	lumShift: fighter.bankThree.arcade[1].cc[1],
	opShift: fighter.bankThree.arcade[0].cc[1],

	invertOn: fighter.bankThree.arcade[7].on,
	invertOff: fighter.bankThree.arcade[7].off,

	paletteSwitch: fighter.bankThree.arcade[8].on, // lowest value for buttons

	blackOut: fighter.bankThree.side.right[0].on,
	whiteOut: fighter.bankThree.side.right[1].on,
	showScreen: fighter.bankThree.side.right[2].on,

	resetColours: fighter.bankThree.side.left[2].on,

	// bank four is for grid & transforms
	shapeControls: fighter.bankFour.switch,
	// I literally have no idea how to do grids
	squareGrid: fighter.bankFour.arcade[3].on,
	isoGrid: fighter.bankFour.arcade[2].on,
	polarGrid: fighter.bankFour.arcade[1].on,
	customGrid: fighter.bankFour.arcade[0].on
}

export default controls;