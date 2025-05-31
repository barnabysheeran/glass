import ApplicationLogger from '../../application/ApplicationLogger.js';

import ViewManager from './view/ViewManager.js';

export default class DirectableDotMatrix {
	#VIEW_MANAGER;

	#LOG_LEVEL = 3;

	// _________________________________________________________________________

	constructor(width, height) {
		ApplicationLogger.log('DirectableDotMatrix', this.#LOG_LEVEL);

		// Create View Manager
		this.#VIEW_MANAGER = new ViewManager(width, height);
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {
		// ApplicationLogger.log('DirectableDotMatrix tick', this.#LOG_LEVEL);

		// View Manager
		this.#VIEW_MANAGER.tick(frameDeltaMS);
	}

	// ____________________________________________________________________ Size

	setSize(width, height) {
		ApplicationLogger.log('DirectableDotMatrix setSize', this.#LOG_LEVEL);

		// View Manager
		this.#VIEW_MANAGER.setSize(width, height);
	}
}
