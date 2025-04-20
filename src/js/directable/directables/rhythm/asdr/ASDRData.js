export default class DirectableRhythmASDRData {
	#bpm = 120;

	#attackdurationMS = 100;
	#attackLevel = 1.0;

	#decaydurationMS = 100;
	#decayLevel = 0.5;

	#sustaindurationMS = 100;
	#sustainLevel = 0.5;

	#releasedurationMS = 100;

	// _____________________________________________________________________ BPM

	setBPM(value) {
		this.#bpm = value;
	}

	// __________________________________________________________________ Attack

	setAttack(durationMS, level) {
		this.#attackdurationMS = durationMS;
		this.#attackLevel = level;
	}

	// ___________________________________________________________________ Decay

	setDecay(durationMS, level) {
		this.#decaydurationMS = durationMS;
		this.#decayLevel = level;
	}

	// _________________________________________________________________ Sustain

	setSustain(durationMS, level) {
		this.#sustaindurationMS = durationMS;
		this.#sustainLevel = level;
	}

	// _________________________________________________________________ Release

	setRelease(durationMS) {
		this.#releasedurationMS = durationMS;
	}
}
