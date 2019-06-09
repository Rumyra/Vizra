import Vizra from '../../Vizra/Vizra.js';

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

const liveJS = new Vizra.palette([
	new Vizra.colour('#ffffff'), // white
	new Vizra.colour('#fc6f1d'), // orange
	new Vizra.colour('#2cbaa9'), // turquoise
	new Vizra.colour('#7c45ba'), // purple
	new Vizra.colour('#cad507'), // lime
	new Vizra.colour('#000000') // black
]);

const rainbow = new Vizra.palette([
	new Vizra.colour('#e23058'), // red
	new Vizra.colour('#f7583a'), // dark orange
	new Vizra.colour('#f8943e'), // light orange
	new Vizra.colour('#f3b72f'), // orange yellow
	new Vizra.colour('#edd92a'), // yellow
	new Vizra.colour('#95c531'), // lime green
	new Vizra.colour('#55a753'), // green
	new Vizra.colour('#11826e'), // blue green
	new Vizra.colour('#3161a3'), // light blue
	new Vizra.colour('#5b37cb'), // dark blue
	new Vizra.colour('#a247be'), // purple
	new Vizra.colour('#e957b2') // pink
]);

const palettes = [
	jseuAll,
	jseuPrimary,
	jseuSecondary,
	jseuPastel,
	liveJS,
	rainbow
]

export default palettes;

