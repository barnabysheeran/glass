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
		// Get Grid Data
		const GRID_WIDTH_IN_CELLS = GridData.getGridWidthInCells();

		// Check bounds
		if (
			positionGridX < 0 ||
			positionGridX >= GRID_WIDTH_IN_CELLS ||
			positionGridY < 0
		) {
			return -1;
		}

		const index = positionGridY * GRID_WIDTH_IN_CELLS + positionGridX;

		if (index >= this.#DOTS.length) {
			return -1;
		}

		return index;
	}

	// ____________________________________________________________________ Fill

	fillDot(dotIndex) {
		this.#DOTS[dotIndex].fill();
	}

	// ___________________________________________________________________ Clear

	clearDot(dotIndex) {
		this.#DOTS[dotIndex].clear();
	}

	// ___________________________________________________________________ Reset

	reset() {
		ApplicationLogger.log('DotManager reset', this.#LOG_LEVEL);

		// Clear Dots
		for (let i = 0; i < this.#DOTS.length; i++) {
			this.#DOTS[i].clear();
		}
	}

	// ____________________________________________________________________ Size

	setSize(displayWidthPx, displayHeightPx) {
		ApplicationLogger.log(
			`DotManager setSize ${displayWidthPx} ${displayHeightPx}`,
			this.#LOG_LEVEL,
		);

		// Get Grid Data
		const GRID_WIDTH_IN_CELLS = GridData.getGridWidthInCells();
		const GRID_HEIGHT_IN_CELLS = GridData.getGridHeightInCells();

		// TODO Keep existing dots on resize

		// Clear existing dots
		this.#DOTS = [];

		// Create new dots for the entire grid
		for (let y = 0; y < GRID_WIDTH_IN_CELLS; y++) {
			for (let x = 0; x < GRID_HEIGHT_IN_CELLS; x++) {
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
