import ApplicationLogger from '../application/ApplicationLogger.js';

import Overlay from '../overlay/Overlay.js';
import Director from '../director/Director.js';
import RenderController from '../render/RenderController.js';

export default class Controller {
	#FRAMERATE_FPS = 20;
	#FRAMERATE_MS = 1000 / this.#FRAMERATE_FPS;

	#frameRateDelayMS = 0;

	#LOG_LEVEL = 1;

	// _________________________________________________________________________

	constructor() {
		ApplicationLogger.log(
			`Controller Initialising with Frame Rate ${this.#FRAMERATE_FPS} FPS`,
			this.#LOG_LEVEL,
		);

		// Initialise Overlay
		Overlay.initialise();

		// Initialise Director
		Director.initialise();

		// Initialise Render Controller
		RenderController.initialise();
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

		// Tick Director
		Director.tick(frameDeltaMS);

		// Tick Render Controller
		RenderController.tick(frameDeltaMS);
	}
}
