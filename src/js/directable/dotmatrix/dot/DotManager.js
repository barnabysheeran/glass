import ApplicationLogger from '../../../application/ApplicationLogger.js';

import GridData from '../grid/GridData.js';

import Dot from './Dot.js';

export default class DotManager {
	#DOTS = [];
	#dotPoolSize = 512;
	#dotPoolIndex = 0;

	#LOG_LEVEL = 5;

	// _________________________________________________________________________

	constructor() {
		ApplicationLogger.log('DotManager', this.#LOG_LEVEL);

		// Create Dot Pool
		for (let i = 0; i < this.#dotPoolSize; i += 1) {
			const dot = new Dot(i);
			this.#DOTS.push(dot);
		}
	}

	// ____________________________________________________________________ Tick

	tick() {
		for (let i = 0; i < this.#DOTS.length; i += 1) {
			this.#DOTS[i].tick();
		}
	}

	// ________________________________________________________________ Dot Pool

	getNextFreeDotIndex() {
		let index = this.#dotPoolIndex;

		// Next
		this.#dotPoolIndex += 1;

		// Recycle from Start of Pool
		if (this.#dotPoolIndex >= this.#dotPoolSize) {
			this.#dotPoolIndex = 0;
		}

		return index;
	}

	// ________________________________________________________________ Position

	setDotPosition(dotIndex, positionGrid) {
		// Get Dot
		const DOT = this.#DOTS[dotIndex];

		// Set Position
		DOT.setPosition(GridData.getGridPixelPosition(positionGrid));
	}

	// ____________________________________________________________________ Fill

	fillDot(dotIndex) {
		// Get Dot
		const DOT = this.#DOTS[dotIndex];

		// Fill
		DOT.fill();
	}

	// ___________________________________________________________________ Clear

	clearDot(dotIndex) {
		// Get Dot
		const DOT = this.#DOTS[dotIndex];

		// Clear
		DOT.clear();
	}

	// __________________________________________________________________ Status

	LogStatus() {
		ApplicationLogger.log(
			`DotManager. Index ${this.#dotPoolIndex} of ${this.#dotPoolSize} Dots`,
			this.#LOG_LEVEL,
		);

		// Debug.Log("DotManager. Index " + #dotPoolIndex + " of " + #dotPoolSize + " Dots");
	}
}
