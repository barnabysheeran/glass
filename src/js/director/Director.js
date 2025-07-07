import ApplicationLogger from '../application/ApplicationLogger.js';

import Display from '../display/Display.js';

import DirectableTitle from '../directable/title/DirectableTitle.js';
import DirectableDotMatrix from '../directable/dotmatrix/DirectableDotMatrix.js';
import DirectableVimeo from '../directable/video/DirectableVimeo.js';
import DirectableYoutube from '../directable/video/DirectableYoutube.js';
import ApplicationDispatcher from '../application/ApplicationDispatcher.js';

export default class Director {
	static #DIRECTABLE_TITLE;
	static #DIRECTABLE_DOT_MATRIX;
	static #DIRECTABLE_VIMEO;
	static #DIRECTABLE_YOUTUBE;

	static #LOG_LEVEL = 2;

	// _________________________________________________________________________

	static initialise(width, height) {
		ApplicationLogger.log(`Director`, this.#LOG_LEVEL);

		// Create Directable Title
		this.#DIRECTABLE_TITLE = new DirectableTitle();
		this.#DIRECTABLE_TITLE.setText('Barnaby Sheeran');

		// Create Dot Matrix
		this.#DIRECTABLE_DOT_MATRIX = new DirectableDotMatrix(width, height);

		// Create Directable Vimeo
		// this.#DIRECTABLE_VIMEO = new DirectableVimeo(width, height);

		// Create Directable Youtube
		// this.#DIRECTABLE_YOUTUBE = new DirectableYoutube();

		// Application Dispatcher Events
		ApplicationDispatcher.on(
			'view-header-menu-active',
			this.#onViewHeaderMenuActive.bind(this),
		);

		ApplicationDispatcher.on(
			'view-header-menu-inactive',
			this.#onViewHeaderMenuInactive.bind(this),
		);

		ApplicationDispatcher.on(
			'view-project-menu-select',
			this.#onViewProjectMenuSelect.bind(this),
		);
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

	// _______________________________________________________________ On Events

	static #onViewHeaderMenuActive() {
		ApplicationLogger.log(`Director: View Header Menu Active`, this.#LOG_LEVEL);

		// TODO Implement
	}

	static #onViewHeaderMenuInactive() {
		ApplicationLogger.log(
			`Director: View Header Menu Inactive`,
			this.#LOG_LEVEL,
		);

		// TODO Implement
	}

	static #onViewProjectMenuSelect(data) {
		ApplicationLogger.log(
			`Director: View Project Menu Select`,
			this.#LOG_LEVEL,
		);

		console.log(' - data', data);
	}

	// ____________________________________________________________________ Size

	static setSize(width, height) {
		// Dot Matrix
		this.#DIRECTABLE_DOT_MATRIX.setSize(width, height);

		// Vimeo
		this.#DIRECTABLE_VIMEO.setSize(width, height);

		// Youtube
		// this.#DIRECTABLE_YOUTUBE.setSize(width, height);
	}
}
