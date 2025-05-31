import ApplicationConfiguration from '../application/ApplicationConfiguration.js';
import ApplicationLogger from '../application/ApplicationLogger.js';
import DisplayFormats from './DisplayFormats.js';

import ApplicationDispatcher from '../application/ApplicationDispatcher.js';

export default class Display {
	static #APPLICATION_CONTAINER;

	static #displayFormat = DisplayFormats.SQUARE; // Set initial scale mode

	static #width = -1;
	static #height = -1;
	static #top = -1;
	static #left = -1;

	static #LOG_LEVEL = 2;

	// _________________________________________________________________________

	static initialise() {
		// Store
		this.#APPLICATION_CONTAINER =
			ApplicationConfiguration.getApplicationContainer();

		// Application Dispatcher Events
		ApplicationDispatcher.on(
			'display-format-change',
			this.#onDisplayFormatChange.bind(this),
		);

		// Set Initial Display Format
		this.tick();
	}

	// _______________________________________________ Dispatcher Overlay Format

	static #onDisplayFormatChange(data) {
		ApplicationLogger.log(
			`RenderResizer. onDisplayFormatChange ${data.displayFormat}`,
			this.#LOG_LEVEL,
		);

		// Store
		this.#displayFormat = data.displayFormat;
	}

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

		const APPLICATION_MIN = Math.min(APPLICATION_WIDTH, APPLICATION_HEIGHT);

		let width = 0;
		let height = 0;

		let top = 0;
		let left = 0;

		// Scale Mode
		switch (this.#displayFormat) {
			case DisplayFormats.FILL:
				// Fill
				width = APPLICATION_WIDTH;
				height = APPLICATION_HEIGHT;

				top = 0;
				left = 0;

				break;

			case DisplayFormats.WIDE_2_39_1:
				// Wide 2:39:1
				width = APPLICATION_WIDTH;
				height = APPLICATION_WIDTH * 0.208;

				top = (APPLICATION_HEIGHT - height) * 0.5;
				left = 0;

				break;

			case DisplayFormats.WIDE_2_1:
				// Wide 2:1
				width = APPLICATION_WIDTH;
				height = APPLICATION_WIDTH * 0.5;

				top = (APPLICATION_HEIGHT - height) * 0.5;
				left = 0;

				break;

			case DisplayFormats.WIDE_4_3:
				// Wide 4:3
				width = APPLICATION_WIDTH;
				height = APPLICATION_WIDTH * 0.75;

				top = (APPLICATION_HEIGHT - height) * 0.5;
				left = 0;

				break;

			case DisplayFormats.SQUARE:
				// Square
				width = APPLICATION_MIN;
				height = APPLICATION_MIN;

				top = (APPLICATION_HEIGHT - height) * 0.5;
				left = (APPLICATION_WIDTH - width) * 0.5;

				break;

			default:
				break;
		}

		// Int
		width = Math.floor(width);
		height = Math.floor(height);

		top = Math.floor(top);
		left = Math.floor(left);

		// Changed Width Height ?
		if (width !== this.#width || height !== this.#height) {
			// Store
			this.#width = width;
			this.#height = height;

			// Resized This Frame
			didResizeThisFrame = true;
		}

		// Changed Top Left ? - Move Holder
		if (top !== this.#top || left !== this.#left) {
			// Store
			this.#top = top;
			this.#left = left;
		}

		return didResizeThisFrame;
	}

	// __________________________________________________________________ Access

	static getLeft() {
		return this.#left;
	}

	static getTop() {
		return this.#top;
	}

	static getWidth() {
		return this.#width;
	}

	static getHeight() {
		return this.#height;
	}
}
