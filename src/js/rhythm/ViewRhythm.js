import ApplicationLogger from '../../application/ApplicationLogger';
import OverlayDispatcher from '../../overlay/dispatcher/OverlayDispatcher';

import ViewRhythmEnvelope from './ViewRhythmTrack';

export default class ViewRhythm {
	static #ENVELOPES = [];

	static #isEnabled = false;

	// ______________________________________________________________ Initialise

	static initialise() {
		ApplicationLogger.log('ViewRhythm. initialise', 1);

		// Attack Decay Sustain Release

		// Create Envelopes
		const ENVELOPE_A = new ViewRhythmEnvelope(78, 20, 1.0, 20, 20, 0.5, 20);

		// Store Envelopes
		this.#ENVELOPES.push(ENVELOPE_A);

		// Overlay Dispatcher Events
		OverlayDispatcher.on(
			'rhythm-button-stop',
			this.#onRhythmButtonStop.bind(this),
		);

		OverlayDispatcher.on(
			'rhythm-button-start',
			this.#onRhythmButtonStart.bind(this),
		);
	}

	// _______________________________________________ Overlay Dispatcher Events

	static #onRhythmButtonStop() {
		// Disable
		this.#disable();
	}

	static #onRhythmButtonStart() {
		// Enable
		this.#enable();
	}

	// ________________________________________________________ Enable / Disable

	static #enable() {
		// Enable
		this.#isEnabled = true;
	}

	static #disable() {
		// Disable
		this.#isEnabled = false;
	}

	// ____________________________________________________________________ Tick

	static tick(frameDurationMS) {
		// Enabled ?
		if (this.#isEnabled === false) {
			return;
		}

		// Envelopes
		for (let i = 0; i < this.#ENVELOPES.length; i += 1) {
			this.#ENVELOPES[i].tick(frameDurationMS);
		}
	}
}
