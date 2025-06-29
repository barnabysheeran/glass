import ApplicationLogger from '../application/ApplicationLogger.js';

export default class VideoSurface {
	static #LOG_LEVEL = 2;

	// _________________________________________________________________________

	static initialise() {
		ApplicationLogger.log('VideoSurface', this.#LOG_LEVEL);
	}
}
