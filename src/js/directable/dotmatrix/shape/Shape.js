import ApplicationLogger from '../../../application/ApplicationLogger.js';

export default class Shape {
	// DotManager #dotManager;
	// List<Vector2Int> #positionGrids = new List<Vector2Int>();
	// int #positionGridsIndex = 0;

	// bool #isComplete = false;

	#positionGridsIndex = 0;
	positionGrids = [];

	#dotManager;
	#isComplete = false;

	#LOG_LEVEL = 7;

	// _________________________________________________________________________

	constructor(dotManager) {
		ApplicationLogger.log('Shape', this.#LOG_LEVEL);

		// Store
		this.#dotManager = dotManager;
	}

	// ____________________________________________________________________ Tick

	tick() {
		ApplicationLogger.log(
			`Shape tick positionGridsIndex ${this.#positionGridsIndex}`,
			this.#LOG_LEVEL,
		);

		// Complete ?
		if (this.#isComplete) {
			return;
		}

		// Get Dot Index
		let dotIndex = this.#dotManager.getNextFreeDotIndex();

		// Clear Current Dot
		this.#dotManager.clearDot(dotIndex);

		// if (dotIndex == -1)
		// {
		//     Debug.Log("ShapeLineHorizontal. No more free Dots");
		//     break;
		// }

		// TODO -1 Off Grid ?

		// Position
		this.#dotManager.setDotPosition(
			dotIndex,
			this.positionGrids[this.#positionGridsIndex],
		);

		// Fill Dot
		this.#dotManager.fillDot(dotIndex);

		// Increment Index
		this.#positionGridsIndex += 1;

		// Check Complete
		if (this.#positionGridsIndex >= this.positionGrids.Count) {
			this.#isComplete = true;
			return;
		}
	}

	// virtual Update()
	// {
	//     // Debug.Log("Shape. Update " + #positionGridsIndex);

	//     // Complete ?
	//     if (#isComplete)
	//     {
	//         return;
	//     }

	//     // Get Dot Index
	//     int dotIndex = #dotManager.GetNextFreeDotIndex();

	//     // Clear Current Dot
	//     #dotManager.ClearDot(dotIndex);

	//     // if (dotIndex == -1)
	//     // {
	//     //     Debug.Log("ShapeLineHorizontal. No more free Dots");
	//     //     break;
	//     // }

	//     // TODO -1 Off Grid ?

	//     // Position
	//     #dotManager.SetDotPosition(dotIndex, #positionGrids[#positionGridsIndex]);

	//     // Fill Dot
	//     #dotManager.FillDot(dotIndex);

	//     // Increment Index
	//     #positionGridsIndex++;

	//     // Check Complete
	//     if (#positionGridsIndex >= #positionGrids.Count)
	//     {
	//         #isComplete = true;
	//         return;
	//     }
	// }
}
