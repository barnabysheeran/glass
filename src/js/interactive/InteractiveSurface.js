import ApplicationLogger from '../application/ApplicationLogger.js';

import Display from '../display/Display.js';

export default class InteractiveSurface {
	static #HOLDER;

	static #ELEMENTS = [];

	static #LOG_LEVEL = 2;

	// _________________________________________________________________________

	static initialise() {
		ApplicationLogger.log('Interactive', this.#LOG_LEVEL);

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.classList.add('interactive-surface');

		// Append Holder to Display Holder
		Display.getDisplayHolder().appendChild(this.#HOLDER);
	}

	// _______________________________________________________________ Add Block

	static createBlock(x, y, width, height) {
		// Create Element
		const ELEMENT = document.createElement('div');
		ELEMENT.classList.add('interactive-block');
		ELEMENT.style.left = `${x}px`;
		ELEMENT.style.top = `${y}px`;
		ELEMENT.style.width = `${width}px`;
		ELEMENT.style.height = `${height}px`;
		this.#HOLDER.appendChild(ELEMENT);

		// Store
		this.#ELEMENTS.push(ELEMENT);

		// TODO Return element or add listeners here
	}

	// ___________________________________________________________________ Clear

	static clear() {
		ApplicationLogger.log('Interactive.clear', this.#LOG_LEVEL);

		// Clear Blocks
		this.#ELEMENTS = [];

		// Clear Holder
		this.#HOLDER.innerHTML = '';
	}
}
