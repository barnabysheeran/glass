import GridData from '../../../../grid/GridData.js';

import DotMatrixView from '../DotMatrixView.js';

import DirectableDotMatrixConstants from '../../DirectableDotMatrixConstants.js';

import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import ComponentLineWidthFull from '../../component/line/ComponentLineWidthFull.js';
import ComponentGlyphBox from '../../component/glyph/ComponentGlyphBox.js';
import ComponentGlyphBoxWidthFull from '../../component/glyph/ComponentGlyphBoxWidthFull.js';
import ComponentRectangle from '../../component/primative/ComponentRectangle.js';

export default class DotMatrixViewTest extends DotMatrixView {
	// ____________________________________________________________________ Draw

	draw() {
		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();

		// Get Grid Size
		const GRID_MAX = GridData.getGridMax();

		const GRID_MAX_WIDTH = GRID_MAX[0];
		const GRID_MAX_WIDTH_THIRD = Math.floor(GRID_MAX_WIDTH / 3);

		const GRID_MAX_HEIGHT = GRID_MAX[1];
		const LINE_HEIGHT_MAX = Math.floor(GRID_MAX_HEIGHT / LINE_HEIGHT);

		// Create Component Line Top
		const LINE_TOP = new ComponentLineWidthFull(
			this.SHAPE_MANAGER,
			LINE_HEIGHT,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			1,
		);

		// Store
		this.COMPONENT_MANAGER.addComponent(LINE_TOP);

		// Create Component ABC
		const COMPONENT_ABC = new ComponentGlyphBox(
			this.SHAPE_MANAGER,
			'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			0,
			LINE_HEIGHT * 3,
			100,
			50,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			GRID_MAX_WIDTH,
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT_ABC);

		// Add Component 0001
		const COMPONENT_0001 = new ComponentGlyphBox(
			this.SHAPE_MANAGER,
			'0123456789',
			0,
			LINE_HEIGHT * 4,
			100,
			50,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			GRID_MAX_WIDTH,
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT_0001);

		// Add Component Special Chars
		const COMPONENT_SPECIAL_CHARS = new ComponentGlyphBox(
			this.SHAPE_MANAGER,
			`-_/:;,.`,
			0,
			LINE_HEIGHT * 5,
			100,
			50,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			GRID_MAX_WIDTH,
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT_SPECIAL_CHARS);

		// Rectangles
		const RECTANGLE_GRID_Y = LINE_HEIGHT * 7;
		const RECTANGLE_WIDTH = LINE_HEIGHT * 1;
		const RECTANGLE_HEIGHT = LINE_HEIGHT * 1;

		// Create Component Rectangle A
		const COMPONENT_RECTANGLE_A = new ComponentRectangle(
			this.SHAPE_MANAGER,
			0,
			RECTANGLE_GRID_Y,
			RECTANGLE_WIDTH,
			RECTANGLE_HEIGHT,
			FillType.PassThrough,
			FillStrategyType.Reverse,
			GRID_MAX_WIDTH_THIRD,
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT_RECTANGLE_A);

		// Create Component Rectangle B
		const COMPONENT_RECTANGLE_B = new ComponentRectangle(
			this.SHAPE_MANAGER,
			RECTANGLE_WIDTH + 2,
			RECTANGLE_GRID_Y,
			RECTANGLE_WIDTH,
			RECTANGLE_HEIGHT,
			FillType.PassThrough,
			FillStrategyType.Random,
			GRID_MAX_WIDTH - GRID_MAX_WIDTH_THIRD,
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT_RECTANGLE_B);

		// Create Component Rectangle C
		const COMPONENT_RECTANGLE_C = new ComponentRectangle(
			this.SHAPE_MANAGER,
			RECTANGLE_WIDTH * 2 + 4,
			RECTANGLE_GRID_Y,
			RECTANGLE_WIDTH,
			RECTANGLE_HEIGHT,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			GRID_MAX_WIDTH,
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT_RECTANGLE_C);

		// Add Dummy Text with Line Height
		const BLOCK_GRID_TOP = 10;
		const BLOCK_GRID_BOTTOM = LINE_HEIGHT_MAX - 3;
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
				BLOCK_DELAY_PER_LINE * i,
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
				100,
				50,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				120 + BLOCK_DELAY_PER_LINE * i,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT);
		}

		for (let i = BLOCK_GRID_TOP + 2; i < BLOCK_GRID_BOTTOM; i += 3) {
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
				240 + BLOCK_DELAY_PER_LINE * i,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT);
		}

		// Create Component Line Bottom
		const LINE_BOTTOM = new ComponentLineWidthFull(
			this.SHAPE_MANAGER,
			LINE_HEIGHT * (LINE_HEIGHT_MAX - 2),
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			1,
		);

		this.COMPONENT_MANAGER.addComponent(LINE_BOTTOM);
	}

	// __________________________________________________________________ Undraw

	undraw() {}
}
