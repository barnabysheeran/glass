import { vec2 } from 'gl-matrix';

export default class GridData {
	static #gridWidth = 16;
	static #gridHeight = 16;

	static #resolutionWidth = 0;
	static #resolutionHeight = 0;

	static #pixelWidth = 1.0;
	static #pixelHeight = 1.0;

	// ______________________________________________________________ Initialize

	static initialize(width, height) {
		// Set Initial Size
		this.setSize(width, height);
	}

	// ____________________________________________________________________ Grid

	static getGridPixelPosition(positionGrid) {
		let x = positionGrid[0] * this.#pixelWidth * this.#gridWidth;
		let y = positionGrid[1] * this.#pixelHeight * this.#gridHeight;

		return vec2.fromValues(x, y);
	}

	static getGridWidth() {
		return this.#gridWidth;
	}

	static getGridHeight() {
		return this.#gridHeight;
	}

	// ________________________________________________________________ Max Grid

	static getGridMax() {
		return vec2.fromValues(
			(this.#resolutionWidth / this.#gridWidth) * 2,
			(this.#resolutionHeight / this.#gridHeight) * 2 - 1,
		);
	}

	static getGridMaxHalf() {
		return vec2.fromValues(
			this.#resolutionWidth / this.#gridWidth,
			this.#resolutionHeight / this.#gridHeight - 1,
		);
	}

	// ____________________________________________________________________ Size

	static setSize(width, height) {
		// Store
		this.#resolutionWidth = width;
		this.#resolutionHeight = height;
	}
}
