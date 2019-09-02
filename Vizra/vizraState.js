let initialState = 'active';
let currentState = initialState;

// do I want to be switch casing over midi vals here or when the message comes in?
function musicMachine(state, event) {

  switch (state.value) {
    case 'active':
      switch (event.type) {
        case 'INPUT.CHANGE':
          const newParams = updateSoftwareParams(event.data);
          return { ...state, ...newParams }

        }

      }

}

// update state, execute side-effects
function sendEvent(event) {
  currentState = musicMachine(currentState, event);
}

// ================================ MIDI
// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
	// when we get a succesful response, run this code
	const midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

	var inputs = midi.inputs.values();
	// loop over all available inputs and listen for any MIDI input
	for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
			// each time there is a midi message call the onMIDIMessage function
			input.value.onmidimessage = onMIDIMessage;
	}
}
// onMIDIInput(event => {
//   send({ type: 'INPUT.CHANGE', data: event });
// });
function onMIDIMessage(message) {
	sendEvent({ type: 'MIDI.CHANGE', data: message.data });
}

function onMIDIFailure(error) {
    // when we get a failed response, run this code
    console.error("No access to MIDI devices or no WebMIDI support" + error);
}

// onAudioInput(event => {
//   send({ type: 'INPUT.CHANGE', data: event });
// });

const controls = {
	set: 0,
	viz: 0,

	blackOut: false,
	whiteOut: false,
	palette: 0,

	grid: 'iso',
	shiftGrid: false
}