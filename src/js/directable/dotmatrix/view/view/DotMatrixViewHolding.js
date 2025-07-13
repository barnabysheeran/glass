import GridData from '../../../../grid/GridData.js';

import DotMatrixView from '../DotMatrixView.js';

import DirectableDotMatrixConstants from '../../DirectableDotMatrixConstants.js';

import FillType from '../../enum/FillType.js';
import FillStrategyType from '../../enum/FillStrategyType.js';

import ComponentLineWidthFull from '../../component/line/ComponentLineWidthFull.js';
import ComponentGlyphBoxWidthFull from '../../component/glyph/ComponentGlyphBoxWidthFull.js';

export default class DotMatrixViewHolding extends DotMatrixView {
	// ___________________________________________________________________ Start

	start(startDelayFrames) {
		super.start(startDelayFrames);
	}

	stop() {
		super.stop();
	}

	// ____________________________________________________________________ Draw

	draw() {
		super.draw();

		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();

		// Get Grid Data
		const GRID_HEIGHT_IN_CELLS = GridData.getGridHeightInCells();

		// Create Component Line Top
		const LINE_TOP = new ComponentLineWidthFull(
			this.SHAPE_MANAGER,
			LINE_HEIGHT * 4,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			1,
		);

		this.COMPONENT_MANAGER.addComponent(LINE_TOP);

		// Add Dummy Text with Line Height
		const BLOCK_GRID_TOP = 5;
		const BLOCK_GRID_BOTTOM = GRID_HEIGHT_IN_CELLS - 8;

		for (let i = BLOCK_GRID_TOP; i < BLOCK_GRID_BOTTOM; i += 3) {
			// Create Component
			const COMPONENT = new ComponentGlyphBoxWidthFull(
				this.SHAPE_MANAGER,
				'I',
				0,
				LINE_HEIGHT * i,
				this.getDelayFromGridY(i),
				FillType.PassThrough,
				FillStrategyType.PassThrough,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT);
		}

		for (let i = BLOCK_GRID_TOP + 1; i < BLOCK_GRID_BOTTOM; i += 3) {
			// Create Component
			const COMPONENT = new ComponentGlyphBoxWidthFull(
				this.SHAPE_MANAGER,
				'I',
				0,
				LINE_HEIGHT * i,
				this.getDelayFromGridY(i),
				FillType.PassThrough,
				FillStrategyType.PassThrough,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT);
		}

		for (let i = BLOCK_GRID_TOP + 2; i < BLOCK_GRID_BOTTOM; i += 3) {
			// Create Component
			const COMPONENT = new ComponentGlyphBoxWidthFull(
				this.SHAPE_MANAGER,
				'.',
				0,
				LINE_HEIGHT * i,
				this.getDelayFromGridY(i),
				FillType.PassThrough,
				FillStrategyType.PassThrough,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT);
		}

		// Create Component Line Bottom
		const LINE_BOTTOM = new ComponentLineWidthFull(
			this.SHAPE_MANAGER,
			LINE_HEIGHT * (BLOCK_GRID_BOTTOM + 1),
			this.getDelayFromGridY(BLOCK_GRID_BOTTOM + 1),
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.COMPONENT_MANAGER.addComponent(LINE_BOTTOM);

		// Create Component Dot

		const COMPONENT_DOT = new ComponentGlyphBoxWidthFull(
			this.SHAPE_MANAGER,
			'.,',
			0,
			LINE_HEIGHT * (BLOCK_GRID_BOTTOM + 1),
			this.getDelayFromGridY(BLOCK_GRID_BOTTOM + 1),
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		// Store
		this.COMPONENT_MANAGER.addComponent(COMPONENT_DOT);
	}
}
