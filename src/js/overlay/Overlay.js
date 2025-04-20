import ApplicationLogger from '../application/ApplicationLogger';
import ApplicationConfiguration from '../application/ApplicationConfiguration';

import OverlayDispatcher from './dispatcher/OverlayDispatcher';

import OverlayOverlay from './overlay/OverlayOverlay';

import OverlayFormat from './format/OverlayFormat';
import OverlayMedia from './media/OverlayMedia';
import OverlayRhythm from './rhythm/OverlayRhythm';
import OverlayTeleprompt from './teleprompt/OverlayTeleprompt';
import OverlayPathTracer from './pathtracer/OverlayPathTracer';

import OverlayCapture from './capture/OverlayCapture';

export default class Overlay {
	static #HOLDER;

	static #OVERLAY_OVERLAY;

	static #OVERLAY_FORMAT;
	static #OVERLAY_MEDIA;
	static #OVERLAY_RHYTHM;
	static #OVERLAY_TELEPROMPT;
	static #OVERLAY_PATH_TRACER;

	static #OVERLAY_CAPTURE;

	static #isShown = false;

	// ______________________________________________________________ Initialise

	static initialise() {
		ApplicationLogger.log('Overlay. initialise');

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'overlay';
		this.#HOLDER.className = 'overlay';
		ApplicationConfiguration.applicationContainer.appendChild(this.#HOLDER);

		// Create Overlay Overlay
		this.#OVERLAY_OVERLAY = new OverlayOverlay(this.#HOLDER);

		// Create Overlays
		this.#OVERLAY_FORMAT = new OverlayFormat(this.#HOLDER);
		this.#OVERLAY_MEDIA = new OverlayMedia(this.#HOLDER);
		this.#OVERLAY_RHYTHM = new OverlayRhythm(this.#HOLDER);
		this.#OVERLAY_TELEPROMPT = new OverlayTeleprompt(this.#HOLDER);
		this.#OVERLAY_PATH_TRACER = new OverlayPathTracer(this.#HOLDER);

		this.#OVERLAY_CAPTURE = new OverlayCapture(this.#HOLDER);

		// Dispatcher
		OverlayDispatcher.on(
			'overlay-button-show-hide',
			this.#toggleVisibility.bind(this)
		);

		// Start Hidden
		if (ApplicationConfiguration.isDevelopment === false) {
			this.#hide();
		}
	}

	// ______________________________________________________________ Visibility

	static #toggleVisibility() {
		// ApplicationLogger.log('Overlay. toggleVisibility');

		if (this.#isShown === true) {
			this.#hide();
		} else {
			this.#show();
		}
	}

	static #show() {
		// Show Overlays
		this.#OVERLAY_FORMAT.show();
		this.#OVERLAY_MEDIA.show();
		this.#OVERLAY_CAPTURE.show();
		this.#OVERLAY_RHYTHM.show();

		// Store
		this.#isShown = true;
	}

	static #hide() {
		// Hide Overlays
		this.#OVERLAY_FORMAT.hide();
		this.#OVERLAY_MEDIA.hide();
		this.#OVERLAY_CAPTURE.hide();
		this.#OVERLAY_RHYTHM.hide();

		// Store
		this.#isShown = false;
	}
}
