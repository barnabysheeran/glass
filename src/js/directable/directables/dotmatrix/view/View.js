import ApplicationLogger from '../../../../application/ApplicationLogger.js';

export default class View {
	#shapeManager;

	#LOG_LEVEL = 6;

	// _________________________________________________________________________

	constructor(shapeManager) {
		// ApplicationLogger.log('View', this.#LOG_LEVEL);

		// Store
		this.#shapeManager = shapeManager;
	}

	// ____________________________________________________________________ Tick

	tick() {
		this.#shapeManager.tick();
	}
}
