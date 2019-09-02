// TODO: figure out a way to return height and width is realtime
class VizraCanvas {
	constructor (canvas) {
		this._canvas = canvas;
		this._context = canvas.getContext('2d');

		this.resize();
		window.addEventListener("resize", () => {
			this.resize();
		}, false)
		
		this.setup();
	}
	// width & height based on window
	get width() { return this._canvas.width }
	get height() { return this._canvas.height }
	
	// return context
	get ctx() { return this._context }
	
	get centerX() { return this._canvas.width/2; }
	get centerY() { return this._canvas.height/2; }
	
	// TODO
	// get pointerX
	// get pointerY
	
	resize() {
		this._canvas.width = window.innerWidth;
		this._canvas.height = window.innerHeight;
	}
	
	setup() {
		this.ctx.lineCap = 'round';
		this.ctx.lineJoin = 'round';
	}
	
	clear(bkCol = 'black') {
		this.ctx.clearRect(0,0, this.width, this.height);
		this.ctx.fillStyle = bkCol;
		this.ctx.fillRect(0,0, this.width, this.height);
	}

}

export default VizraCanvas;