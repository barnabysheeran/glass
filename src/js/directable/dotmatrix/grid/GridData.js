import { vec2 } from 'gl-matrix';

export default class GridData {
	static #gridWidthPx = 8;
	static #gridHeight = 8;

	static #resolutionWidth = 0;
	static #resolutionHeight = 0;

	// ______________________________________________________________ Initialize

	static initialize(width, height) {
		// Set Initial Size
		this.setSize(width, height);
	}

	// ____________________________________________________________________ Grid

	static getGridPixelPosition(positionGrid) {
		let x = positionGrid[0] * this.#gridWidthPx;
		let y = positionGrid[1] * this.#gridHeight;

		return vec2.fromValues(x, y);
	}

	// TODO Add PX
	static getGridWidth() {
		return this.#gridWidthPx;
	}

	static getGridHeight() {
		return this.#gridHeight;
	}

	// ________________________________________________________________ Grid Max

	static getGridMax() {
		let x = this.#resolutionWidth / this.#gridWidthPx;
		let y = this.#resolutionHeight / this.#gridHeight - 1;

		return vec2.fromValues(Math.floor(x), Math.floor(y));
	}

	static getGridMaxHalf() {
		let x = this.#resolutionWidth / this.#gridWidthPx;
		let y = this.#resolutionHeight / this.#gridHeight - 1;

		return vec2.fromValues(Math.floor(x / 2), Math.floor(y / 2));
	}

	// ____________________________________________________________________ Size

	static setSize(width, height) {
		// Store
		this.#resolutionWidth = width;
		this.#resolutionHeight = height;
	}
}
