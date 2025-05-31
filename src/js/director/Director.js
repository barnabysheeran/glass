import ApplicationLogger from '../application/ApplicationLogger.js';

import DirectableTitle from '../directable/title/DirectableTitle.js';
// import DirectableRhythmBPM from '../directable/directables/rhythm/bpm/DirectableRhythmBPM.js';
import DirectableDotMatrix from '../directable/dotmatrix/DirectableDotMatrix.js';
import Display from '../display/Display.js';

export default class Director {
	static #DIRECTABLE_TITLE;
	// static #DIRECTABLE_RHYTH_BPM;
	static #DIRECTABLE_DOT_MATRIX;

	static #LOG_LEVEL = 2;

	// _________________________________________________________________________

	static initialise() {
		ApplicationLogger.log(`Director initialise`, this.#LOG_LEVEL);

		// Get Initial Display Dimensions
		const WIDTH = Display.getWidth();
		const HEIGHT = Display.getHeight();

		// Create Directable Title
		this.#DIRECTABLE_TITLE = new DirectableTitle();
		this.#DIRECTABLE_TITLE.setText('꒰ ঌᐢ.ˬ.ᐢ໒ ꒱');

		// Create Rhythm BPM
		// this.#DIRECTABLE_RHYTH_BPM = new DirectableRhythmBPM();

		// Create Dot Matrix
		this.#DIRECTABLE_DOT_MATRIX = new DirectableDotMatrix(WIDTH, HEIGHT);
	}

	// ____________________________________________________________________ Tick

	static tick(frameDeltaMS) {
		// Tick Directable Title
		// this.#DIRECTABLE_TITLE.tick(frameDeltaMS);

		// Tick Rhythm BPM
		// this.#DIRECTABLE_RHYTH_BPM.tick(frameDeltaMS);

		// Tick Dot Matrix
		this.#DIRECTABLE_DOT_MATRIX.tick(frameDeltaMS);
	}

	static setSize(width, height) {
		// TODO
	}
}
