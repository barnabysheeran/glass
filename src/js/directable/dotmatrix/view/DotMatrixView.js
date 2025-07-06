export default class DotMatrixView {
	SHAPE_MANAGER;
	COMPONENTS = [];

	#VIEW_ID = '';

	// _________________________________________________________________________

	constructor(shapeManager, viewId) {
		// Store
		this.SHAPE_MANAGER = shapeManager;
		this.#VIEW_ID = viewId;
	}

	// ___________________________________________________________________ Start

	start() {} // Stub

	stop() {} // Stub

	// ____________________________________________________________________ Tick

	tick() {
		// Tick Components
		for (let i = 0; i < this.COMPONENTS.length; i += 1) {
			this.COMPONENTS[i].tick();
		}
	}

	// ___________________________________________________________________ Reset

	reset() {
		// Destroy Components
		for (let i = 0; i < this.COMPONENTS.length; i += 1) {
			this.COMPONENTS[i].destroy();
		}

		// Reset Components
		this.COMPONENTS = [];
	}

	// ____________________________________________________________________ Delay

	getDelayFromGridY(gridY) {
		// TODO Hardcoded delay
		return gridY * 10;
	}

	// __________________________________________________________________ Access

	getViewId() {
		return this.#VIEW_ID;
	}
}
