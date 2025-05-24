import ApplicationLogger from '../../../application/ApplicationLogger.js';
import Directable from '../Directable.js';

export default class DirectableDotMatrix extends Directable {
	// private GameObject m_go;
	// private ViewManager m_viewManager;

	// _________________________________________________________________________

	constructor() {
		super();

		ApplicationLogger.log('DirectableDotMatrix', this.LOG_LEVEL);
	}

	// public DotMatrixController(GameObject container)
	// {
	//     // // Create Game Object
	//     // m_go = new GameObject("DotMatrix");
	//     // m_go.layer = LayerMask.NameToLayer("UserInterface");
	//     // m_go.transform.position = Vector3.zero;
	//     // m_go.transform.SetParent(container.transform);

	//     // // Create View Manager
	//     // m_viewManager = new ViewManager(m_go);
	// }

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {}

	// public void Update()
	// {
	//     // m_viewManager.Update();
	// }

	// ____________________________________________________________________ Size

	setSize(width, height) {}
}
