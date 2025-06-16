import ComponentLineWidthFull from './line/ComponentLineWidthFull.js';

export default class ComponentManager {
	#SHAPE_MANAGER;

	#COMPONENTS = [];

	// _________________________________________________________________________

	constructor(shapeManager) {
		// Store
		this.#SHAPE_MANAGER = shapeManager;
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {
		// Tick Components
		for (let i = 0; i < this.#COMPONENTS.length; i += 1) {
			this.#COMPONENTS[i].tick(frameDeltaMS);
		}
	}

	// __________________________________________________________________ Redraw

	redraw() {
		// Redraw Components
		for (let i = 0; i < this.#COMPONENTS.length; i += 1) {
			this.#COMPONENTS[i].redraw();
		}
	}

	// _________________________________________________________ Line Width Full

	addComponentLineWidthFull(gridY) {
		// Create Component
		const COMPONENT_LINE_WIDTH_FULL = new ComponentLineWidthFull(gridY);

		// Store
		this.#COMPONENTS.push(COMPONENT_LINE_WIDTH_FULL);
	}
}
