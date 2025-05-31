import ApplicationLogger from '../../../application/ApplicationLogger.js';

export default class Dot {
	#dotIndex = 0;

	#positionPixelsX = 0;
	#positionPixelsY = 0;

	#LOG_LEVEL = 6;

	// _________________________________________________________________________

	constructor(dotIndex) {
		// ApplicationLogger.log(`Dot ${dotIndex}`, this.#LOG_LEVEL);

		// Store
		this.#dotIndex = dotIndex;
	}

	// ____________________________________________________________________ Tick

	tick() {
		// TODO Tick
	}

	// ________________________________________________________________ Position

	setPosition(positionGrid) {
		ApplicationLogger.log(
			`Dot ${this.#dotIndex} setPosition ${positionGrid}`,
			this.#LOG_LEVEL,
		);

		// Store
		this.#positionPixelsX = positionGrid[0];
		this.#positionPixelsY = positionGrid[1];
	}

	// ____________________________________________________________________ Fill

	fill() {
		ApplicationLogger.log(
			`Dot fill at ${this.#positionPixelsX} ${this.#positionPixelsY}`,
			this.#LOG_LEVEL,
		);

		// TODO Fill
	}

	// ___________________________________________________________________ Clear

	clear() {
		ApplicationLogger.log(
			`Dot clear at ${this.#positionPixelsX} ${this.#positionPixelsY}`,
			this.#LOG_LEVEL,
		);

		// TODO Clear
	}
}
