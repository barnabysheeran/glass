import ApplicationLogger from '../../application/ApplicationLogger.js';

import GridData from './grid/GridData.js';

import DotManager from './dot/DotManager.js';
import ShapeManager from './shape/ShapeManager.js';

// import ViewManager from './view/ViewManager.js';

import ViewTest from './view/ViewTest.js';

export default class DirectableDotMatrix {
	#DOT_MANAGER;
	#SHAPE_MANAGER;

	#VIEWS = [];

	#LOG_LEVEL = 3;

	// _________________________________________________________________________

	constructor(width, height) {
		ApplicationLogger.log('DirectableDotMatrix', this.#LOG_LEVEL);

		// Initialize Grid Data
		GridData.initialize(width, height);

		// Create Dot Manager
		this.#DOT_MANAGER = new DotManager();

		// Create Shape Manager
		this.#SHAPE_MANAGER = new ShapeManager(this.#DOT_MANAGER);

		// Dev - Create View Test
		const VIEW_TEST = new ViewTest(this.#SHAPE_MANAGER);
		this.#VIEWS.push(VIEW_TEST);

		// const VIEW_TEXT_TEST = new ViewTextTest(this.#SHAPE_MANAGER);
		// this.#VIEWS.push(VIEW_TEXT_TEST);
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {
		// Tick Views
		for (let i = 0; i < this.#VIEWS.length; i += 1) {
			this.#VIEWS[i].tick();
		}
	}

	// ____________________________________________________________________ Size

	setSize(width, height) {
		ApplicationLogger.log(
			'DirectableDotMatrix setSize ' + width + ' ' + height,
			this.#LOG_LEVEL,
		);

		// Grid Data
		GridData.setSize(width, height);

		// Redraw Shapes
		this.#SHAPE_MANAGER.redraw();
	}
}
