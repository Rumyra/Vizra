import Vizra from '../../Vizra/Vizra.js';

const liveJS = new Vizra.palette([
	'#ffffff', // white
	'#fc6f1d', // orange
	'#2cbaa9', // turquoise
	'#7c45ba', // purple
	'#cad507', // lime
	'#000000' // black
]);

const asia = new Vizra.palette(['#231201', '#EE3120', '#F5978E', '#F3BA3F', '#9C5B16', '#FBF4E4']);

const rainbow = new Vizra.palette([
	'#000000',
	'#e23058', // red
	'#f7583a', // dark orange
	'#f8943e', // light orange
	'#f3b72f', // orange yellow
	'#edd92a', // yellow
	'#95c531', // lime green
	'#55a753', // green
	'#11826e', // blue green
	'#3161a3', // light blue
	'#5b37cb', // dark blue
	'#a247be', // purple
	'#e957b2' // pink
]);

// const rainbow = new Vizra.palette('rainbow');

const palettes = [
	// jseuAll,
	// jseuPrimary,
	// jseuSecondary,
	// jseuPastel,
	liveJS,
	asia,
	rainbow
	// rainbow
]




const jseuAll = new Vizra.palette([
	new Vizra.colour('#FFFFFF'), // white
	new Vizra.colour('#F3ECDA'), // cream
	new Vizra.colour('#FFD2BB'), // beige
	new Vizra.colour('#FB8A8B'), // peach
	new Vizra.colour('#F76272'), // orange
	new Vizra.colour('#F33A58'), // floro
	new Vizra.colour('#E10079'), // pink
	new Vizra.colour('#A231EF'), // purple
	new Vizra.colour('#15216B'), // blue
	new Vizra.colour('#7b889d'), // grey
	new Vizra.colour('#303F62') // slate
]);

const jseuPrimary = new Vizra.palette([
	new Vizra.colour('#F3ECDA'), // cream
	new Vizra.colour('#F76272'), // orange
	new Vizra.colour('#E10079'), // pink
	new Vizra.colour('#A231EF'), // purple
	new Vizra.colour('#15216B') // blue
]);

const jseuSecondary = new Vizra.palette([
	new Vizra.colour('#F3ECDA'), // cream
	new Vizra.colour('#FFD2BB'), // beige
	new Vizra.colour('#F33A58'), // floro
	new Vizra.colour('#7b889d'), // grey
	new Vizra.colour('#303F62') // slate
]);

const jseuPastel = new Vizra.palette([
	new Vizra.colour('#F3ECDA'), // cream
	new Vizra.colour('#FFD2BB'), // beige
	new Vizra.colour('#F76272'), // orange
	new Vizra.colour('#E10079'), // pink
	new Vizra.colour('#7b889d') // grey
]);



export default palettes;

