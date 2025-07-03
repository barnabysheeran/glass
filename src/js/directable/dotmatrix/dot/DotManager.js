import ApplicationLogger from '../../../application/ApplicationLogger.js';

import GridData from '../../../grid/GridData.js';

import Dot from './Dot.js';

export default class DotManager {
	#DOTS = [];
	#dotPoolSize = 1024 * 100;
	#dotPoolIndex = 0;

	#LOG_LEVEL = 4;

	// TODO Optimisation. Flatten Dot Class into Fast Arrays

	// _________________________________________________________________________

	constructor() {
		ApplicationLogger.log('DotManager', this.#LOG_LEVEL);

		// Create Dot Pool
		for (let i = 0; i < this.#dotPoolSize; i += 1) {
			this.#DOTS.push(new Dot(i));
		}
	}

	// ________________________________________________________________ Dot Pool

	getNextFreeDotIndex() {
		// Store Index for Return
		let index = this.#dotPoolIndex;

		// Next
		this.#dotPoolIndex += 1;

		// Recycle from Start of Pool
		if (this.#dotPoolIndex >= this.#dotPoolSize) {
			ApplicationLogger.log(
				`DotManager Reached end of dot pool`,
				this.#LOG_LEVEL,
			);

			this.#dotPoolIndex = 0;
		}

		return index;
	}

	// ___________________________________________________________________ Reset

	reset() {
		ApplicationLogger.log('DotManager reset', this.#LOG_LEVEL);

		// Reset Dots
		for (let i = 0; i < this.#DOTS.length; i += 1) {
			this.#DOTS[i].reset();
		}

		// Reset Dot Pool Index
		this.#dotPoolIndex = 0;
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
}
