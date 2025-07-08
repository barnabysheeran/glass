import ApplicationLogger from '../../../application/ApplicationLogger.js';

import GridData from '../../../grid/GridData.js';

import Dot from './Dot.js';

export default class DotManager {
	#DOTS = [];

	// #dotPoolSize = 1024 * 100;
	// #dotPoolIndex = 0;

	#displayWidthPx = 0;
	#displayHeightPx = 0;

	#LOG_LEVEL = 4;

	// TODO Optimisation. Flatten Dot Class into Fast Arrays

	// _________________________________________________________________________

	constructor(displayWidthPx, displayHeightPx) {
		ApplicationLogger.log('DotManager', this.#LOG_LEVEL);

		// Create Dot Pool
		this.setSize(displayWidthPx, displayHeightPx);
	}

	// ________________________________________________________________ Dot Pool

	getNextFreeDotIndex() {
		return 0;

		// // Store Index for Return
		// let index = this.#dotPoolIndex;

		// // Next
		// this.#dotPoolIndex += 1;

		// // Recycle from Start of Pool
		// if (this.#dotPoolIndex >= this.#dotPoolSize) {
		// 	ApplicationLogger.log(
		// 		`DotManager Reached end of dot pool`,
		// 		this.#LOG_LEVEL,
		// 	);

		// 	this.#dotPoolIndex = 0;
		// }

		// return index;
	}

	// ___________________________________________________________________ Reset

	reset() {
		ApplicationLogger.log('DotManager reset', this.#LOG_LEVEL);
	}

	// ________________________________________________________________ Position

	setDotPosition(dotIndex, positionGrid) {
		// // Get Dot
		// const DOT = this.#DOTS[dotIndex];
		// // Set Position
		// DOT.setPosition(GridData.getGridPixelPosition(positionGrid));
	}

	// ____________________________________________________________________ Fill

	fillDot(dotIndex) {
		// // Get Dot
		// const DOT = this.#DOTS[dotIndex];
		// // Fill
		// DOT.fill();
	}

	// ___________________________________________________________________ Clear

	clearDot(dotIndex) {
		// // Get Dot
		// const DOT = this.#DOTS[dotIndex];
		// // Clear
		// DOT.clear();
	}

	// ____________________________________________________________________ Size

	setSize(displayWidthPx, displayHeightPx) {
		ApplicationLogger.log(
			`DotManager setSize ${displayWidthPx} ${displayHeightPx}`,
			this.#LOG_LEVEL,
		);

		// Get Grid Size
		const GRID_CELL_WIDTH_PX = GridData.getGridCellWidthPx();
		const GRID_CELL_HEIGHT_PX = GridData.getGridCellHeightPx();

		// Store Display Size
		this.#displayWidthPx = displayWidthPx;
		this.#displayHeightPx = displayHeightPx;

		// Calculate grid dimensions
		const gridWidth = Math.floor(this.#displayWidthPx / GRID_CELL_WIDTH_PX);
		const gridHeight = Math.floor(this.#displayHeightPx / GRID_CELL_HEIGHT_PX);

		// Clear existing dots
		this.#DOTS = [];

		ApplicationLogger.log(
			` - Creating ${gridWidth * gridHeight} Dots in a ${gridWidth}x${gridHeight} grid`,
			this.#LOG_LEVEL,
		);

		// Create new dots for the entire grid
		for (let y = 0; y < gridHeight; y++) {
			const row = [];
			for (let x = 0; x < gridWidth; x++) {
				const dot = new Dot();
				const positionGrid = { x, y };
				const positionPx = GridData.getGridPixelPosition(positionGrid);
				dot.setPosition(positionPx);
				row.push(dot);
			}
			this.#DOTS.push(row);
		}
	}
}
