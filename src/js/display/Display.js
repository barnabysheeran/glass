import ApplicationConfiguration from '../application/ApplicationConfiguration.js';
import ApplicationLogger from '../application/ApplicationLogger.js';

import ApplicationDispatcher from '../application/ApplicationDispatcher.js';

export default class Display {
	static #APPLICATION_CONTAINER;

	static #width = -1;
	static #height = -1;
	// static #top = -1;
	// static #left = -1;

	static #LOG_LEVEL = 2;

	// _________________________________________________________________________

	static initialise() {
		// Store
		this.#APPLICATION_CONTAINER =
			ApplicationConfiguration.getApplicationContainer();

		// Set Initial
		this.tick();
	}

	// _______________________________________________ Dispatcher Overlay Format

	// static #onDisplayFormatChange(data) {
	// 	ApplicationLogger.log(
	// 		`RenderResizer. onDisplayFormatChange ${data.displayFormat}`,
	// 		this.#LOG_LEVEL,
	// 	);

	// 	// Store
	// 	this.#displayFormat = data.displayFormat;
	// }

	// __________________________________________________________________ Resize

	static tick() {
		// Assume No Change
		let didResizeThisFrame = false;

		// Get Rectangle
		const APPLICATION_RECTANGLE =
			this.#APPLICATION_CONTAINER.getBoundingClientRect();

		// Get Dimensions
		const APPLICATION_WIDTH = APPLICATION_RECTANGLE.width;
		const APPLICATION_HEIGHT = APPLICATION_RECTANGLE.height;

		let width;
		let height;

		// Max Width Square
		if (APPLICATION_WIDTH > APPLICATION_HEIGHT) {
			// Square
			width = APPLICATION_HEIGHT;
			height = APPLICATION_HEIGHT;
		} else {
			// Full Width
			width = APPLICATION_WIDTH;
			height = APPLICATION_HEIGHT;
		}

		// Int
		width = Math.floor(width);
		height = Math.floor(height);

		// top = Math.floor(top);
		// left = Math.floor(left);

		// Changed Width Height ?
		if (width !== this.#width || height !== this.#height) {
			// Store
			this.#width = width;
			this.#height = height;

			// Resized This Frame
			didResizeThisFrame = true;
		}

		// Changed Top Left ? - Move Holder
		// if (top !== this.#top || left !== this.#left) {
		// 	// Store
		// 	this.#top = top;
		// 	this.#left = left;
		// }

		return didResizeThisFrame;
	}

	// __________________________________________________________________ Access

	// static getLeft() {
	// 	return this.#left;
	// }

	// static getTop() {
	// 	return this.#top;
	// }

	static getWidth() {
		return this.#width;
	}

	static getHeight() {
		return this.#height;
	}
}
