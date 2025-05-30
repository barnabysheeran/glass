import ApplicationLogger from '../../../../application/ApplicationLogger.js';

import DirectableRhythm from '../DirectableRhythm.js';

export default class DirectableRhythmBPM extends DirectableRhythm {
	#BPM = 0;

	#BPM_DELAY_BEAT_MS = 0;
	#bpmDelayMS = 0;

	// _________________________________________________________________________

	constructor(bpm) {
		super();

		ApplicationLogger.log('DirectableRhythmBPM', this.LOG_LEVEL);

		// Store
		this.#BPM = bpm;

		// Calculate Beats per Minute as MS
		this.#BPM_DELAY_BEAT_MS = 60000 / this.#BPM;
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {
		super.tick(frameDeltaMS);

		// Calculate Delay
		this.#bpmDelayMS += frameDeltaMS;

		// Beat ?
		if (this.#bpmDelayMS >= this.#BPM_DELAY_BEAT_MS) {
			this.#bpmDelayMS -= this.#BPM_DELAY_BEAT_MS;

			this.#beat();
		}
	}

	// ____________________________________________________________________ Beat

	#beat() {
		ApplicationLogger.log(
			`DirectableRhythmBPM. Beat ${this.BPM}`,
			this.LOG_LEVEL,
		);
	}
}
