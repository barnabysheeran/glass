import RenderSurface from './RenderSurface.js';

export default class RenderController {
	#RENDER_SURFACE;

	// _________________________________________________________________________

	constructor() {
		// Create Render Surface
		this.#RENDER_SURFACE = new RenderSurface();
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {
		// Render
		this.#RENDER_SURFACE.render();
	}
}
