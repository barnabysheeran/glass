import ApplicationConfiguration from '../application/ApplicationConfiguration.js';
import ApplicationLogger from '../application/ApplicationLogger.js';

export default class Display {
	static #APPLICATION_CONTAINER;
	static #DISPLAY_HOLDER;

	static #width = -1;
	static #height = -1;

	static #LOG_LEVEL = 2;

	// _________________________________________________________________________

	static initialise() {
		ApplicationLogger.log('Display initialise', this.#LOG_LEVEL);

		// Store Application Container
		this.#APPLICATION_CONTAINER =
			ApplicationConfiguration.getApplicationContainer();

		// Create Display Holder
		this.#DISPLAY_HOLDER = document.createElement('div');
		this.#DISPLAY_HOLDER.classList.add('display');

		// Append
		this.#APPLICATION_CONTAINER.appendChild(this.#DISPLAY_HOLDER);

		// Set Initial
		this.tick();
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

		// Changed Width Height ?
		if (width !== this.#width || height !== this.#height) {
			// Store
			this.#width = width;
			this.#height = height;

			// Set Display Holder Size
			this.#DISPLAY_HOLDER.style.width = `${this.#width}px`;
			this.#DISPLAY_HOLDER.style.height = `${this.#height}px`;

			// Resized This Frame
			didResizeThisFrame = true;
		}

		return didResizeThisFrame;
	}

	// __________________________________________________________________ Access

	static getWidth() {
		return this.#width;
	}

	static getHeight() {
		return this.#height;
	}

	static getDisplayHolder() {
		return this.#DISPLAY_HOLDER;
	}
}
