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
			left: [ {on: [147, 20, 127], off: [131, 20, 127]}, {on: [147, 21, 127], off: [131, 21, 127]}, {on: [147, 22, 127], off: [131, 22, 127]} ],
			right: [ {on: [147, 23, 127], off: [131, 23, 127]}, {on: [147, 24, 127], off: [131, 24, 127]}, {on: [147, 25, 127], off: [131, 25, 127]} ]
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
			left: [ {on: [147, 32, 127], off: [131, 32, 127]}, {on: [147, 33, 127], off: [131, 33, 127]}, {on: [147, 34, 127], off: [131, 34, 127]} ],
			right: [ {on: [147, 35, 127], off: [131, 35, 127]}, {on: [147, 36, 127], off: [131, 36, 127]}, {on: [147, 37, 127], off: [131, 37, 127]} ]
		}
	},

	bankFour: {
		switch: [147, 3, 127],
		arcade: generateArcadeVals(3),
		side: {
			left: [ {on: [147, 38, 127], off: [131, 38, 127]}, {on: [147, 39, 127], off: [131, 39, 127]}, {on: [147, 40, 127], off: [131, 40, 127]} ],
			right: [ {on: [147, 41, 127], off: [131, 41, 127]}, {on: [147, 42, 127], off: [131, 42, 127]}, {on: [147, 43, 127], off: [131, 43, 127]} ]
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

// akai.bankOne[0].on -> pad on
// akai.bankOne[0].off -> pad release
// akai.bankOne[0].cc -> cc
// akai.bankOne[0].pc -> program ch

// generate all values
function generateAkaiVals(bank) {

	// pad channel val
	const padChOn = 144 + bank;
	const padChOff = 128 + bank;

	// pad note vals
	const padNotes = 36;

	// cc channel vals
	const ccCh = 176 + bank; // notes 1-8

	// pc channel vals
	const pcCh = 192 + bank; // notes 0-7

	// bank one = 0
	// const startVal = 16*bank;

	const vals = [];

	for (let i=0; i<8; i++) {
		var toPush = {
			on: [padChOn, padNotes+i],
			off: [padChOff, padNotes+i],
			cc: [ccCh, i+1],
			pc: [pcCh, i]
		};
		vals.push(toPush);
	}
	return vals;
}


const akai = {
	bankOne: generateAkaiVals(0),
	bankTwo: generateAkaiVals(1),
	bankThree: generateAkaiVals(2),
	bankFour: generateAkaiVals(3)
};

// See cheat sheets
const controlsFighter = {

	// bank one is shape switcher
	setOne: fighter.bankOne.switch,
	setOneShape: fighter.bankOne.arcade[0].on, // lowest value for buttons
	setOneShape: akai.bankOne[0].on, // lowest value for buttons
	setOneReset: fighter.bankOne.side.left[2].on,

	// bank two is shape switcher
	setTwo: fighter.bankTwo.switch,
	setTwoShape: fighter.bankTwo.arcade[0].on, // lowest value for buttons
	setTwoReset: fighter.bankTwo.side.left[2].on,

	// bank three is for colours
	colourControls: fighter.bankThree.switch,
	// returns cc vals
	colourCCchannel: fighter.bankThree.arcade[0].cc,
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
	randomiseGrid: fighter.bankFour.arcade[7].on,
	squareGrid: fighter.bankFour.arcade[1].on,
	isoGrid: fighter.bankFour.arcade[2].on,
	polarGrid: fighter.bankFour.arcade[3].on,

	customGridOne: fighter.bankFour.arcade[4].on,
	customGridTwo: fighter.bankFour.arcade[5].on,
	customGridThree: fighter.bankFour.arcade[6].on,
	customGridFour: fighter.bankFour.arcade[0].on
}

// See cheat sheets
const controls = {

	// bank one is shape switcher
	setOne: akai.bankOne[0].on,
	setOneShape: akai.bankOne[0].on, // lowest value for buttons
	setOneReset: akai.bankOne[7].on,

	// bank two is shape switcher
	setTwo: akai.bankTwo[0].off,
	setTwoShape: akai.bankTwo[0].on, // lowest value for buttons
	setTwoReset: akai.bankTwo[7].on,

	// bank three is for colours
	colourControls: akai.bankThree[0].on,
	colourCCchannel: akai.bankThree[0].cc,
	// returns cc vals
	hueShift: akai.bankThree[0].cc[1],
	satShift: akai.bankThree[1].cc[1],
	lumShift: akai.bankThree[2].cc[1],
	opShift: akai.bankThree[3].cc[1],

	invertOn: akai.bankThree[0].on,
	invertOff: akai.bankThree[0].off,

	paletteSwitch: akai.bankThree[0].pc, // lowest value for buttons

	blackOut: akai.bankThree[4].on,
	whiteOut: akai.bankThree[5].on,
	showScreen: akai.bankThree[6].on,

	resetColours: akai.bankThree[7].on,

	// bank four is for grid & transforms
	shapeControls: akai.bankFour[0].on,
	// I literally have no idea how to do grids
	randomiseGrid: akai.bankFour[0].on,
	// reset grid
	// randomise -> off set amount
	// move grid x
	// move grid y
	// move grid both
	// transition grid
	// if I can work out a way to transition a grid and put in params rather than setting loads up - that would be better

	squareGrid: akai.bankFour[1].on,
	isoGrid: akai.bankFour[2].on,
	polarGrid: akai.bankFour[3].on,
	// spiral grid
	// polar moves out
	// spiral moves around
	// center
	// half x
	// half y
	// quarter

	customGridOne: akai.bankFour[4].on,
	customGridTwo: akai.bankFour[5].on,
	customGridThree: akai.bankFour[6].on,
	customGridFour: akai.bankFour[7].on
}

export default controls;