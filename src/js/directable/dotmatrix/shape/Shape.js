import ApplicationLogger from '../../../application/ApplicationLogger.js';

export default class Shape {
	#positionGridsIndex = 0;
	positionGrids = [];

	#dotManager;
	#isComplete = false;

	#LOG_LEVEL = 7;

	// _________________________________________________________________________

	constructor(dotManager) {
		ApplicationLogger.log('Shape', this.#LOG_LEVEL);

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

		// if (dotIndex == -1)
		// {
		//     Debug.Log("ShapeLineHorizontal. No more free Dots");
		//     break;
		// }

		// TODO -1 Off Grid ?

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
}
