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
		arcade: generateArcadeVals(0),
		side: {
			left: [ {on: [147, 26, 127], off: [131, 26, 127]}, {on: [147, 27, 127], off: [131, 27, 127]}, {on: [147, 28, 127], off: [131, 28, 127]} ],
			right: [ {on: [147, 29, 127], off: [131, 29, 127]}, {on: [147, 30, 127], off: [131, 30, 127]}, {on: [147, 31, 127], off: [131, 31, 127]} ]
		}
	},

	bankTwo: {
		arcade: generateArcadeVals(1),
		side: {
			left: [ {on: [147, 26, 127], off: [131, 26, 127]}, {on: [147, 27, 127], off: [131, 27, 127]}, {on: [147, 28, 127], off: [131, 28, 127]} ],
			right: [ {on: [147, 29, 127], off: [131, 29, 127]}, {on: [147, 30, 127], off: [131, 30, 127]}, {on: [147, 31, 127], off: [131, 31, 127]} ]
		}
	},

	bankThree: {
		arcade: generateArcadeVals(2),
		side: {
			left: [ {on: [147, 26, 127], off: [131, 26, 127]}, {on: [147, 27, 127], off: [131, 27, 127]}, {on: [147, 28, 127], off: [131, 28, 127]} ],
			right: [ {on: [147, 29, 127], off: [131, 29, 127]}, {on: [147, 30, 127], off: [131, 30, 127]}, {on: [147, 31, 127], off: [131, 31, 127]} ]
		}
	},

	bankFour: {
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

// let's be more specific here - what are the controls we want?
/*


*/
const controls = {
	// expand to set one set two

	// returns set one channel
	setOne
	shapeSwitch: fighter.bankOne.arcade[0].on[0],

	// returns set two channel

	// returns FX one switch channel

	// returns FX one cc channel

	// expand to invert hue etc...
	fx: fighter.bankThree.arcade[0].cc[0]
}

export default controls;