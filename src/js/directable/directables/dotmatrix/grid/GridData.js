import { vec2 } from 'gl-matrix';

export default class GridData {
	static #gridWidth = 16;
	static #gridHeight = 16;

	static #resolutionWidth = 0;
	static #resolutionHeight = 0;
	static #resolutionAspect = 0.0;

	static #pixelWidth = 0.0;
	static #pixelHeight = 0.0;

	static #cameraOrthographicSizeDoubled = 10.0;
	// TODO Repeated CameraUserInterfaceSize

	// ______________________________________________________________ Initialize

	static initialize() {
		// TODO Initial Grid Size ?
		this.setSize(100, 100);
	}

	// ____________________________________________________________________ Grid

	static getGridPixelPosition(positionGrid) {
		let x = -this.#cameraOrthographicSizeDoubled;
		let y = this.#cameraOrthographicSizeDoubled / this.#resolutionAspect;

		x += positionGrid.x * this.#pixelWidth * this.#gridWidth;
		y += positionGrid.y * this.#pixelHeight * -this.#gridHeight;

		return new vec2(x, y);
	}

	static getGridWidth() {
		return this.#gridWidth;
	}

	static getGridHeight() {
		return this.#gridHeight;
	}

	// ________________________________________________________________ Max Grid

	static getGridMax() {
		return new vec2(
			(this.#resolutionWidth / this.#gridWidth) * 2,
			(this.#resolutionHeight / this.#gridHeight) * 2 - 1,
		);
	}

	static getGridMaxHalf() {
		return new vec2(
			this.#resolutionWidth / this.#gridWidth,
			this.#resolutionHeight / this.#gridHeight - 1,
		);
	}

	// ____________________________________________________________________ Size

	static setSize(width, height) {
		// Store
		this.#resolutionWidth = width;
		this.#resolutionHeight = height;
		this.#resolutionAspect = width / height;

		// Calculate Pixel Size
		this.#pixelWidth = this.#cameraOrthographicSizeDoubled / width;
		this.#pixelHeight = this.#pixelWidth; // TODO Check
	}
}
