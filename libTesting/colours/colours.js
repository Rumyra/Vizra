import Vizra from '../../Vizra/Vizra.js';

// new colour type
const blue = new Vizra.colour('#D8E2DC');

// get vals
console.log(blue.hue); // returns 144
console.log(blue.sat); // returns 15
console.log(blue.lum); // returns 87
console.log(blue.op); // returns 1

// set vals
blue.hue = 10;
blue.sat = 20;
blue.lum = 30;
blue.op = 0.5;

// get hsla string
console.log(blue.hsla); // returns hsla(10, 20%, 30%, 0.5)
// always have a reference to the original
console.log(blue.original); // {hue: 144, sat: 15, lum: 87, op: 1}
// invert colour
console.log(blue.invert); // return {hue: 190, sat: 20, lum: 70, op: 0.5}
console.log(blue.hsla);

// palette
const cols = [ new Vizra.colour('#D8E2DC'), new Vizra.colour('#FFE5D9'), new Vizra.colour('#FFCAD4'), new Vizra.colour('#F4ACB7'), new Vizra.colour('#9D8189') ];
const myPalette = new Vizra.palette(cols);

// return array of hsla colours
console.log(myPalette.palette);
console.log(myPalette.hslaPalette);
console.log(myPalette.reset);
console.log(myPalette.length);
console.log(myPalette.lightest);
console.log(myPalette.darkest);
console.log(myPalette.back);
console.log(myPalette.fore);

myPalette.setHues(20);
console.log('Hues: ', myPalette.hslaPalette);

myPalette.setSats(5);
console.log('Sats: ', myPalette.hslaPalette);

myPalette.setLums(-20);
console.log('Lums: ', myPalette.hslaPalette);

myPalette.setOps(-0.3);
console.log('Ops: ', myPalette.hslaPalette);

myPalette.invert();
console.log(myPalette.hslaPalette);

myPalette.reset;
console.log(myPalette.hslaPalette);