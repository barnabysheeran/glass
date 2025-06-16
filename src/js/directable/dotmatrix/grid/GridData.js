import { vec2 } from 'gl-matrix';

export default class GridData {
	static #gridWidth = 8;
	static #gridHeight = 8;

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

	// ________________________________________________________________ Grid Max

	static getGridMax() {
		let x = this.#resolutionWidth / this.#gridWidth;
		let y = this.#resolutionHeight / this.#gridHeight - 1;

		return vec2.fromValues(Math.floor(x), Math.floor(y));
	}

	static getGridMaxHalf() {
		let x = this.#resolutionWidth / this.#gridWidth;
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
