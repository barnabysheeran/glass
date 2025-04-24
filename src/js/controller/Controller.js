import Overlay from '../overlay/Overlay.js';

// import Renderer from '../renderer/Renderer';

export default class Controller {
	#FRAMERATE_FPS = 20;
	#FRAMERATE_MS = 1000 / this.#FRAMERATE_FPS;

	#frameRateDelayMS = 0;

	#OVERLAY;

	// _________________________________________________________________________

	constructor() {
		// Initialise Overlay
		Overlay.initialise();

		// Initialise Renderer
		// Renderer.initialise();
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
		}

		// Render
		// Renderer.tick(frameDeltaMS);
	}
}
