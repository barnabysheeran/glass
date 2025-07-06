import ApplicationLogger from '../application/ApplicationLogger.js';

import Display from '../display/Display.js';

export default class InteractiveSurface {
	static #CONTAINER;

	static #ELEMENTS = [];

	static #LOG_LEVEL = 2;

	// _________________________________________________________________________

	static initialise(width, height) {
		ApplicationLogger.log('Interactive', this.#LOG_LEVEL);

		// Create Holder
		this.#CONTAINER = document.createElement('div');
		this.#CONTAINER.classList.add('interactive-surface');

		// Append Holder to Display Holder
		Display.getDisplayHolder().appendChild(this.#CONTAINER);

		// Set Initial Size
		this.setSize(width, height);
	}

	// _______________________________________________________________ Add Block

	static createBlock(
		x,
		y,
		width,
		height,
		callbackClick,
		callbackRollOver,
		callbackRollOut,
	) {
		// Create Element
		const ELEMENT = document.createElement('div');
		ELEMENT.classList.add('interactive-block');
		ELEMENT.style.left = `${x}px`;
		ELEMENT.style.top = `${y}px`;
		ELEMENT.style.width = `${width}px`;
		ELEMENT.style.height = `${height}px`;
		this.#CONTAINER.appendChild(ELEMENT);

		// DEV
		ELEMENT.style.border = '1px solid #00f';

		// Add Event Listeners
		if (callbackClick) {
			ELEMENT.addEventListener('click', callbackClick);
		}

		if (callbackRollOver) {
			ELEMENT.addEventListener('mouseover', callbackRollOver);
		}

		if (callbackRollOut) {
			ELEMENT.addEventListener('mouseout', callbackRollOut);
		}

		// Store
		this.#ELEMENTS.push(ELEMENT);

		// TODO Return element or add listeners here
	}

	// ___________________________________________________________________ Clear

	static clear() {
		ApplicationLogger.log('Interactive clear', this.#LOG_LEVEL);

		// Clear Blocks
		this.#ELEMENTS = [];

		// Clear Holder
		this.#CONTAINER.innerHTML = '';
	}

	// ____________________________________________________________________ Size

	static setSize(width, height) {
		this.#CONTAINER.style.width = `${width}px`;
		this.#CONTAINER.style.height = `${height}px`;
	}
}
