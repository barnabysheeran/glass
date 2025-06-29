import ApplicationLogger from '../application/ApplicationLogger.js';

import Display from '../display/Display.js';

export default class VideoSurface {
	static #HOLDER;

	static #LOG_LEVEL = 2;

	// _________________________________________________________________________

	static initialise() {
		ApplicationLogger.log('VideoSurface', this.#LOG_LEVEL);

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.classList.add('video-surface');

		// Append Holder to Display Holder
		Display.getDisplayHolder().appendChild(this.#HOLDER);
	}
}
