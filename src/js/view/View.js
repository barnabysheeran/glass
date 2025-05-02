import RenderController from './RenderController.js';

export default class View {
	static #RENDER_CONTROLLER;

	// _________________________________________________________________________

	static initialise() {
		// Create Render Controller
		this.#RENDER_CONTROLLER = new RenderController();
	}

	// ____________________________________________________________________ Tick

	static tick(frameDeltaMS) {
		// Tick Render Controller
		this.#RENDER_CONTROLLER.tick(frameDeltaMS);
	}
}
