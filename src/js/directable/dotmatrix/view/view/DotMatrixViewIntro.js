import ApplicationLogger from '../../../../application/ApplicationLogger.js';

import GridData from '../../../../grid/GridData.js';

import DotMatrixView from '../DotMatrixView.js';

import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import ComponentLineWidthFull from '../../component/line/ComponentLineWidthFull.js';
import ComponentGlyphBox from '../../component/glyph/ComponentGlyphBox.js';
import ComponentGlyphBoxWidthFull from '../../component/glyph/ComponentGlyphBoxWidthFull.js';
import ComponentRectangle from '../../component/primative/ComponentRectangle.js';

export default class DotMatrixViewIntro extends DotMatrixView {
	COMPONENTS = [];

	#LOG_LEVEL = 4;

	// _________________________________________________________________________

	constructor(shapeManager, viewId) {
		super(shapeManager, viewId);

		ApplicationLogger.log('View Holding', this.#LOG_LEVEL);
	}

	// ___________________________________________________________________ Start

	start() {
		const LINE_HEIGHT = DotMatrixViewConstants.getLineHeight();

		// Get Grid Size
		const GRID_MAX = GridData.getGridMax();

		const GRID_MAX_WIDTH = GRID_MAX[0];
		const GRID_MAX_WIDTH_THIRD = Math.floor(GRID_MAX_WIDTH / 3);

		const GRID_MAX_HEIGHT = GRID_MAX[1];
		const LINE_HEIGHT_MAX = Math.floor(GRID_MAX_HEIGHT / LINE_HEIGHT);

		// Create Component Line Top
		const LINE_TOP = new ComponentLineWidthFull(
			this.SHAPE_MANAGER,
			LINE_HEIGHT * 4,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			1,
		);

		this.COMPONENTS.push(LINE_TOP);

		// Add Dummy Text with Line Height
		const BLOCK_GRID_TOP = 5;
		const BLOCK_GRID_BOTTOM = LINE_HEIGHT_MAX - 8;
		const BLOCK_DELAY_PER_LINE = 5;

		for (let i = BLOCK_GRID_TOP; i < BLOCK_GRID_BOTTOM; i += 3) {
			// Create Component
			const COMPONENT = new ComponentGlyphBoxWidthFull(
				this.SHAPE_MANAGER,
				'I',
				0,
				LINE_HEIGHT * i,
				100,
				50,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				this.getDelayFromGridY(i),
			);

			// Store
			this.COMPONENTS.push(COMPONENT);
		}

		for (let i = BLOCK_GRID_TOP + 1; i < BLOCK_GRID_BOTTOM; i += 3) {
			// Create Component
			const COMPONENT = new ComponentGlyphBoxWidthFull(
				this.SHAPE_MANAGER,
				'I',
				0,
				LINE_HEIGHT * i,
				100,
				50,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				this.getDelayFromGridY(i),
			);

			// Store
			this.COMPONENTS.push(COMPONENT);
		}

		for (let i = BLOCK_GRID_TOP + 2; i < BLOCK_GRID_BOTTOM; i += 3) {
			// Create Component
			const COMPONENT = new ComponentGlyphBoxWidthFull(
				this.SHAPE_MANAGER,
				'.',
				0,
				LINE_HEIGHT * i,
				100,
				50,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				this.getDelayFromGridY(i),
			);

			// Store
			this.COMPONENTS.push(COMPONENT);
		}

		// Create Component Line Bottom
		const LINE_BOTTOM = new ComponentLineWidthFull(
			this.SHAPE_MANAGER,
			LINE_HEIGHT * (BLOCK_GRID_BOTTOM + 1),
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			this.getDelayFromGridY(BLOCK_GRID_BOTTOM + 1),
		);

		this.COMPONENTS.push(LINE_BOTTOM);

		// Create Component Dot

		const COMPONENT_DOT = new ComponentGlyphBoxWidthFull(
			this.SHAPE_MANAGER,
			'.,',
			0,
			LINE_HEIGHT * (BLOCK_GRID_BOTTOM + 1),
			100,
			50,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			this.getDelayFromGridY(BLOCK_GRID_BOTTOM + 1),
		);

		// Store
		this.COMPONENTS.push(COMPONENT_DOT);
	}
}
