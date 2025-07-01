import ApplicationLogger from '../../application/ApplicationLogger.js';

import DotManager from './dot/DotManager.js';
import ShapeManager from './shape/ShapeManager.js';

import DotMatrixViewTest from './view/DotMatrixViewTest.js';

export default class DirectableDotMatrix {
	#DOT_MANAGER;
	#SHAPE_MANAGER;

	#VIEWS = [];

	#LOG_LEVEL = 3;

	// Views create Components, which create Shapes, which create Dots

	// _________________________________________________________________________

	constructor() {
		ApplicationLogger.log('DirectableDotMatrix', this.#LOG_LEVEL);

		// Create Dot Manager
		this.#DOT_MANAGER = new DotManager();

		// Create Shape Manager
		this.#SHAPE_MANAGER = new ShapeManager(this.#DOT_MANAGER);

		// Create Views
		this.#VIEWS.push(
			new DotMatrixViewTest(this.#DOT_MANAGER, this.#SHAPE_MANAGER),
		);
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {
		// Tick Views
		for (let i = 0; i < this.#VIEWS.length; i += 1) {
			this.#VIEWS[i].tick(frameDeltaMS);
		}
	}

	// ____________________________________________________________________ Size

	setSize(width, height) {
		ApplicationLogger.log(
			'DirectableDotMatrix setSize ' + width + ' ' + height,
			this.#LOG_LEVEL,
		);

		// Reset Current View
		this.#VIEWS[0].reset();

		// Reset Shape Manager
		this.#SHAPE_MANAGER.reset();

		// Reset Dot Manager
		this.#DOT_MANAGER.reset();

		// Re-Draw Current View
		this.#VIEWS[0].start();
	}
}
