export default class ViewManager {
	// private GridRenderer #gridRenderer;
	// private DotManager #dotManager;
	// private ShapeManager #shapeManager;
	// private List<View> #views = new List<View>();

	// _________________________________________________________________________

	constructor(container) {
		// // Initialize Grid Data
		// GridData.Initialize();
		// // DEV
		// // #gridRenderer = new GridRenderer(container);
		// // Create Dot Manager
		// #dotManager = new DotManager(container);
		// // Create Shape Manager
		// #shapeManager = new ShapeManager(#dotManager);
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
		// // Set Resolution
		// GridData.SetResolution(resolution);
		// // DEV
		// // #gridRenderer.SetResolution(resolution);
		// // #textureWrapper.SetResolution(resolution);
		// #shapeManager.SetResolution(resolution);
	}
}
