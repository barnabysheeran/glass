import { vec2 } from 'gl-matrix';

export default class GridData {
	static #gridCellWidthPx = 8;
	static #gridCellHeightPx = 8;

	static #resolutionWidth = 0;
	static #resolutionHeight = 0;

	// Flat data structure for grid cells
	static #grid = [];
	static #occupied = new Uint8Array();
	static #gridWidthInCells = 0;
	static #gridHeightInCells = 0;

	// ______________________________________________________________ Initialize

	static initialize(width, height) {
		// Set Initial Size
		this.setSize(width, height);
	}

	// ____________________________________________________________________ Grid

	static getGridPixelPosition(positionGrid) {
		let x = positionGrid[0] * this.#gridCellWidthPx;
		let y = positionGrid[1] * this.#gridCellHeightPx;

		return vec2.fromValues(x, y);
	}

	static #getIndex(x, y) {
		return y * this.#gridWidthInCells + x;
	}

	static setGridCell(x, y, data) {
		const intX = Math.floor(x);
		const intY = Math.floor(y);
		if (
			intX >= 0 &&
			intX < this.#gridWidthInCells &&
			intY >= 0 &&
			intY < this.#gridHeightInCells
		) {
			const index = this.#getIndex(intX, intY);
			this.#grid[index] = data;
		}
	}

	static getGridCell(x, y) {
		const intX = Math.floor(x);
		const intY = Math.floor(y);
		if (
			intX >= 0 &&
			intX < this.#gridWidthInCells &&
			intY >= 0 &&
			intY < this.#gridHeightInCells
		) {
			const index = this.#getIndex(intX, intY);
			return this.#grid[index];
		}
		return undefined;
	}

	// ________________________________________________________________ Occupied

	static setOccupied(x, y, isOccupied) {
		const intX = Math.floor(x);
		const intY = Math.floor(y);
		if (
			intX >= 0 &&
			intX < this.#gridWidthInCells &&
			intY >= 0 &&
			intY < this.#gridHeightInCells
		) {
			const index = this.#getIndex(intX, intY);
			this.#occupied[index] = isOccupied ? 1 : 0;
		}
	}

	static isOccupied(x, y) {
		const intX = Math.floor(x);
		const intY = Math.floor(y);
		if (
			intX >= 0 &&
			intX < this.#gridWidthInCells &&
			intY >= 0 &&
			intY < this.#gridHeightInCells
		) {
			const index = this.#getIndex(intX, intY);
			return this.#occupied[index] === 1;
		}
		return false; // Default to not occupied if out of bounds
	}

	// __________________________________________________ Access Grid Cell Width

	static getGridCellWidthPx() {
		return this.#gridCellWidthPx;
	}

	static getGridCellHeightPx() {
		return this.#gridCellHeightPx;
	}

	// ________________________________________________________________ Grid Max

	static getGridMax() {
		// Return the maximum 0-based index for x and y
		return vec2.fromValues(
			this.#gridWidthInCells - 1,
			this.#gridHeightInCells - 1,
		);
	}

	static getGridMaxHalf() {
		const max = this.getGridMax();
		const x = max[0] / 2;
		const y = max[1] / 2;

		return vec2.fromValues(Math.floor(x), Math.floor(y));
	}

	// ____________________________________________________________________ Size

	static setSize(width, height) {
		// Store
		this.#resolutionWidth = width;
		this.#resolutionHeight = height;

		// Update grid dimensions
		this.#gridWidthInCells = Math.floor(
			this.#resolutionWidth / this.#gridCellWidthPx,
		);
		this.#gridHeightInCells = Math.floor(
			this.#resolutionHeight / this.#gridCellHeightPx,
		);

		// Re-initialize the flat array
		const size = this.#gridWidthInCells * this.#gridHeightInCells;
		this.#grid = new Array(size).fill(null);
		this.#occupied = new Uint8Array(size); // Automatically filled with 0
	}
}
