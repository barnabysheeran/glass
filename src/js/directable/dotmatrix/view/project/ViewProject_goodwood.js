import DataController from '../../../../data/DataController.js';

import View from '../DotMatrixView.js';

import DirectableDotMatrixConstants from '../../DirectableDotMatrixConstants.js';

import DrawType from '../../enum/DrawType.js';

export default class ViewProject_sciencemuseum extends View {
	#DELAY_GLYPH = 1;

	// ___________________________________________________________________ Start

	start(delayFrames = 0) {
		super.start(delayFrames);

		// Start
		this.draw(delayFrames, DrawType.Fill);
	}

	stop(delayFrames = 0) {
		super.stop(delayFrames);

		// Stop
		this.draw(delayFrames, DrawType.Clear);
	}

	// ____________________________________________________________________ Draw

	draw(delayFrames, drawType) {
		super.draw(delayFrames, drawType);

		// Get Project Data
		const DATA_PROJECT = DataController.getProjectById(this.getViewId());

		// Get Heights
		const LINE_HEIGHT_IN_GRID_CELLS =
			DirectableDotMatrixConstants.getLineHeightInGridCells();

		const MEDIA_BOTTOM_IN_GRID_CELLS =
			DirectableDotMatrixConstants.getMediaBottomInGridCells(
				DATA_PROJECT['media-aspect'],
			);

		// Initialise Grid Positions
		let gridX = 0;
		let gridY = MEDIA_BOTTOM_IN_GRID_CELLS + LINE_HEIGHT_IN_GRID_CELLS;

		// Add Project Text
		this.addProjectText(
			DATA_PROJECT,
			gridX,
			gridY,
			this.#DELAY_GLYPH,
			delayFrames,
			drawType,
		);
	}
}
