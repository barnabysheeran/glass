import ApplicationLogger from '../../../../application/ApplicationLogger.js';

import GridData from '../grid/GridData.js';

import Dot from './Dot.js';

export default class DotManager {
	// private List<Dot> #dots;
	// private int #dotPoolSize = 512;
	// private int #dotPoolIndex = 0;

	#DOTS = [];
	#dotPoolSize = 512;
	#dotPoolIndex = 0;

	#LOG_LEVEL = 5;

	// _________________________________________________________________________

	constructor(container) {
		ApplicationLogger.log('DotManager', this.#LOG_LEVEL);

		// // Create Dot Pool
		// #dots = new List<Dot>();
		// for (int i = 0; i < #dotPoolSize; i++)
		// {
		//     Dot dot = new Dot(i, container);
		//     #dots.Add(dot);
		// }

		// Create Dot Pool
		for (let i = 0; i < this.#dotPoolSize; i += 1) {
			const dot = new Dot(i, container);
			this.#DOTS.push(dot);
		}
	}

	// ____________________________________________________________________ Tick

	tick() {
		// foreach (Dot dot in #dots)
		// {
		//     dot.Update();
		// }

		for (let i = 0; i < this.#DOTS.length; i += 1) {
			this.#DOTS[i].update();
		}
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

		// Get Dot
		const DOT = this.#DOTS[dotIndex];

		// Set Position
		DOT.setPosition(GridData.getGridPixelPosition(positionGrid));
	}

	// ____________________________________________________________________ Fill

	fillDot(dotIndex) {
		// // Get Dot
		// Dot dot = #dots[dotIndex];
		// // Fill
		// dot.Fill();

		// Get Dot
		const DOT = this.#DOTS[dotIndex];

		// Fill
		DOT.fill();
	}

	// ___________________________________________________________________ Clear

	clearDot(dotIndex) {
		// // Get Dot
		// Dot dot = #dots[dotIndex];
		// // Clear
		// dot.Clear();

		// Get Dot
		const DOT = this.#DOTS[dotIndex];

		// Clear
		DOT.clear();
	}

	// __________________________________________________________________ Status

	LogStatus() {
		ApplicationLogger.log(
			`DotManager. Index ${this.#dotPoolIndex} of ${this.#dotPoolSize} Dots`,
			this.#LOG_LEVEL,
		);

		// Debug.Log("DotManager. Index " + #dotPoolIndex + " of " + #dotPoolSize + " Dots");
	}
}
