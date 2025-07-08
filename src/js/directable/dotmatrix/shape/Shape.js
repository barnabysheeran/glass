import ApplicationLogger from '../../../application/ApplicationLogger.js';

export default class Shape {
	#SHAPE_ID;

	#positionGridsIndex = 0;
	positionGrids = [];

	#dotManager;
	#isComplete = false;

	#delay = 0;

	#LOG_LEVEL = -1; // 7;

	// _________________________________________________________________________

	constructor(dotManager, delay = 0) {
		ApplicationLogger.log('Shape', this.#LOG_LEVEL);

		// Store Delay
		this.#delay = delay;

		// Generate Unique ID
		this.#SHAPE_ID = crypto.randomUUID();

		// Store
		this.#dotManager = dotManager;
	}

	// ____________________________________________________________________ Tick

	tick() {
		// Complete ?
		if (this.#isComplete) {
			return;
		}

		// Delay
		if (this.#delay > 0) {
			this.#delay -= 1;

			ApplicationLogger.log(`Shape delay ${this.#delay}`, this.#LOG_LEVEL);

			return;
		}

		// Get Position Grid
		const POSITION_GRID = this.positionGrids[this.#positionGridsIndex];

		// Get Dot Index
		let DOT_INDEX = this.#dotManager.getDotIndexAtGrid(
			POSITION_GRID[0],
			POSITION_GRID[1],
		);

		// Fill Dot
		if (DOT_INDEX > -1) {
			this.#dotManager.fillDot(DOT_INDEX);
		}

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
	}

	undraw() {}

	// __________________________________________________________________ Access

	getShapeId() {
		ApplicationLogger.log(
			`Shape getShapeId ${this.#SHAPE_ID}`,
			this.#LOG_LEVEL,
		);

		return this.#SHAPE_ID;
	}
}
