import ApplicationLogger from '../application/ApplicationLogger.js';
import ApplicationConfiguration from '../application/ApplicationConfiguration.js';
import ApplicationDispatcher from '../application/ApplicationDispatcher.js';

import OverlayOverlay from './overlay/OverlayOverlay.js';
import OverlayDisplayFormat from './displayFormat/OverlayDisplayFormat.js';

export default class Overlay {
	static #HOLDER;

	static #OVERLAY_OVERLAY;
	static #OVERLAY_FORMAT;

	static #isShown = false;

	static #LOG_LEVEL = 2;

	// ______________________________________________________________ Initialise

	static initialise() {
		ApplicationLogger.log('Overlay initialise', this.#LOG_LEVEL);

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'overlay';
		this.#HOLDER.className = 'overlay';
		ApplicationConfiguration.getApplicationContainer().appendChild(
			this.#HOLDER,
		);

		// Create Overlays
		this.#OVERLAY_OVERLAY = new OverlayOverlay(this.#HOLDER);
		this.#OVERLAY_FORMAT = new OverlayDisplayFormat(this.#HOLDER);

		// Dispatcher
		ApplicationDispatcher.on(
			'overlay-toggle-visibility',
			this.#toggleVisibility.bind(this),
		);

		// Start Hidden
		this.#hide();
	}

	// ______________________________________________________________ Visibility

	static #toggleVisibility() {
		ApplicationLogger.log('Overlay toggleVisibility', this.#LOG_LEVEL);

		if (this.#isShown === true) {
			this.#hide();
		} else {
			this.#show();
		}
	}

	static #show() {
		// Show Overlays
		this.#OVERLAY_FORMAT.show();

		// Store
		this.#isShown = true;
	}

	static #hide() {
		// Hide Overlays
		this.#OVERLAY_FORMAT.hide();

		// Store
		this.#isShown = false;
	}
}
