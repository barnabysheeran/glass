import ApplicationConfiguration from '../../application/ApplicationConfiguration.js';

import RenderResizer from './RenderResizer.js';
import RenderSurface from './RenderSurface.js';

export default class RenderController {
	#RENDER_RESIZER;
	#RENDER_SURFACE;

	// _________________________________________________________________________

	constructor() {
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

	tick(frameDeltaMS) {
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
