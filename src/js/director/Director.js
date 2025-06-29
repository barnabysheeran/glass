import ApplicationLogger from '../application/ApplicationLogger.js';

import Display from '../display/Display.js';

import DirectableTitle from '../directable/title/DirectableTitle.js';
import DirectableDotMatrix from '../directable/dotmatrix/DirectableDotMatrix.js';
import DirectableVimeo from '../directable/video/DirectableVimeo.js';
import DirectableYoutube from '../directable/video/DirectableYoutube.js';

export default class Director {
	static #DIRECTABLE_TITLE;
	static #DIRECTABLE_DOT_MATRIX;
	static #DIRECTABLE_VIMEO;
	static #DIRECTABLE_YOUTUBE;

	static #LOG_LEVEL = 2;

	// _________________________________________________________________________

	static initialise() {
		ApplicationLogger.log(`Director`, this.#LOG_LEVEL);

		// Get Initial Display Dimensions
		const WIDTH = Display.getWidth();
		const HEIGHT = Display.getHeight();

		// Create Directable Title
		this.#DIRECTABLE_TITLE = new DirectableTitle();
		this.#DIRECTABLE_TITLE.setText('Title');

		// Create Dot Matrix
		this.#DIRECTABLE_DOT_MATRIX = new DirectableDotMatrix(WIDTH, HEIGHT);

		// Create Directable Vimeo
		// this.#DIRECTABLE_VIMEO = new DirectableVimeo();

		// Create Directable Youtube
		// this.#DIRECTABLE_YOUTUBE = new DirectableYoutube();
	}

	// ____________________________________________________________________ Tick

	static tick(frameDeltaMS) {
		// Tick Directable Title
		// this.#DIRECTABLE_TITLE.tick(frameDeltaMS);

		// Dot Matrix
		this.#DIRECTABLE_DOT_MATRIX.tick(frameDeltaMS);

		// Vimeo
		// this.#DIRECTABLE_VIMEO.tick(frameDeltaMS);

		// Youtube
		// this.#DIRECTABLE_YOUTUBE.tick(frameDeltaMS);
	}

	static setSize(width, height) {
		// Dot Matrix
		this.#DIRECTABLE_DOT_MATRIX.setSize(width, height);

		// Vimeo
		// this.#DIRECTABLE_VIMEO.setSize(width, height);

		// Youtube
		// this.#DIRECTABLE_YOUTUBE.setSize(width, height);
	}
}
