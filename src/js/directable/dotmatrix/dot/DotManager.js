import ApplicationLogger from '../../../application/ApplicationLogger.js';

import GridData from '../../../grid/GridData.js';

import Dot from './Dot.js';

export default class DotManager {
	#DOTS = [];
	#dotPoolSize = 10240;
	#dotPoolIndex = 0;

	#LOG_LEVEL = 4;

	// TODO Optimisation. Flatten Dot Class into Fast Arrays

	// _________________________________________________________________________

	constructor() {
		ApplicationLogger.log('DotManager', this.#LOG_LEVEL);

		// Create Dot Pool
		for (let i = 0; i < this.#dotPoolSize; i += 1) {
			const dot = new Dot(i);
			this.#DOTS.push(dot);
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
		// ApplicationLogger.log(
		// 	`DotManager setDotPosition dotIndex ${dotIndex} positionGrid ${positionGrid}`,
		// 	this.#LOG_LEVEL,
		// );

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
