import ApplicationLogger from '../application/ApplicationLogger.js';

import Display from '../display/Display.js';

export default class VideoSurface {
	static #CONTAINER;

	static #LOG_LEVEL = 2;

	// _________________________________________________________________________

	static initialise() {
		ApplicationLogger.log('VideoSurface', this.#LOG_LEVEL);

		// Create Holder
		this.#CONTAINER = document.createElement('div');
		this.#CONTAINER.classList.add('video-surface');

		// Append Holder to Display Holder
		Display.getDisplayHolder().appendChild(this.#CONTAINER);
	}

	// __________________________________________________________________ Access

	static getContainer() {
		return this.#CONTAINER;
	}
}
