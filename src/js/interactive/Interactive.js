import ApplicationLogger from '../application/ApplicationLogger.js';

import Display from '../display/Display.js';

export default class Interactive {
	static #HOLDER;

	static #LOG_LEVEL = 2;

	// _________________________________________________________________________

	static initialise() {
		ApplicationLogger.log('Interactive', this.#LOG_LEVEL);

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.classList.add('interactive');

		// Append Holder to Display Holder
		Display.getDisplayHolder().appendChild(this.#HOLDER);
	}
}
