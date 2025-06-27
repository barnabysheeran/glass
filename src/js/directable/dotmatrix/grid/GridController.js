import { Vector2 } from 'three';

import UIGridCell from './UIGridCell';

export default class GridController {
	static #HOLDER;

	static #CELL_WIDTH_PX = 18;
	static #CELL_MARGIN_WIDTH_PX = 6;

	static #CELL_HEIGHT_PX = 18;
	static #CELL_MARGIN_HEIGHT_PX = 6;

	static #CELLS_MAX_WIDTH = 20;
	static #CELLS_MAX_HEIGHT = 20;

	static #CELLS = [];
	static #CELLS_FLAT = [];
	static #CELLS_TOTAL = this.#CELLS_MAX_WIDTH * this.#CELLS_MAX_HEIGHT;

	// _________________________________________________________________________

	static initialise(container) {
		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'grid';
		this.#HOLDER.classList.add('full');
		container.appendChild(this.#HOLDER);

		// Dev - Define CSS Grid
		this.#HOLDER.style.display = 'grid';
		this.#HOLDER.style.gridTemplateColumns = `repeat(${this.#CELLS_MAX_WIDTH}, ${this.#CELL_WIDTH_PX}px)`;
		this.#HOLDER.style.gridTemplateRows = `repeat(${this.#CELLS_MAX_HEIGHT}, ${this.#CELL_HEIGHT_PX}px)`;
		this.#HOLDER.style.gridGap = `${this.#CELL_MARGIN_WIDTH_PX}px ${this.#CELL_MARGIN_HEIGHT_PX}px`;

		// Create Cells
		let i = 0;

		for (let y = 0; y < this.#CELLS_MAX_HEIGHT; y += 1) {
			// Initialise Row
			this.#CELLS[y] = [];

			// Create Cells
			for (let x = 0; x < this.#CELLS_MAX_WIDTH; x += 1) {
				const POSITION_X_PX =
					x * (this.#CELL_WIDTH_PX + this.#CELL_MARGIN_WIDTH_PX);

				const POSITION_Y_PX =
					y * (this.#CELL_HEIGHT_PX + this.#CELL_MARGIN_HEIGHT_PX);

				// Create Cell
				const GRID_CELL = new UIGridCell(i, x, y, POSITION_X_PX, POSITION_Y_PX);

				// Store
				this.#CELLS[y][x] = GRID_CELL;
				this.#CELLS_FLAT.push(GRID_CELL);

				// Next
				i += 1;
			}
		}
	}

	// ____________________________________________________________________ Size

	static setSize(widthPx, heightPx) {
		// TODO Check within screen bounds
	}

	// __________________________________________________________________ Access

	static getCellWidthPx() {
		return this.#CELL_WIDTH_PX;
	}

	static getCellMarginWidthPx() {
		return this.#CELL_MARGIN_WIDTH_PX;
	}

	static getCellHeightPx() {
		return this.#CELL_HEIGHT_PX;
	}

	static getCellMarginHeightPx() {
		return this.#CELL_MARGIN_HEIGHT_PX;
	}

	static getMaxWidthPx() {
		const MARGINS_TOTAL = this.#CELLS_MAX_WIDTH - 1;

		return (
			this.#CELLS_MAX_WIDTH * this.#CELL_WIDTH_PX +
			MARGINS_TOTAL * this.#CELL_MARGIN_WIDTH_PX
		);
	}

	static getMaxHeightPx() {
		const MARGINS_TOTAL = this.#CELLS_MAX_HEIGHT - 1;

		return (
			this.#CELLS_MAX_HEIGHT * this.#CELL_HEIGHT_PX +
			MARGINS_TOTAL * this.#CELL_MARGIN_HEIGHT_PX
		);
	}

	// _______________________________________________________________ Grid Cell

	static getRandomGridCell() {
		const Y = Math.floor(Math.random() * this.#CELLS_MAX_HEIGHT);
		const X = Math.floor(Math.random() * this.#CELLS_MAX_WIDTH);

		return this.#CELLS[Y][X];
	}

	static getRandomEmptyGridCell() {
		// Get Random Cell Index
		const RANDOM_CELL_INDEXES = this.#generateRandomOrderCellIndexes();

		for (let i = 0; i < RANDOM_CELL_INDEXES.length; i += 1) {
			const CELL_INDEX = RANDOM_CELL_INDEXES[i];

			if (this.getIsGridCellEmpty(CELL_INDEX) === true) {
				return this.#getGridCellByIndex(CELL_INDEX);
			}
		}

		return undefined;
	}

	static getIsGridCellEmpty(gridCellIndex) {
		return this.#getGridCellByIndex(gridCellIndex).getIsEmpty();
	}

	static setGridCellOccupied(gridCellIndex) {
		// TODO Check Unoccupied

		this.#getGridCellByIndex(gridCellIndex).setOccupied();
	}

	// _______________________________________________________________ Rectangle

	static getRandomEmptyRectangle(rectangleWidthCells, rectangleHeightCells) {
		// Get Random Cell Index
		// const RANDOM_CELL_INDEXES = this.#generateRandomOrderCellIndexes();

		// TODO Generate Once Only
		const RANDOM_CELL_INDEXES = this.#generateCenteredRectangleIndexes();

		for (let i = 0; i < RANDOM_CELL_INDEXES.length; i += 1) {
			const CELL_INDEX = RANDOM_CELL_INDEXES[i];

			if (
				this.getIsRectangleEmpty(
					CELL_INDEX,
					rectangleWidthCells,
					rectangleHeightCells,
				) === true
			) {
				return this.#getGridCellByIndex(CELL_INDEX);
			}
		}

		return undefined;
	}

	static getIsRectangleEmpty(gridCellIndex, gridWidth, gridHeight) {
		// Get Grid Cell
		const GRID_CELL = this.#getGridCellByIndex(gridCellIndex);

		// Distance from Right
		const GRID_DISTANCE_FROM_RIGHT =
			this.#CELLS_MAX_WIDTH - GRID_CELL.getCellPositionX() - gridWidth;

		if (GRID_DISTANCE_FROM_RIGHT < 0) {
			return false;
		}

		// Distance from Bottom
		const GRID_DISTANCE_FROM_BOTTOM =
			this.#CELLS_MAX_HEIGHT - GRID_CELL.getCellPositionY() - gridHeight;

		if (GRID_DISTANCE_FROM_BOTTOM < 0) {
			return false;
		}

		// Check Grid Cells
		for (let y = 0; y < gridHeight; y += 1) {
			for (let x = 0; x < gridWidth; x += 1) {
				const INDEX = gridCellIndex + y * this.#CELLS_MAX_WIDTH + x;

				if (this.#CELLS_FLAT[INDEX].getIsEmpty() === false) {
					return false;
				}
			}
		}

		return true;
	}

	static setRectangleOccupied(gridCellIndex, gridWidth, gridHeight) {
		// TODO Check Unoccupied

		// Mark as Occupied
		for (let y = 0; y < gridHeight; y += 1) {
			for (let x = 0; x < gridWidth; x += 1) {
				const INDEX = gridCellIndex + y * this.#CELLS_MAX_WIDTH + x;

				this.#CELLS_FLAT[INDEX].setOccupied();
			}
		}
	}

	static clearGridCells_Rectangle(gridCellIndex, gridWidth, gridHeight) {
		// TODO
	}

	// ____________________________________________________________________ Util

	static #getGridCellByIndex(gridCellIndex) {
		// console.log(`UIGridController getGridCellByIndex ${gridCellIndex}`);

		const Y = Math.floor(gridCellIndex / this.#CELLS_MAX_WIDTH);
		const X = gridCellIndex % this.#CELLS_MAX_WIDTH;

		return this.#CELLS[Y][X];
	}

	static getIsCellInTopRow(gridCellIndex) {
		return gridCellIndex < this.#CELLS_MAX_WIDTH;
	}

	static getIsCellInBottomRow(gridCellIndex) {
		return (
			gridCellIndex >= this.#CELLS_MAX_WIDTH * (this.#CELLS_MAX_HEIGHT - 1)
		);
	}

	static getIsCellInLeftColumn(gridCellIndex) {
		return gridCellIndex % this.#CELLS_MAX_WIDTH === 0;
	}

	static getIsCellInRightColumn(gridCellIndex) {
		return gridCellIndex % this.#CELLS_MAX_WIDTH === this.#CELLS_MAX_WIDTH - 1;
	}

	// ____________________________________________________________________ Util

	static #generateRandomOrderCellIndexes() {
		const CELL_INDEXES = [];

		for (let i = 0; i < this.#CELLS_TOTAL; i += 1) {
			CELL_INDEXES.push(i);
		}

		// Shuffle
		for (let i = CELL_INDEXES.length - 1; i > 0; i -= 1) {
			const J = Math.floor(Math.random() * (i + 1));
			[CELL_INDEXES[i], CELL_INDEXES[J]] = [CELL_INDEXES[J], CELL_INDEXES[i]];
		}

		return CELL_INDEXES;
	}

	// ________________________________________________________ Centered Indexes

	static #generateCenteredRectangleIndexes() {
		console.log('UIGridController #generateCenteredRectangleIndexes');

		const CELL_INDEXES = [];

		// Add All
		for (let i = 0; i < this.#CELLS_TOTAL; i += 1) {
			CELL_INDEXES.push(i);
		}

		// Sort
		CELL_INDEXES.sort((a, b) => this.#sortCellsByDistanceFromCenter(a, b));

		return CELL_INDEXES;
	}

	static #sortCellsByDistanceFromCenter(a, b) {
		const CENTER = new Vector2(
			Math.floor(this.#CELLS_MAX_WIDTH / 2),
			Math.floor(this.#CELLS_MAX_HEIGHT / 2),
		);

		const CELL_A_CELL_POSITION = this.#getGridCellByIndex(a).getCellPosition();
		const CELL_B_CELL_POSITION = this.#getGridCellByIndex(b).getCellPosition();

		const DISTANCE_A = CELL_A_CELL_POSITION.distanceTo(CENTER);
		const DISTANCE_B = CELL_B_CELL_POSITION.distanceTo(CENTER);

		return DISTANCE_A - DISTANCE_B;
	}
}
