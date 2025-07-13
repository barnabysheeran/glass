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

	start(delayFrames) {
		ApplicationLogger.log(
			`DotMatrixView start ${this.#VIEW_ID} delay ${delayFrames}`,
			this.#LOG_LEVEL,
		);

		// Active
		this.isActive = true;
	}

	// ____________________________________________________________________ Stop

	stop(delayFrames) {
		ApplicationLogger.log(
			`DotMatrixView stop ${this.#VIEW_ID} delay ${delayFrames}`,
			this.#LOG_LEVEL,
		);

		// Clear Interactive Blocks
		this.#clearInteractiveBlocks();

		// Inactive
		this.isActive = false;
	}

	// ____________________________________________________________________ Draw

	draw(delayFrames) {
		ApplicationLogger.log(
			`DotMatrixView draw ${this.#VIEW_ID} delay ${delayFrames}`,
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

	undraw(delayFrames) {
		ApplicationLogger.log(
			`DotMatrixView undraw ${this.#VIEW_ID} delay ${delayFrames}`,
			this.#LOG_LEVEL,
		);
	}

	// ____________________________________________________________________ Tick

	tick() {} // Stub

	// ___________________________________________________________________ Reset

	#clearInteractiveBlocks() {
		ApplicationLogger.log(
			`DotMatrixView clearInteractiveBlocks ${this.#VIEW_ID}`,
			this.#LOG_LEVEL,
		);

		// Destroy Interactive Blocks
		for (let i = 0; i < this.INTERACTIVE_BLOCK_IDS.length; i += 1) {
			ApplicationLogger.log(
				` - Removing Block ${this.INTERACTIVE_BLOCK_IDS[i]}`,
				this.#LOG_LEVEL,
			);

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
