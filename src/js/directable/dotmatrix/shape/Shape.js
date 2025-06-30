import ApplicationLogger from '../../../application/ApplicationLogger.js';

export default class Shape {
	#SHAPE_ID;

	#positionGridsIndex = 0;
	positionGrids = [];

	#dotManager;
	#isComplete = false;

	#LOG_LEVEL = -1; // 7;

	// _________________________________________________________________________

	constructor(dotManager) {
		ApplicationLogger.log('Shape', this.#LOG_LEVEL);

		// Generate Unique ID
		this.#SHAPE_ID = crypto.randomUUID();

		// Store
		this.#dotManager = dotManager;
	}

	// ____________________________________________________________________ Tick

	tick() {
		// ApplicationLogger.log(
		// 	`Shape tick positionGridsIndex ${this.#positionGridsIndex}`,
		// 	this.#LOG_LEVEL,
		// );

		// Complete ?
		if (this.#isComplete) {
			return;
		}

		// Get Dot Index
		let dotIndex = this.#dotManager.getNextFreeDotIndex();

		// Clear Current Dot
		this.#dotManager.clearDot(dotIndex);

		// Position
		this.#dotManager.setDotPosition(
			dotIndex,
			this.positionGrids[this.#positionGridsIndex],
		);

		// Fill Dot
		this.#dotManager.fillDot(dotIndex);

		// Increment Index
		this.#positionGridsIndex += 1;

		// Check Complete
		if (this.#positionGridsIndex >= this.positionGrids.length) {
			this.#isComplete = true;

			return;
		}
	}

	// _________________________________________________________________ Restart

	redraw() {
		ApplicationLogger.log('Shape redraw', this.#LOG_LEVEL);

		// Reset Index
		this.#positionGridsIndex = 0;

		// Reset Complete
		this.#isComplete = false;

		// TODO Clear Dots ?

		// // Clear Dots
		// this.#dotManager.clearDots();
	}

	// __________________________________________________________________ Access

	getShapeId() {
		ApplicationLogger.log(
			`Shape getShapeId ${this.#SHAPE_ID}`,
			this.#LOG_LEVEL,
		);

		return this.#SHAPE_ID;
	}
}
