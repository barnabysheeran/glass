import ApplicationLogger from '../../../../application/ApplicationLogger';
// import ApplicationEventDispatcher from '../../event/ApplicationEventDispatcher';

export default class DirectableRhythmASDREnvelope {
	#BPM;

	// TODO - Move to data

	#DURATION_ATTACK_MS;
	#LEVEL_ATTACK;
	#DURATION_DECAY_MS;
	#DURATION_SUSTAIN_MS;
	#LEVEL_SUSTAIN;
	#DURATION_RELEASE_MS;

	#bpmDurationMS;
	#bpmProgressCurrentMS;

	#MODES = {
		NOTHING: -1,
		ATTACK: 0,
		DECAY: 1,
		SUSTAIN: 2,
		RELEASE: 3,
	};

	#mode = this.#MODES.NOTHING;

	#levelCurrent = 0.0;

	// _________________________________________________________________________

	constructor(
		bpm,
		durationAttackMS,
		levelAttack,
		durationDecayMS,
		durationSustainMS,
		levelSustain,
		durationReleaseMS,
	) {
		ApplicationLogger.log(`ViewRhythmEnvelope. ${bpm}bpm`, 2);

		// TODO Construct from data

		// Store
		this.#BPM = bpm;

		this.#DURATION_ATTACK_MS = durationAttackMS;
		this.#LEVEL_ATTACK = levelAttack;
		this.#DURATION_DECAY_MS = durationDecayMS;
		this.#DURATION_SUSTAIN_MS = durationSustainMS;
		this.#LEVEL_SUSTAIN = levelSustain;
		this.#DURATION_RELEASE_MS = durationReleaseMS;

		// Precalculate
		this.#bpmDurationMS = 60000.0 / this.#BPM;

		// Initialise
		this.#bpmProgressCurrentMS = this.#bpmDurationMS;
	}

	// ____________________________________________________________________ Tick

	tick(frameDurationMS) {
		// console.log(`ViewRhythmEnvelope. tick ${frameDurationMS.toFixed(3)} ms`);

		// Progress Beat
		this.#bpmProgressCurrentMS -= frameDurationMS;

		// Beat ?
		if (this.#bpmProgressCurrentMS <= 0) {
			// Beat
			this.#onBeat();

			// Reset Beat
			this.#bpmProgressCurrentMS =
				this.#bpmDurationMS + 0.0 - this.#bpmProgressCurrentMS;
		}
	}

	// __________________________________________________________________ Attack

	#onBeat() {
		// Start Attack
		this.#mode = this.#MODES.ATTACK;

		// Dispatch
		// ApplicationEventDispatcher.dispatch('beat-start');
	}
}
