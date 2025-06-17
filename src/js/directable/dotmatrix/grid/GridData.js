import { vec2 } from 'gl-matrix';

export default class GridData {
	static #gridCellWidthPx = 8;
	static #gridCellHeightPx = 8;

	static #resolutionWidth = 0;
	static #resolutionHeight = 0;

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

	static getGridCellWidthPx() {
		return this.#gridCellWidthPx;
	}

	static getGridCellHeightPx() {
		return this.#gridCellHeightPx;
	}

	// ________________________________________________________________ Grid Max

	static getGridMax() {
		let x = this.#resolutionWidth / this.#gridCellWidthPx;
		let y = this.#resolutionHeight / this.#gridCellHeightPx;

		// Return the maximum 0-based index for x and y
		return vec2.fromValues(Math.floor(x) - 1, Math.floor(y) - 1);
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
	}
}
