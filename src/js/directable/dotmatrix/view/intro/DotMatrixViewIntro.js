import GridData from '../../../../grid/GridData.js';

import DotMatrixView from '../DotMatrixView.js';

import DirectableDotMatrixConstants from '../../DirectableDotMatrixConstants.js';
import DirectableDotMatrixDelays from '../../DirectableDotMatrixDelays.js';

import FillType from '../../enum/FillType.js';
import FillStrategyType from '../../enum/FillStrategyType.js';
import DrawType from '../../enum/DrawType.js';

import ComponentLineWidthFull from '../../component/line/ComponentLineWidthFull.js';
import ComponentGlyphBoxWidthFull from '../../component/glyph/ComponentGlyphBoxWidthFull.js';

export default class DotMatrixViewIntro extends DotMatrixView {
	#delayFramesReDraw = -1;

	#DELAY_GLYPH = 1;
	#DELAY_FRAMES_REDRAW = 60;

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

	// ____________________________________________________________________ Tick

	tick() {
		// Not calling super

		// Active ?
		if (this.isActive === false) {
			return;
		}

		// Redraw ?
		// if (this.#delayFramesReDraw > 0) {
		// 	// Count Down
		// 	this.#delayFramesReDraw -= 1;

		// 	// Redraw
		// 	if (this.#delayFramesReDraw === 0) {
		// 		this.draw(0);
		// 	}
		// }
	}

	// ____________________________________________________________________ Draw

	draw(delayFrames, drawType) {
		super.draw(delayFrames);

		// Get Height
		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();
		const LINE_HEIGHT_HEADER =
			DirectableDotMatrixConstants.getLineHeightHeader();
		const LINE_HEIGHT_FOOTER =
			DirectableDotMatrixConstants.getLineHeightFooter();

		// Get Grid Data
		const GRID_HEIGHT_IN_CELLS = GridData.getGridHeightInCells();
		const GRID_HEIGHT_IN_LINES = Math.floor(GRID_HEIGHT_IN_CELLS / LINE_HEIGHT);

		// Calculate
		const LINE_HEIGHT_MAX = GRID_HEIGHT_IN_LINES - LINE_HEIGHT_FOOTER;

		// Variable
		let gridY = LINE_HEIGHT * LINE_HEIGHT_HEADER;

		// Create Component Line Top
		const LINE_TOP = new ComponentLineWidthFull(
			this.SHAPE_MANAGER,
			gridY,
			delayFrames +
				DirectableDotMatrixDelays.getDelayFromGridPosition(0, gridY),
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			drawType,
		);

		this.COMPONENT_MANAGER.addComponent(LINE_TOP);

		// Add Text with Line Height
		for (let i = LINE_HEIGHT_HEADER + 1; i < LINE_HEIGHT_MAX; i += 1) {
			// Create Component
			const GRID_Y = LINE_HEIGHT * i;

			const COMPONENT = new ComponentGlyphBoxWidthFull(
				this.SHAPE_MANAGER,
				'{heart}',
				0,
				GRID_Y,
				delayFrames +
					DirectableDotMatrixDelays.getDelayFromGridPosition(0, GRID_Y),
				this.#DELAY_GLYPH,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				drawType,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT);
		}

		// Create Component Line Bottom
		gridY = LINE_HEIGHT * LINE_HEIGHT_MAX;

		const LINE_BOTTOM = new ComponentLineWidthFull(
			this.SHAPE_MANAGER,
			gridY,
			delayFrames +
				DirectableDotMatrixDelays.getDelayFromGridPosition(0, gridY),
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			drawType,
		);

		this.COMPONENT_MANAGER.addComponent(LINE_BOTTOM);

		// Create Component Dot
		gridY = LINE_HEIGHT * LINE_HEIGHT_MAX;

		const COMPONENT_DOT = new ComponentGlyphBoxWidthFull(
			this.SHAPE_MANAGER,
			'.,',
			0,
			gridY,
			delayFrames +
				DirectableDotMatrixDelays.getDelayFromGridPosition(0, gridY),
			this.#DELAY_GLYPH,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			drawType,
		);

		// Store
		this.COMPONENT_MANAGER.addComponent(COMPONENT_DOT);
	}

	onDrawComplete() {
		super.onDrawComplete();

		// // Active ?
		// if (this.isActive === false) {
		// 	return;
		// }

		// // Undraw
		// this.draw(0, DrawType.Clear);

		// // Redraw
		// this.#delayFramesReDraw = this.#DELAY_FRAMES_REDRAW;
	}
}
