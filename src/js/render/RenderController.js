import ApplicationConfiguration from '../application/ApplicationConfiguration.js';
import ApplicationLogger from '../application/ApplicationLogger.js';

import RenderResizer from '../display/RenderResizer.js';
import RenderSurface from './RenderSurface.js';

export default class RenderController {
	static #RENDER_RESIZER;
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

		// Create Render Resizer
		this.#RENDER_RESIZER = new RenderResizer(this.#RENDER_SURFACE.getCanvas());
	}

	// ____________________________________________________________________ Tick

	static tick(frameDeltaMS) {
		// Resized ?
		const DID_RESIZE_THIS_FRAME = this.#RENDER_RESIZER.tick();

		if (DID_RESIZE_THIS_FRAME) {
			// Resize
			this.#RENDER_SURFACE.setSize(
				this.#RENDER_RESIZER.getWidth(),
				this.#RENDER_RESIZER.getHeight(),
			);
		}

		// Render
		this.#RENDER_SURFACE.render();

		// Draw the RenderSurface's texture to its canvas for display
		this.#RENDER_SURFACE.displayOnCanvas();
	}
}
