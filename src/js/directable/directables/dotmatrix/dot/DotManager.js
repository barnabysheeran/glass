export default class DotManager {
	// private List<Dot> #dots;
	// private int #dotPoolSize = 512;
	// private int #dotPoolIndex = 0;

	// _________________________________________________________________________

	DotManager(container) {
		// // Create Dot Pool
		// #dots = new List<Dot>();
		// for (int i = 0; i < #dotPoolSize; i++)
		// {
		//     Dot dot = new Dot(i, container);
		//     #dots.Add(dot);
		// }
	}

	// ____________________________________________________________________ Tick

	tick() {
		// foreach (Dot dot in #dots)
		// {
		//     dot.Update();
		// }
	}

	// ________________________________________________________________ Dot Pool

	getNextFreeDotIndex() {
		// int index = #dotPoolIndex;
		// // Next
		// #dotPoolIndex++;
		// // Recycle from Start of Pool
		// if (#dotPoolIndex >= #dotPoolSize)
		// {
		//     #dotPoolIndex = 0;
		// }
		// return index;
	}

	// ________________________________________________________________ Position

	setDotPosition(dotIndex, positionGrid) {
		// // Get Dot
		// Dot dot = #dots[dotIndex];
		// // Set Position
		// dot.SetPosition(GridData.GetGridPixelPosition(positionGrid));
	}

	// ____________________________________________________________________ Fill

	fillDot(dotIndex) {
		// // Get Dot
		// Dot dot = #dots[dotIndex];
		// // Fill
		// dot.Fill();
	}

	// ___________________________________________________________________ Clear

	clearDot(dotIndex) {
		// // Get Dot
		// Dot dot = #dots[dotIndex];
		// // Clear
		// dot.Clear();
	}

	// __________________________________________________________________ Status

	LogStatus() {
		// Debug.Log("DotManager. Index " + #dotPoolIndex + " of " + #dotPoolSize + " Dots");
	}
}
