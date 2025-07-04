import ApplicationLogger from '../../application/ApplicationLogger.js';

import DotManager from './dot/DotManager.js';
import ShapeManager from './shape/ShapeManager.js';

import DotMatrixViewProjectMenu from './view/DotMatrixViewProjectMenu.js';
import DotMatrixViewTest from './view/DotMatrixViewTest.js';

export default class DirectableDotMatrix {
	#DOT_MANAGER;
	#SHAPE_MANAGER;

	#VIEWS = [];

	#viewIdCurrent = 'test';

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
			new DotMatrixViewProjectMenu(this.#SHAPE_MANAGER, 'menu-project'),
		);

		this.#VIEWS.push(new DotMatrixViewTest(this.#SHAPE_MANAGER, 'test'));

		// Start Initial View
		this.#getViewById(this.#viewIdCurrent).start();
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

		// Set Size requires a full Reset Redraw

		// Reset Views
		for (let i = 0; i < this.#VIEWS.length; i += 1) {
			this.#VIEWS[i].stop();
			this.#VIEWS[i].reset();
		}

		// Reset Shape Manager
		this.#SHAPE_MANAGER.reset();

		// Reset Dot Manager
		this.#DOT_MANAGER.reset();

		// Start Initial View
		this.#getViewById(this.#viewIdCurrent).start();
	}

	// ____________________________________________________________________ Util

	#getViewById(viewId) {
		for (let i = 0; i < this.#VIEWS.length; i += 1) {
			if (this.#VIEWS[i].getViewId() === viewId) {
				return this.#VIEWS[i];
			}
		}

		return null;
	}
}
