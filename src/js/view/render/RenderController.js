import ApplicationConfiguration from '../../application/ApplicationConfiguration.js';

import RenderResizer from './RenderResizer.js';
import RenderSurface from './RenderSurface.js';

export default class RenderController {
	#RENDER_RESIZER;
	#RENDER_SURFACE;

	// _________________________________________________________________________

	constructor() {
		// Create Render Resizer
		this.#RENDER_RESIZER = new RenderResizer();

		// Create Render Surface
		this.#RENDER_SURFACE = new RenderSurface();

		// Add to Application Container
		const APPLICATION_CONTAINER =
			ApplicationConfiguration.getApplicationContainer();

		APPLICATION_CONTAINER.appendChild(this.#RENDER_SURFACE.getCanvas());
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {
		// Update the content of the RenderSurface (e.g., draw the red square into its texture)
		this.#RENDER_SURFACE.render();

		// Draw the RenderSurface's texture to its canvas for display
		this.#RENDER_SURFACE.displayOnCanvas();
	}
}
