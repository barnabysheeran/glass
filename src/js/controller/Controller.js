import Overlay from '../overlay/Overlay.js';
import View from '../view/View.js';

export default class Controller {
	#FRAMERATE_FPS = 20;
	#FRAMERATE_MS = 1000 / this.#FRAMERATE_FPS;

	#frameRateDelayMS = 0;

	// _________________________________________________________________________

	constructor() {
		console.log('Controller');

		// Initialise Overlay
		// Overlay.initialise();
		// Initialise View
		// View.initialise();
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {
		// Tick 60 FPS

		// Frame Rate Delay
		this.#frameRateDelayMS += frameDeltaMS;

		// Next Frame Rate Frame ?
		if (this.#frameRateDelayMS > this.#FRAMERATE_MS) {
			// Reset
			this.#frameRateDelayMS -= this.#FRAMERATE_MS;

			// Tick at Frame Rate FPS
			// TODO
		}

		// View
		// View.tick(frameDeltaMS);
	}
}
