import ApplicationLogger from '../../../../application/ApplicationLogger.js';

import GridData from '../grid/GridData.js';

import DotManager from '../dot/DotManager.js';
import ShapeManager from '../shape/ShapeManager.js';

import ViewTest from './ViewTest.js';

export default class ViewManager {
	// private GridRenderer #gridRenderer;
	// private DotManager #dotManager;
	// private ShapeManager #shapeManager;
	// private List<View> #views = new List<View>();

	#DOT_MANAGER;
	#SHAPE_MANAGER;

	#VIEWS = [];

	#LOG_LEVEL = 4;

	// _________________________________________________________________________

	constructor(container) {
		ApplicationLogger.log('ViewManager', this.#LOG_LEVEL);

		// Initialize Grid Data
		GridData.initialize();

		// // DEV -
		// TODO Remove or re-implement
		// // #gridRenderer = new GridRenderer(container);

		// Create Dot Manager
		this.#DOT_MANAGER = new DotManager(container);

		// Create Shape Manager
		this.#SHAPE_MANAGER = new ShapeManager(this.#DOT_MANAGER);

		// Dev - Create View Test
		const VIEW_TEST = new ViewTest(this.#SHAPE_MANAGER);
		this.#VIEWS.push(VIEW_TEST);

		// ViewFloor viewFloor = new ViewFloor(#shapeManager);
		// #views.Add(viewFloor);

		// ViewTextTest viewTextTest = new ViewTextTest(#shapeManager);
		// #views.Add(viewTextTest);

		// // Set Initial Resolution
		// SetResolution(DisplayController.GetResolution());
	}

	// ____________________________________________________________________ Tick

	tick() {
		// Tick Views
		for (let i = 0; i < this.#VIEWS.length; i += 1) {
			this.#VIEWS[i].tick();
		}
	}

	// ____________________________________________________________________ Size

	setSize(width, height) {
		ApplicationLogger.log(
			'ViewManager setSize ' + width + ' ' + height,
			this.#LOG_LEVEL,
		);

		//
		GridData.setSize(width, height);

		// // Set Resolution
		// GridData.SetResolution(resolution);

		// // DEV
		// // #gridRenderer.SetResolution(resolution);
		// // #textureWrapper.SetResolution(resolution);
		// #shapeManager.SetResolution(resolution);
	}
}
