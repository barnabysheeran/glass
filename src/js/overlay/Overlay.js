import ApplicationLogger from '../application/ApplicationLogger.js';
import ApplicationConfiguration from '../application/ApplicationConfiguration.js';

import OverlayDispatcher from './dispatcher/OverlayDispatcher.js';

import OverlayOverlay from './overlay/OverlayOverlay.js';

import OverlayFormat from './format/OverlayFormat.js';
import OverlayMedia from './media/OverlayMedia.js';
import OverlayRhythm from './rhythm/OverlayRhythm.js';

import OverlayCapture from './capture/OverlayCapture.js';

export default class Overlay {
	static #HOLDER;

	static #OVERLAY_OVERLAY;

	static #OVERLAY_FORMAT;
	static #OVERLAY_MEDIA;
	static #OVERLAY_RHYTHM;

	static #OVERLAY_CAPTURE;

	static #isShown = false;

	static #LOG_LEVEL = 2;

	// ______________________________________________________________ Initialise

	static initialise() {
		ApplicationLogger.log('Overlay. initialise', this.#LOG_LEVEL);

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'overlay';
		this.#HOLDER.className = 'overlay';
		ApplicationConfiguration.getApplicationContainer().appendChild(
			this.#HOLDER,
		);

		// Create Overlay Overlay
		this.#OVERLAY_OVERLAY = new OverlayOverlay(this.#HOLDER);

		// Create Overlays
		// this.#OVERLAY_FORMAT = new OverlayFormat(this.#HOLDER);
		// this.#OVERLAY_MEDIA = new OverlayMedia(this.#HOLDER);
		// this.#OVERLAY_RHYTHM = new OverlayRhythm(this.#HOLDER);
		// this.#OVERLAY_CAPTURE = new OverlayCapture(this.#HOLDER);

		// Dispatcher
		OverlayDispatcher.on(
			'overlay-button-show-hide',
			this.#toggleVisibility.bind(this),
		);
	}

	// ______________________________________________________________ Visibility

	static #toggleVisibility() {
		ApplicationLogger.log('Overlay. toggleVisibility', this.#LOG_LEVEL);

		if (this.#isShown === true) {
			this.#hide();
		} else {
			this.#show();
		}
	}

	static #show() {
		// Show Overlays
		// this.#OVERLAY_FORMAT.show();
		// this.#OVERLAY_MEDIA.show();
		// this.#OVERLAY_CAPTURE.show();
		// this.#OVERLAY_RHYTHM.show();

		// Store
		this.#isShown = true;
	}

	static #hide() {
		// Hide Overlays
		// this.#OVERLAY_FORMAT.hide();
		// this.#OVERLAY_MEDIA.hide();
		// this.#OVERLAY_CAPTURE.hide();
		// this.#OVERLAY_RHYTHM.hide();

		// Store
		this.#isShown = false;
	}
}
