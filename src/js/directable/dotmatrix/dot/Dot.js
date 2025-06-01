import ApplicationLogger from '../../../application/ApplicationLogger.js';
import RenderSurface from '../../../render/RenderSurface.js';
import GridData from '../grid/GridData.js';

export default class Dot {
	#dotIndex = 0;

	#positionPixelsX = 0;
	#positionPixelsY = 0;

	#LOG_LEVEL = -1; // 6;

	// TODO Create Re-Useable Grid Sized Pixel Data Array

	// _________________________________________________________________________

	constructor(dotIndex) {
		// ApplicationLogger.log(`Dot ${dotIndex}`, this.#LOG_LEVEL);

		// Store
		this.#dotIndex = dotIndex;
	}

	// ____________________________________________________________________ Tick

	tick() {
		// TODO Tick
	}

	// ________________________________________________________________ Position

	setPosition(positionGrid) {
		ApplicationLogger.log(
			`Dot ${this.#dotIndex} setPosition ${positionGrid}`,
			this.#LOG_LEVEL,
		);

		// Store
		this.#positionPixelsX = positionGrid[0];
		this.#positionPixelsY = positionGrid[1];
	}

	// ____________________________________________________________________ Fill

	fill() {
		ApplicationLogger.log(
			`Dot ${this.#dotIndex} fill at ${this.#positionPixelsX} ${this.#positionPixelsY}`,
			this.#LOG_LEVEL,
		);

		const GRID_WIDTH = GridData.getGridWidth();
		const GRID_HEIGHT = GridData.getGridHeight();

		// Create data array for white with alpha 1
		const data = new Uint8Array(GRID_WIDTH * GRID_HEIGHT * 4);

		for (let i = 0; i < GRID_WIDTH * GRID_HEIGHT; i++) {
			// Set all RGBA values to 255, 255, 255, 255 (white, fully opaque)
			data[i * 4 + 0] = 255; // R
			data[i * 4 + 1] = 255; // G
			data[i * 4 + 2] = 255; // B
			data[i * 4 + 3] = 255; // A
		}

		// Set the data to the texture at the dot's position
		RenderSurface.setTextureData(
			this.#positionPixelsX,
			this.#positionPixelsY,
			GRID_WIDTH,
			GRID_HEIGHT,
			data,
		);
	}

	// ___________________________________________________________________ Clear

	clear() {
		ApplicationLogger.log(
			`Dot ${this.#dotIndex} clear at ${this.#positionPixelsX} ${this.#positionPixelsY}`,
			this.#LOG_LEVEL,
		);

		const GRID_WIDTH = GridData.getGridWidth();
		const GRID_HEIGHT = GridData.getGridHeight();

		// Create data array for white with alpha 0
		const data = new Uint8Array(GRID_WIDTH * GRID_HEIGHT * 4);
		for (let i = 0; i < GRID_WIDTH * GRID_HEIGHT; i++) {
			// Set all RGBA values to 255, 255, 255, 0 (white, fully transparent)
			data[i * 4 + 0] = 0; // R
			data[i * 4 + 1] = 0; // G
			data[i * 4 + 2] = 0; // B
			data[i * 4 + 3] = 0; // A
		}

		// Set the data to the texture at the dot's position
		RenderSurface.setTextureData(
			this.#positionPixelsX,
			this.#positionPixelsY,
			GRID_WIDTH,
			GRID_HEIGHT,
			data,
		);
	}
}
