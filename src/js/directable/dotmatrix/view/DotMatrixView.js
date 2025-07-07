import InteractiveSurface from '../../../interactive/InteractiveSurface.js';

export default class DotMatrixView {
	SHAPE_MANAGER;

	COMPONENTS = [];
	INTERACTIVE_BLOCK_IDS = [];

	#VIEW_ID = '';

	// _________________________________________________________________________

	constructor(shapeManager, viewId) {
		// Store
		this.SHAPE_MANAGER = shapeManager;
		this.#VIEW_ID = viewId;
	}

	// ___________________________________________________________________ Start

	start() {} // Stub

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

		// Destroy Interactive Blocks
		for (let i = 0; i < this.INTERACTIVE_BLOCK_IDS.length; i += 1) {
			InteractiveSurface.removeBlock(this.INTERACTIVE_BLOCK_IDS[i]);
		}

		// Reset Interactive Block Ids
		this.INTERACTIVE_BLOCK_IDS = [];
	}

	// ___________________________________________________________________ Delay

	getDelayFromGridY(gridY) {
		// TODO Hardcoded delay
		return gridY * 10;
	}

	// __________________________________________________________________ Access

	getViewId() {
		return this.#VIEW_ID;
	}
}
