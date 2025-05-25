import GridData from '../grid/GridData.js';

import DotManager from '../dot/DotManager.js';
import ShapeManager from '../shape/ShapeManager.js';

export default class ViewManager {
	// private GridRenderer #gridRenderer;
	// private DotManager #dotManager;
	// private ShapeManager #shapeManager;
	// private List<View> #views = new List<View>();

	#DOT_MANAGER;
	#SHAPE_MANAGER;

	#LOG_LEVEL = 3;

	// _________________________________________________________________________

	constructor(container) {
		// Initialize Grid Data
		GridData.initialize();

		// // DEV -
		// TODO Remove or re-implement
		// // #gridRenderer = new GridRenderer(container);

		// Create Dot Manager
		this.#DOT_MANAGER = new DotManager(container);

		// Create Shape Manager
		this.#SHAPE_MANAGER = new ShapeManager(this.#DOT_MANAGER);

		// // Dev - Create View Test
		// ViewTest viewTest = new ViewTest(#shapeManager);
		// #views.Add(viewTest);
		// ViewFloor viewFloor = new ViewFloor(#shapeManager);
		// #views.Add(viewFloor);
		// ViewTextTest viewTextTest = new ViewTextTest(#shapeManager);
		// #views.Add(viewTextTest);
		// // Set Initial Resolution
		// SetResolution(DisplayController.GetResolution());
	}

	// __________________________________________________________________ Update

	Update() {
		// Update All Views
		// for (int i = 0; i < #views.Count; i++)
		// {
		//     #views[i].Update();
		// }
	}

	// ____________________________________________________________________ Size

	setSize(width, height) {
		// Debug.Log("ViewManager.SetResolution: " + resolution);

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
