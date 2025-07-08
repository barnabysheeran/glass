import ApplicationLogger from '../../../application/ApplicationLogger.js';

import GridData from '../../../grid/GridData.js';

import Dot from './Dot.js';

export default class DotManager {
	#DOTS = [];

	#displayWidthPx = 0;
	#displayHeightPx = 0;

	#LOG_LEVEL = 4;

	// _________________________________________________________________________

	constructor(displayWidthPx, displayHeightPx) {
		ApplicationLogger.log('DotManager', this.#LOG_LEVEL);

		// Create Dots
		this.setSize(displayWidthPx, displayHeightPx);
	}

	// ________________________________________________________________ Dot Pool

	getDotIndexAtGrid(positionGridX, positionGridY) {
		console.log(
			`DotManager getDotIndexAtGrid ${positionGridX} ${positionGridY}`,
		);

		// Get Grid Max
		const GRID_MAX = GridData.getGridMax();
		const GRID_MAX_WIDTH = GRID_MAX[0];
		// const GRID_MAX_HEIGHT = GRID_MAX[1];

		// Check bounds
		if (
			positionGridX < 0 ||
			positionGridX >= GRID_MAX_WIDTH ||
			positionGridY < 0
		) {
			return -1;
		}

		const index = positionGridY * GRID_MAX_WIDTH + positionGridX;

		if (index >= this.#DOTS.length) {
			return -1;
		}

		// console.log(` - Dot Index: ${index}`);

		return index;
	}

	// ____________________________________________________________________ Fill

	fillDot(dotIndex) {
		console.log(`DotManager fillDot ${dotIndex}`);

		this.#DOTS[dotIndex].fill();
	}

	// ___________________________________________________________________ Clear

	clearDot(dotIndex) {
		this.#DOTS[dotIndex].clear();
	}

	// ___________________________________________________________________ Reset

	reset() {
		ApplicationLogger.log('DotManager reset', this.#LOG_LEVEL);

		// TODO
	}

	// ____________________________________________________________________ Size

	setSize(displayWidthPx, displayHeightPx) {
		ApplicationLogger.log(
			`DotManager setSize ${displayWidthPx} ${displayHeightPx}`,
			this.#LOG_LEVEL,
		);

		// Get Grid Max
		const GRID_MAX = GridData.getGridMax();
		const GRID_MAX_WIDTH = GRID_MAX[0];
		const GRID_MAX_HEIGHT = GRID_MAX[1];

		// Clear existing dots
		this.#DOTS = [];

		// Create new dots for the entire grid
		for (let y = 0; y < GRID_MAX_WIDTH; y++) {
			for (let x = 0; x < GRID_MAX_HEIGHT; x++) {
				// TODO Create Dot with Position

				const dot = new Dot();
				const positionGrid = [x, y];
				const positionPx = GridData.getGridPixelPosition(positionGrid);

				dot.setPosition(positionPx);
				this.#DOTS.push(dot);
			}
		}

		// Store Display Size
		this.#displayWidthPx = displayWidthPx;
		this.#displayHeightPx = displayHeightPx;
	}
}
