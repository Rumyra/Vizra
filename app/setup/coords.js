import Vizra from '../../Vizra/Vizra.js';

const grids = {
	// purely here for jsconfeu - size of square 192
	xCoords: new Vizra.coords('custom',[
		[192, 924],
		[384, 924],
		[576, 924],
		[768, 924],
		[960, 924],

		[960, 732],
		[960, 540],
		[960, 348],
		[960, 156],

		[1152, 924],
		[1344, 924],
		[1536, 924],
		[1728, 924],

		[1536, 702],
		[1536, 510],
		[1536, 318],
		[1536, 126]
	]),
	centerCoords: new Vizra.coords('custom', [
		[window.innerWidth/2, window.innerHeight/2],
		[window.innerWidth/2, window.innerHeight/2],
		[window.innerWidth/2, window.innerHeight/2],
		[window.innerWidth/2, window.innerHeight/2],
		[window.innerWidth/2, window.innerHeight/2],
		[window.innerWidth/2, window.innerHeight/2]
	]),
	halfCoords: new Vizra.coords('custom',[
		[window.innerWidth*0.5, window.innerHeight*0.25],
		[window.innerWidth*0.5, window.innerHeight*0.75]
	]),
	quarterCoords: new Vizra.coords('custom', [
		[window.innerWidth*0.25, window.innerHeight*0.25],
		[window.innerWidth*0.75, window.innerHeight*0.25],
		[window.innerWidth*0.25, window.innerHeight*0.75],
		[window.innerWidth*0.75, window.innerHeight*0.75]]),
	triGrid: new Vizra.coords('iso', [200, 200]),
	diamondGrid: new Vizra.coords('square', [120, 120]),
	test: new Vizra.coords('square', [20, 20], false)
}

export default grids;