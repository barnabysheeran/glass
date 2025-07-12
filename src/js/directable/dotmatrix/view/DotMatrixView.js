import ApplicationLogger from '../../../application/ApplicationLogger.js';
import InteractiveSurface from '../../../interactive/InteractiveSurface.js';

export default class DotMatrixView {
	SHAPE_MANAGER;
	COMPONENT_MANAGER;

	INTERACTIVE_BLOCK_IDS = [];

	#VIEW_ID = '';

	#LOG_LEVEL = 4;

	// _________________________________________________________________________

	constructor(shapeManager, componentManager, viewId) {
		ApplicationLogger.log(`DotMatrixView ${viewId}`, this.#LOG_LEVEL);

		// Store
		this.SHAPE_MANAGER = shapeManager;
		this.COMPONENT_MANAGER = componentManager;
		this.#VIEW_ID = viewId;
	}

	// ____________________________________________________________________ Draw

	draw() {} // Stub

	// __________________________________________________________________ Undraw

	undraw() {} // Stub

	// ____________________________________________________________________ Tick

	tick() {} // Stub

	// ___________________________________________________________________ Reset

	reset() {
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
