import ApplicationConfiguration from '../application/ApplicationConfiguration.js';
import ApplicationLogger from '../application/ApplicationLogger.js';

import Display from '../display/Display.js';
import GridData from '../grid/GridData.js';
import VideoSurface from '../video/VideoSurface.js';
import RenderSurface from '../render/RenderSurface.js';
import InteractiveSurface from '../interactive/InteractiveSurface.js';
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

		const DISPLAY_WIDTH = Display.getWidth();
		const DISPLAY_HEIGHT = Display.getHeight();

		GridData.initialize(DISPLAY_WIDTH, DISPLAY_HEIGHT);
		VideoSurface.initialise(DISPLAY_WIDTH, DISPLAY_HEIGHT);
		RenderSurface.initialise(DISPLAY_WIDTH, DISPLAY_HEIGHT);
		InteractiveSurface.initialise(DISPLAY_WIDTH, DISPLAY_HEIGHT);

		Director.initialise();

		// Development ?
		if (ApplicationConfiguration.isDebug === true) {
			Development.initialise(DISPLAY_WIDTH, DISPLAY_HEIGHT);
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
				this.#onDisplayUpdated();
			}

			// Tick Director
			Director.tick(frameDeltaMS);
		}

		// Tick at Max Frame Rate

		// Tick Render Surface
		RenderSurface.tick(frameDeltaMS);
	}

	// _________________________________________________________________ Display

	#onDisplayUpdated() {
		const DISPLAY_WIDTH = Display.getWidth();
		const DISPLAY_HEIGHT = Display.getHeight();

		ApplicationLogger.log(
			`Controller onDisplayUpdated ${DISPLAY_WIDTH} ${DISPLAY_HEIGHT}`,
			this.#LOG_LEVEL,
		);

		// Set Sizes
		GridData.setSize(DISPLAY_WIDTH, DISPLAY_HEIGHT);
		VideoSurface.setSize(DISPLAY_WIDTH, DISPLAY_HEIGHT);
		RenderSurface.setSize(DISPLAY_WIDTH, DISPLAY_HEIGHT);
		InteractiveSurface.setSize(DISPLAY_WIDTH, DISPLAY_HEIGHT);
		Director.setSize(DISPLAY_WIDTH, DISPLAY_HEIGHT);

		// Development ?
		if (ApplicationConfiguration.isDebug === true) {
			Development.setSize(DISPLAY_WIDTH, DISPLAY_HEIGHT);
		}
	}
}
