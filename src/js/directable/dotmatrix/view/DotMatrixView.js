import ApplicationLogger from '../../../application/ApplicationLogger.js';
import InteractiveSurface from '../../../interactive/InteractiveSurface.js';

export default class DotMatrixView {
	SHAPE_MANAGER;
	COMPONENT_MANAGER;

	INTERACTIVE_BLOCK_IDS = [];

	#VIEW_ID = '';

	isActive = false;

	#LOG_LEVEL = 4;

	// _________________________________________________________________________

	constructor(shapeManager, componentManager, viewId) {
		ApplicationLogger.log(`DotMatrixView ${viewId}`, this.#LOG_LEVEL);

		// Store
		this.SHAPE_MANAGER = shapeManager;
		this.COMPONENT_MANAGER = componentManager;
		this.#VIEW_ID = viewId;
	}

	// ___________________________________________________________________ Start

	start(startDelayFrames = 0) {
		ApplicationLogger.log(
			`DotMatrixView start ${this.#VIEW_ID} delay ${startDelayFrames}`,
			this.#LOG_LEVEL,
		);

		// Active
		this.isActive = true;
	}

	stop() {
		ApplicationLogger.log(
			`DotMatrixView stop ${this.#VIEW_ID}`,
			this.#LOG_LEVEL,
		);

		// Inactive
		this.isActive = false;
	}

	// ____________________________________________________________________ Draw

	draw() {
		ApplicationLogger.log(
			`DotMatrixView draw ${this.#VIEW_ID}`,
			this.#LOG_LEVEL,
		);
	}

	onDrawComplete() {
		ApplicationLogger.log(
			`DotMatrixView onDrawComplete ${this.#VIEW_ID}`,
			this.#LOG_LEVEL,
		);
	}

	// __________________________________________________________________ Undraw

	undraw() {
		ApplicationLogger.log(
			`DotMatrixView undraw ${this.#VIEW_ID}`,
			this.#LOG_LEVEL,
		);
	}

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

	// __________________________________________________________________ Access

	getViewId() {
		return this.#VIEW_ID;
	}
}
