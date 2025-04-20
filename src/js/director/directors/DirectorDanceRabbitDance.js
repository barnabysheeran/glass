import ApplicationLogger from '../../application/ApplicationLogger';

import Director from '../Director';

import DirectableTitle from '../../directable/directables/title/DirectableTitle';
import DirectableRhythmBPM from '../../directable/directables/rhythm/bpm/DirectableRhythmBPM';

export default class DirectorDanceRabbitDance extends Director {
	#DIRECTABLE_TITLE;
	#DIRECTABLE_RHYTHM_BPM;

	// _________________________________________________________________________

	constructor() {
		super();

		ApplicationLogger.log('DirectorDanceRabbitDance', this.LOG_LEVEL);

		// Directable Title
		this.#DIRECTABLE_TITLE = new DirectableTitle();

		this.#DIRECTABLE_TITLE.setText('꒰ ঌᐢ.ˬ.ᐢ໒ ꒱');

		// Rhythm BPM
		this.#DIRECTABLE_RHYTHM_BPM = new DirectableRhythmBPM();
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {
		super.tick(frameDeltaMS);

		// Rhythm BPM
		this.#DIRECTABLE_RHYTHM_BPM.tick(frameDeltaMS);
	}

	// _________________________________________________________ Tick Frame Rate

	tickFrameRate() {
		super.tickFrameRate();
	}
}
