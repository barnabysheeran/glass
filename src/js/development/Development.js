import ApplicationLogger from '../application/ApplicationLogger.js';

import Display from '../display/Display.js';

import DevelopmentGuides from './guide/DevelopmentGuides.js';
import DevelopmentGrid from './grid/DevelopmentGrid.js';

export default class Development {
	static #DEVELOPMENT_HOLDER;

	static #DEVELOPMENT_GUIDES;
	static #DEVELOPMENT_GRID;

	static #LOG_LEVEL = 2;

	// _________________________________________________________________________

	static initialise() {
		ApplicationLogger.log('Development', this.#LOG_LEVEL);

		// Create Development Container on Display Container
		const DISPLAY_HOLDER = Display.getDisplayHolder();

		// Create Development Container
		this.#DEVELOPMENT_HOLDER = document.createElement('div');
		this.#DEVELOPMENT_HOLDER.className = 'development';
		DISPLAY_HOLDER.appendChild(this.#DEVELOPMENT_HOLDER);

		// Create Development Guides
		this.#DEVELOPMENT_GUIDES = new DevelopmentGuides(this.#DEVELOPMENT_HOLDER);

		// Create Development Grid
		this.#DEVELOPMENT_GRID = new DevelopmentGrid(this.#DEVELOPMENT_HOLDER);

		// Add Keyboard Event Listener
		window.addEventListener('keyup', this.#onKeyUp.bind(this));
	}

	// _________________________________________________________________________

	static #onKeyUp(event) {
		// 1 - Development Guides Toggle
		if (event.keyCode === 49) {
			this.#toggleGuidesShowHide();
		}

		// 2 - Development Grid Toggle
		if (event.keyCode === 50) {
			this.#toggleGridShowHide();
		}
	}

	// ___________________________________________________________________ Guide

	static #toggleGuidesShowHide() {
		this.#DEVELOPMENT_GUIDES.toggleShowHide();
	}

	// ____________________________________________________________________ Grid

	static #toggleGridShowHide() {
		this.#DEVELOPMENT_GRID.toggleShowHide();
	}
}
