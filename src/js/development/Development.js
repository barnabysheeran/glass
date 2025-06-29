import ApplicationLogger from '../application/ApplicationLogger.js';

import DevelopmentGuides from './guide/DevelopmentGuides.js';

export default class Development {
	static #LOG_LEVEL = 2;

	// _________________________________________________________________________

	static initialise() {
		ApplicationLogger.log('Development', this.#LOG_LEVEL);

		// Create Development Guides
		new DevelopmentGuides();
	}
}
