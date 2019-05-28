// can this extend an analyser class?

/*
Returns:

data
beat
bass
hi

*/

class VizraAnalyser {
	constructor(size = 512) {

		this._size = size;

		this.context = new AudioContext({sampleRate: 41000});
		this.data = new Uint8Array(this._size);
	}

	// resume context for autoplay
	get resume() {
		return this.context.resume();
	}

	// calculate buffer size
	get bufferSize() {
		return this._size * 2;
	}

	// create array for data
	// get data() {
	// 	return new Uint8Array(this._size);
	// }

	// create analyser node
	get node() {
		return new AnalyserNode(this.context, {
			fftSize: this.bufferSize,
			maxDecibels: -25,
			minDecibels: -60,
			smoothingTimeConstant: 0.5,
		});
	}


	// set draw after stream has started
	getStreamData() {
		// pipe in analysing to getUserMedia
		return navigator.mediaDevices.getUserMedia({ audio: true, video: false })
			.then(stream => this.context.createMediaStreamSource(stream))
			.then(source => {
				source.connect(this.node);
			});
	}

	getData() {
		this.node.getByteFrequencyData(this.data);
	}

	// beat

	// bass

	// hi

// 	init() {
// 		return getData();
// 	}

}




// get frequency data
//
// // console.log(receivedData);
// sendMessageToWorker();

export default VizraAnalyser;