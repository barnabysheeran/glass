import ApplicationConfiguration from '../application/ApplicationConfiguration.js';
import ApplicationLogger from '../application/ApplicationLogger.js';

import Display from '../display/Display.js';
import GridData from '../grid/GridData.js';
import VideoSurface from '../video/VideoSurface.js';
import RenderSurface from '../render/RenderSurface.js';
import Interactive from '../interactive/Interactive.js';
import Director from '../director/Director.js';

import Development from '../development/Development.js';

export default class Controller {
	#FRAMERATE_FPS = 60;
	#FRAMERATE_MS = 1000 / this.#FRAMERATE_FPS;

	#frameRateDelayMS = 0;

	#LOG_LEVEL = 1;

	// _________________________________________________________________________

	constructor() {
		ApplicationLogger.log(
			`Controller Initialising with Frame Rate ${this.#FRAMERATE_FPS} FPS`,
			this.#LOG_LEVEL,
		);

		// Order Important

		Display.initialise();
		GridData.initialize(Display.getWidth(), Display.getHeight());
		VideoSurface.initialise();
		RenderSurface.initialise();
		Interactive.initialise();
		Director.initialise();

		// Initialise Overlay ?
		if (ApplicationConfiguration.isDebug === true) {
			Development.initialise();
		}
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {
		// Frame Rate Delay
		this.#frameRateDelayMS += frameDeltaMS;

		// Next Frame Rate Frame ?
		if (this.#frameRateDelayMS > this.#FRAMERATE_MS) {
			// Reset
			this.#frameRateDelayMS -= this.#FRAMERATE_MS;

			// Tick at Frame Rate FPS

			// Display
			const IS_DISPLAY_UPDATED = Display.tick();

			if (IS_DISPLAY_UPDATED) {
				this.#displayUpdated();
			}

			// Tick Director
			Director.tick(frameDeltaMS);
		}

		// Tick at Max Frame Rate

		// Tick Render Surface
		RenderSurface.tick(frameDeltaMS);
	}

	// _________________________________________________________________ Display

	#displayUpdated() {
		const DISPLAY_WIDTH = Display.getWidth();
		const DISPLAY_HEIGHT = Display.getHeight();

		ApplicationLogger.log(
			`Controller displayUpdated ${DISPLAY_WIDTH} ${DISPLAY_HEIGHT}`,
			this.#LOG_LEVEL,
		);

		// Director
		Director.setSize(DISPLAY_WIDTH, DISPLAY_HEIGHT);

		// Render Surface
		RenderSurface.setSize(DISPLAY_WIDTH, DISPLAY_HEIGHT);
	}
}
