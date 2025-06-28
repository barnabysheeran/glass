import ApplicationLogger from '../application/ApplicationLogger.js';

import Display from '../display/Display.js';

import DirectableTitle from '../directable/title/DirectableTitle.js';
import DirectableDotMatrix from '../directable/dotmatrix/DirectableDotMatrix.js';
import DirectableVimeo from '../directable/video/DirectableVimeo.js';

export default class Director {
	static #DIRECTABLE_TITLE;
	static #DIRECTABLE_DOT_MATRIX;
	static #DIRECTABLE_VIMEO;

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

		// Create Dot Matrix
		this.#DIRECTABLE_DOT_MATRIX = new DirectableDotMatrix(WIDTH, HEIGHT);

		// Create Directable Vimeo
		this.#DIRECTABLE_VIMEO = new DirectableVimeo();
	}

	// ____________________________________________________________________ Tick

	static tick(frameDeltaMS) {
		// Tick Directable Title
		// this.#DIRECTABLE_TITLE.tick(frameDeltaMS);

		// Tick Rhythm BPM
		// this.#DIRECTABLE_RHYTH_BPM.tick(frameDeltaMS);

		// Dot Matrix
		this.#DIRECTABLE_DOT_MATRIX.tick(frameDeltaMS);

		// Vimeo
		this.#DIRECTABLE_VIMEO.tick(frameDeltaMS);
	}

	static setSize(width, height) {
		// Dot Matrix
		this.#DIRECTABLE_DOT_MATRIX.setSize(width, height);

		// Vimeo
		this.#DIRECTABLE_VIMEO.setSize(width, height);
	}
}
