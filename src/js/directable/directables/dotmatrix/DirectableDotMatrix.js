import ApplicationLogger from '../../../application/ApplicationLogger.js';

import ViewManager from './view/ViewManager.js';

export default class DirectableDotMatrix {
	// private GameObject #go;
	// private ViewManager #viewManager;

	#VIEW_MANAGER;

	#LOG_LEVEL = 2;

	// _________________________________________________________________________

	constructor() {
		ApplicationLogger.log('DirectableDotMatrix', this.#LOG_LEVEL);

		// Create View Manager
		this.#VIEW_MANAGER = new ViewManager();
	}

	// DotMatrixController(GameObject container)
	// {
	//     // // Create Game Object
	//     // #go = new GameObject("DotMatrix");
	//     // #go.layer = LayerMask.NameToLayer("UserInterface");
	//     // #go.transform.position = Vector3.zero;
	//     // #go.transform.SetParent(container.transform);

	//     // // Create View Manager
	//     // #viewManager = new ViewManager(#go);
	// }

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {}

	// Update()
	// {
	//     // #viewManager.Update();
	// }

	// ____________________________________________________________________ Size

	setSize(width, height) {}
}
