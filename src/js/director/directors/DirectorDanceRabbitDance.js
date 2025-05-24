import ApplicationLogger from '../../application/ApplicationLogger.js';

import Director from '../Director.js';

import DirectableTitle from '../../directable/directables/title/DirectableTitle.js';
import DirectableRhythmBPM from '../../directable/directables/rhythm/bpm/DirectableRhythmBPM.js';
import DirectableDotMatrix from '../../directable/directables/dotmatrix/DirectableDotMatrix.js';

export default class DirectorDanceRabbitDance extends Director {
	#DIRECTABLE_TITLE;
	#DIRECTABLE_RHYTHM_BPM;
	#DIRECTABLE_DOT_MATRIX;

	// _________________________________________________________________________

	constructor() {
		super();

		ApplicationLogger.log('DirectorDanceRabbitDance', this.LOG_LEVEL);

		// Create Directable Title
		this.#DIRECTABLE_TITLE = new DirectableTitle();
		this.#DIRECTABLE_TITLE.setText('꒰ ঌᐢ.ˬ.ᐢ໒ ꒱');

		// Create Rhythm BPM
		this.#DIRECTABLE_RHYTHM_BPM = new DirectableRhythmBPM();

		// Create Dot Matrix
		this.#DIRECTABLE_DOT_MATRIX = new DirectableDotMatrix();
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {
		super.tick(frameDeltaMS);

		// Rhythm BPM
		this.#DIRECTABLE_RHYTHM_BPM.tick(frameDeltaMS);

		// Dot Matrix
		this.#DIRECTABLE_DOT_MATRIX.tick(frameDeltaMS);
	}

	// _________________________________________________________ Tick Frame Rate

	tickFrameRate() {
		super.tickFrameRate();
	}
}
