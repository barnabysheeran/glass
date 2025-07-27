import ApplicationLogger from '../../../application/ApplicationLogger.js';
import InteractiveSurface from '../../../interactive/InteractiveSurface.js';

import DrawType from '../enum/DrawType.js';

export default class View {
	SHAPE_MANAGER;
	COMPONENT_MANAGER;

	INTERACTIVE_BLOCK_IDS = [];

	#VIEW_ID;

	isActive = false;

	#LOG_LEVEL = 4; // -1;

	// _________________________________________________________________________

	constructor(shapeManager, componentManager, viewId) {
		ApplicationLogger.log(`View '${viewId}'`, this.#LOG_LEVEL);

		// Store
		this.SHAPE_MANAGER = shapeManager;
		this.COMPONENT_MANAGER = componentManager;
		this.#VIEW_ID = viewId;
	}

	// ___________________________________________________________________ Start

	start(delayFrames = 0) {
		ApplicationLogger.log(
			`View '${this.#VIEW_ID}' start delay ${delayFrames}`,
			this.#LOG_LEVEL,
		);

		// Active
		this.isActive = true;
	}

	// ____________________________________________________________________ Stop

	stop(delayFrames = 0) {
		ApplicationLogger.log(
			`View '${this.#VIEW_ID}' stop delay ${delayFrames}`,
			this.#LOG_LEVEL,
		);

		// Clear Interactive Blocks
		this.#clearInteractiveBlocks();

		// Inactive
		this.isActive = false;
	}

	// ____________________________________________________________________ Draw

	draw(delayFrames = 0, drawType = DrawType.Fill) {
		ApplicationLogger.log(
			`View '${this.#VIEW_ID}' draw delay ${delayFrames} drawType ${drawType}`,
			this.#LOG_LEVEL,
		);
	}

	onDrawComplete() {
		ApplicationLogger.log(
			`View '${this.#VIEW_ID}' onDrawComplete`,
			this.#LOG_LEVEL,
		);
	}

	// ____________________________________________________________________ Tick

	tick() {} // Stub

	// ___________________________________________________________________ Reset

	#clearInteractiveBlocks() {
		ApplicationLogger.log(
			`View '${this.#VIEW_ID}' clearInteractiveBlocks`,
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
