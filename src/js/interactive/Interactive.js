import ApplicationLogger from '../application/ApplicationLogger.js';

export default class Interactive {
	static #LOG_LEVEL = 2;

	// _________________________________________________________________________

	static initialise() {
		ApplicationLogger.log('Interactive', this.#LOG_LEVEL);
	}
}
