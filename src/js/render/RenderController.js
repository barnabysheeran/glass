import ApplicationConfiguration from '../application/ApplicationConfiguration.js';
import ApplicationLogger from '../application/ApplicationLogger.js';

import RenderSurface from './RenderSurface.js';

export default class RenderController {
	static #RENDER_SURFACE;

	static #LOG_LEVEL = 2;

	// _________________________________________________________________________

	static initialise() {
		ApplicationLogger.log('Overlay initialise', this.#LOG_LEVEL);

		// Get Application Container
		const APPLICATION_CONTAINER =
			ApplicationConfiguration.getApplicationContainer();

		// Create Render Surface
		this.#RENDER_SURFACE = new RenderSurface();

		// Append Render Canvas
		APPLICATION_CONTAINER.appendChild(this.#RENDER_SURFACE.getCanvas());
	}

	// ____________________________________________________________________ Tick

	static tick(frameDeltaMS) {
		// Render Surface
		this.#RENDER_SURFACE.render();

		// Draw the RenderSurface's texture to its canvas for display
		this.#RENDER_SURFACE.displayOnCanvas();
	}

	// ____________________________________________________________________ Size

	static setSize(width, height) {
		// Resize
		this.#RENDER_SURFACE.setSize(width, height);
	}
}
