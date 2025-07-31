import GridData from '../../../../grid/GridData.js';

import View from '../DotMatrixView.js';

import DirectableDotMatrixConstants from '../../DirectableDotMatrixConstants.js';

import FillType from '../../enum/FillType.js';
import FillStrategyType from '../../enum/FillStrategyType.js';
import DrawType from '../../enum/DrawType.js';

import ComponentLineWidthFull from '../../component/line/ComponentLineWidthFull.js';
import ComponentGlyphBoxWidthFull from '../../component/glyph/ComponentGlyphBoxWidthFull.js';

export default class ViewIntro extends View {
	#drawGlyphName = '{heart}';

	#DELAY_GLYPH_IN = 2;
	#DELAY_GLYPH_OUT = 0;
	#delayGlyph;

	// ___________________________________________________________________ Start

	start(delayFrames) {
		super.start(delayFrames);

		// Set Delay Glyph
		this.#delayGlyph = this.#DELAY_GLYPH_IN;

		// Start
		this.draw(delayFrames, DrawType.Fill);
	}

	stop(delayFrames) {
		super.stop(delayFrames);

		// Set Delay Glyph
		this.#delayGlyph = this.#DELAY_GLYPH_OUT;

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

		// TODO

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

	onDrawComplete() {
		super.onDrawComplete();

		console.log('ViewIntro onDrawComplete');

		this.draw(0, DrawType.Clear);

		// TODO Hard coded for now
		this.draw(120, DrawType.Fill);
	}

	// ____________________________________________________________________ Draw

	draw(delayFrames, drawType) {
		super.draw(delayFrames, drawType);

		// Get Height
		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeightInGridCells();
		const LINE_HEIGHT_HEADER =
			DirectableDotMatrixConstants.getHeaderHeightInLines();
		const LINE_HEIGHT_FOOTER =
			DirectableDotMatrixConstants.getFooterHeightInLines();

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
				DirectableDotMatrixConstants.getDelayFromGridPosition(0, gridY),
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
				this.#drawGlyphName,
				0,
				GRID_Y,
				delayFrames +
					DirectableDotMatrixConstants.getDelayFromGridPosition(0, GRID_Y),
				this.#delayGlyph,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				drawType,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT);
		}
	}

	// TODO

	// onDrawComplete() {
	// 	super.onDrawComplete();

	// 	// // Active ?
	// 	// if (this.isActive === false) {
	// 	// 	return;
	// 	// }

	// 	// // Undraw
	// 	// this.draw(0, DrawType.Clear);

	// 	// // Redraw
	// 	// this.#delayFramesReDraw = this.#DELAY_FRAMES_REDRAW;
	// }
}
