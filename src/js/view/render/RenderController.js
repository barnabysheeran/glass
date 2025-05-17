import ApplicationConfiguration from '../../application/ApplicationConfiguration.js';

import RenderResizer from './RenderResizer.js';
import RenderSurface from './RenderSurface.js';

export default class RenderController {
	#HOLDER;

	#RENDER_RESIZER;
	#RENDER_SURFACE;

	// _________________________________________________________________________

	constructor() {
		// Get Application Container
		const APPLICATION_CONTAINER =
			ApplicationConfiguration.getApplicationContainer();

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'render-holder';
		APPLICATION_CONTAINER.appendChild(this.#HOLDER);

		// Create Render Surface
		this.#RENDER_SURFACE = new RenderSurface();

		const RENDER_CANVAS = this.#RENDER_SURFACE.getCanvas();

		// Create Render Resizer
		this.#RENDER_RESIZER = new RenderResizer(this.#HOLDER);

		// Add to Application Container
		this.#HOLDER.appendChild(RENDER_CANVAS);
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {
		// Update the content of the RenderSurface (e.g., draw the red square into its texture)
		const DID_RESIZE_THIS_FRAME = this.#RENDER_RESIZER.tick();

		console.log(
			`RenderController.tick: RenderSurface.render() - ${DID_RESIZE_THIS_FRAME}`,
		);

		if (DID_RESIZE_THIS_FRAME) {
			// Resize the RenderSurface if the RenderResizer indicates a resize
			this.#RENDER_SURFACE.setSize(
				this.#RENDER_RESIZER.getWidth(),
				this.#RENDER_RESIZER.getHeight(),
			);
		}

		this.#RENDER_SURFACE.render();

		// Draw the RenderSurface's texture to its canvas for display
		this.#RENDER_SURFACE.displayOnCanvas();
	}
}
