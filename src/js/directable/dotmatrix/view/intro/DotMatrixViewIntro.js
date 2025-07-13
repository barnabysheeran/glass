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
	// ___________________________________________________________________ Start

	start(delayFrames = 0) {
		super.start(delayFrames);

		// Start
		this.draw(delayFrames);
	}

	stop(delayFrames = 0) {
		super.stop(delayFrames);

		// Stop
		this.undraw(delayFrames);
	}

	// ____________________________________________________________________ Draw

	draw(delayFrames) {
		super.draw(delayFrames);

		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();

		// Get Grid Data
		const GRID_HEIGHT_IN_CELLS = GridData.getGridHeightInCells();
		const LINE_HEIGHT_MAX = Math.floor(GRID_HEIGHT_IN_CELLS / LINE_HEIGHT);

		let gridY;

		// Create Component Line Top
		gridY = LINE_HEIGHT * 4;

		const LINE_TOP = new ComponentLineWidthFull(
			this.SHAPE_MANAGER,
			gridY,
			delayFrames +
				DirectableDotMatrixDelays.getDelayFromGridPosition(0, gridY),
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.COMPONENT_MANAGER.addComponent(LINE_TOP);

		// Add Dummy Text with Line Height
		const BLOCK_GRID_TOP = 5;
		const BLOCK_GRID_BOTTOM = LINE_HEIGHT_MAX - 8;

		for (let i = BLOCK_GRID_TOP; i < BLOCK_GRID_BOTTOM; i += 1) {
			// Create Component
			const GRID_Y = LINE_HEIGHT * i;

			const COMPONENT = new ComponentGlyphBoxWidthFull(
				this.SHAPE_MANAGER,
				'I',
				0,
				GRID_Y,
				delayFrames +
					DirectableDotMatrixDelays.getDelayFromGridPosition(0, GRID_Y),
				FillType.PassThrough,
				FillStrategyType.PassThrough,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT);
		}

		// Create Component Line Bottom
		gridY = LINE_HEIGHT * (BLOCK_GRID_BOTTOM + 1);

		const LINE_BOTTOM = new ComponentLineWidthFull(
			this.SHAPE_MANAGER,
			gridY,
			delayFrames +
				DirectableDotMatrixDelays.getDelayFromGridPosition(0, gridY),
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.COMPONENT_MANAGER.addComponent(LINE_BOTTOM);

		// Create Component Dot
		gridY = LINE_HEIGHT * (BLOCK_GRID_BOTTOM + 1);

		const COMPONENT_DOT = new ComponentGlyphBoxWidthFull(
			this.SHAPE_MANAGER,
			'.,',
			0,
			gridY,
			delayFrames +
				DirectableDotMatrixDelays.getDelayFromGridPosition(0, gridY),
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		// Store
		this.COMPONENT_MANAGER.addComponent(COMPONENT_DOT);
	}

	// __________________________________________________________________ Undraw

	undraw(delayFrames) {
		super.undraw(delayFrames);

		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();

		// Get Grid Data
		const GRID_HEIGHT_IN_CELLS = GridData.getGridHeightInCells();
		const LINE_HEIGHT_MAX = Math.floor(GRID_HEIGHT_IN_CELLS / LINE_HEIGHT);

		let gridY;

		// Create Component Line Top
		gridY = LINE_HEIGHT * 4;

		console.log(
			' - ' +
				delayFrames +
				DirectableDotMatrixDelays.getDelayFromGridPosition(0, gridY),
		);

		const LINE_TOP = new ComponentLineWidthFull(
			this.SHAPE_MANAGER,
			gridY,
			delayFrames +
				DirectableDotMatrixDelays.getDelayFromGridPosition(0, gridY),
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			DrawType.Clear,
		);

		this.COMPONENT_MANAGER.addComponent(LINE_TOP);

		// Add Dummy Text with Line Height
		const BLOCK_GRID_TOP = 5;
		const BLOCK_GRID_BOTTOM = LINE_HEIGHT_MAX - 8;

		for (let i = BLOCK_GRID_TOP; i < BLOCK_GRID_BOTTOM; i += 1) {
			// Create Component
			const GRID_Y = LINE_HEIGHT * i;

			const COMPONENT = new ComponentGlyphBoxWidthFull(
				this.SHAPE_MANAGER,
				'I',
				0,
				GRID_Y,
				delayFrames +
					DirectableDotMatrixDelays.getDelayFromGridPosition(0, GRID_Y),
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				DrawType.Clear,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT);
		}

		// Create Component Line Bottom
		gridY = LINE_HEIGHT * (BLOCK_GRID_BOTTOM + 1);

		const LINE_BOTTOM = new ComponentLineWidthFull(
			this.SHAPE_MANAGER,
			gridY,
			delayFrames +
				DirectableDotMatrixDelays.getDelayFromGridPosition(0, gridY),
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			DrawType.Clear,
		);

		this.COMPONENT_MANAGER.addComponent(LINE_BOTTOM);

		// Create Component Dot
		gridY = LINE_HEIGHT * (BLOCK_GRID_BOTTOM + 1);

		const COMPONENT_DOT = new ComponentGlyphBoxWidthFull(
			this.SHAPE_MANAGER,
			'.,',
			0,
			gridY,
			delayFrames +
				DirectableDotMatrixDelays.getDelayFromGridPosition(0, gridY),
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			DrawType.Clear,
		);

		// Store
		this.COMPONENT_MANAGER.addComponent(COMPONENT_DOT);
	}
}
