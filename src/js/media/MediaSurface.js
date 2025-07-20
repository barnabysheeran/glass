import ApplicationLogger from '../application/ApplicationLogger.js';

import Display from '../display/Display.js';

export default class MediaSurface {
	static #CONTAINER;

	static #LOG_LEVEL = 2;

	// _________________________________________________________________________

	static initialise(width, height) {
		ApplicationLogger.log('MediaSurface', this.#LOG_LEVEL);

		// Create Holder
		this.#CONTAINER = document.createElement('div');
		this.#CONTAINER.classList.add('video-surface');

		// Append Holder to Display Holder
		Display.getDisplayHolder().appendChild(this.#CONTAINER);

		// Set Initial Size
		this.setSize(width, height);
	}

	// __________________________________________________________________ Access

	static getContainer() {
		return this.#CONTAINER;
	}

	// ____________________________________________________________________ Size

	static setSize(width, height) {
		this.#CONTAINER.style.width = `${width}px`;
		this.#CONTAINER.style.height = `${height}px`;
	}
}
