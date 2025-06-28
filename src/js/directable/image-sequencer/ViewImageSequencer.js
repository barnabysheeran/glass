import ApplicationConfiguration from '../../../../application/ApplicationConfiguration';
import ApplicationLogger from '../../../../application/ApplicationLogger';

import IMAGE_SEQUENCE_DATA from './image-sequence-data.json';
import ImageSequenceImage from './ImageSequenceImage';

export default class ViewImageSequencer {
	#HOLDER;
	#DATA_SEQUENCE_ARRAY;

	#PATH_ASSET_ROOT;

	#IMAGE_WIDTH = 1000;
	#IMAGE_HEIGHT = 512;

	#IMAGE_SEQUENCES = [];
	#IMAGE_SEQUENCE_TOTAL = 3;

	#FPS = 24;
	#FPS_DELAY_MS = 1000 / this.#FPS;
	#fpsDelayMS = 0;

	#BPM = 50;
	#BPM_DELAY_MS = (60 / this.#BPM) * 1000;
	#bpmDelayMS = 0;

	// _________________________________________________________________________

	constructor(container) {
		// Store
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.className = 'image-sequencer';
		container.appendChild(this.#HOLDER);

		this.#DATA_SEQUENCE_ARRAY = IMAGE_SEQUENCE_DATA.sequences;
		this.#PATH_ASSET_ROOT = `${ApplicationConfiguration.getPathAsset()}media/`;

		ApplicationLogger.log(`ViewImageSequencer ${this.#PATH_ASSET_ROOT}`);

		// Create Image Sequences
		for (let i = 0; i < this.#IMAGE_SEQUENCE_TOTAL; i += 1) {
			const IMAGE_SEQUENCE = new ImageSequenceImage(
				i,
				this.#HOLDER,
				this.#PATH_ASSET_ROOT,
				this.#onSequenceComplete.bind(this),
			);

			// Initialise to Random
			IMAGE_SEQUENCE.initialiseSequence(this.#getRandomSequenceData());

			if (i > 0) {
				IMAGE_SEQUENCE.setRandomBlendMode();
			}

			// Store
			this.#IMAGE_SEQUENCES.push(IMAGE_SEQUENCE);
		}
	}

	// ________________________________________________________________ Sequence

	#onSequenceComplete(sequenceIndex) {
		ApplicationLogger.log(
			`ViewImageSequencer onSequenceComplete ${sequenceIndex}`,
		);

		// Get Next Sequence Data
		const SEQUENCE_DATA = this.#getRandomSequenceData();

		// Initialise Sequence
		this.#IMAGE_SEQUENCES[sequenceIndex].initialiseSequence(SEQUENCE_DATA);

		if (sequenceIndex > 0) {
			this.#IMAGE_SEQUENCES[sequenceIndex].setRandomBlendMode();
		}
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {
		// Calculate Delays
		this.#fpsDelayMS += frameDeltaMS;
		this.#bpmDelayMS += frameDeltaMS;

		// Frame ?
		if (this.#fpsDelayMS >= this.#FPS_DELAY_MS) {
			this.#fpsDelayMS -= this.#FPS_DELAY_MS;

			// Frame
			this.#frame();
		}

		// Beat ?
		if (this.#bpmDelayMS >= this.#BPM_DELAY_MS) {
			this.#bpmDelayMS -= this.#BPM_DELAY_MS;

			// Beat
			this.#beat();
		}
	}

	#frame() {
		// Update Image Sequences
		for (let i = 0; i < this.#IMAGE_SEQUENCE_TOTAL; i += 1) {
			this.#IMAGE_SEQUENCES[i].frame();
		}
	}

	#beat() {
		// console.log('beat');

		if (this.#FPS === 24) {
			this.#FPS = 30;
			this.#FPS_DELAY_MS = 1000 / this.#FPS;
		} else {
			this.#FPS = 24;
			this.#FPS_DELAY_MS = 1000 / this.#FPS;
		}

		// const RANDOM_SEQUENCE_INDEX = Math.floor(
		// 	Math.random() * this.#IMAGE_SEQUENCE_TOTAL,
		// );

		// this.#IMAGE_SEQUENCES[RANDOM_SEQUENCE_INDEX].reverse();
	}

	// ____________________________________________________________________ Data

	#getRandomSequenceData() {
		const INDEX = Math.floor(Math.random() * this.#DATA_SEQUENCE_ARRAY.length);
		return this.#DATA_SEQUENCE_ARRAY[INDEX];
	}

	#getSequenceData(index) {
		return this.#DATA_SEQUENCE_ARRAY[index];
	}

	// ____________________________________________________________________ Size

	setSize(width, height) {
		// Position
		const X = width / 2 - this.#IMAGE_WIDTH / 2;
		const Y = height / 2 - this.#IMAGE_HEIGHT / 2;

		// Update Image Sequences
		for (let i = 0; i < this.#IMAGE_SEQUENCE_TOTAL; i += 1) {
			this.#IMAGE_SEQUENCES[i].setPosition(X, Y);
		}
	}
}
