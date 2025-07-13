import GridData from '../../../../grid/GridData.js';

import DotMatrixView from '../DotMatrixView.js';

import DirectableDotMatrixConstants from '../../DirectableDotMatrixConstants.js';
import DirectableDotMatrixDelays from '../../DirectableDotMatrixDelays.js';

import FillType from '../../enum/FillType.js';
import FillStrategyType from '../../enum/FillStrategyType.js';

import ComponentLineWidthFull from '../../component/line/ComponentLineWidthFull.js';
import ComponentGlyphBox from '../../component/glyph/ComponentGlyphBox.js';
import ComponentGlyphBoxWidthFull from '../../component/glyph/ComponentGlyphBoxWidthFull.js';
import ComponentRectangle from '../../component/primative/ComponentRectangle.js';
import DrawType from '../../enum/DrawType.js';

export default class DotMatrixViewTest extends DotMatrixView {
	#STRING_CHAR_TEST = `-_/:;,.'!"^<>`;

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

		// Get Line Height
		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();

		// Get Grid Data
		const GRID_WIDTH_IN_CELLS = GridData.getGridWidthInCells();
		const GRID_HEIGHT_IN_CELLS = GridData.getGridHeightInCells();

		const GRID_WIDTH_IN_CELLS_THIRD = Math.floor(GRID_WIDTH_IN_CELLS / 3);
		const LINE_HEIGHT_MAX = Math.floor(GRID_HEIGHT_IN_CELLS / LINE_HEIGHT);

		// Component Line Top
		const LINE_TOP = new ComponentLineWidthFull(
			this.SHAPE_MANAGER,
			LINE_HEIGHT,
			1,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
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
			GRID_WIDTH_IN_CELLS_THIRD,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
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
			GRID_WIDTH_IN_CELLS_THIRD * 2,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT_0001);

		// Add Component Special Chars
		const COMPONENT_SPECIAL_CHARS = new ComponentGlyphBox(
			this.SHAPE_MANAGER,
			this.#STRING_CHAR_TEST,
			0,
			LINE_HEIGHT * 5,
			100,
			50,
			GRID_WIDTH_IN_CELLS,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
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
			GRID_WIDTH_IN_CELLS_THIRD,
			FillType.PassThrough,
			FillStrategyType.Reverse,
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT_RECTANGLE_A);

		// Create Component Rectangle B
		const COMPONENT_RECTANGLE_B = new ComponentRectangle(
			this.SHAPE_MANAGER,
			RECTANGLE_WIDTH + 2,
			RECTANGLE_GRID_Y,
			RECTANGLE_WIDTH,
			RECTANGLE_HEIGHT,
			GRID_WIDTH_IN_CELLS - GRID_WIDTH_IN_CELLS_THIRD,
			FillType.PassThrough,
			FillStrategyType.Random,
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT_RECTANGLE_B);

		// Create Component Rectangle C
		const COMPONENT_RECTANGLE_C = new ComponentRectangle(
			this.SHAPE_MANAGER,
			RECTANGLE_WIDTH * 2 + 4,
			RECTANGLE_GRID_Y,
			RECTANGLE_WIDTH,
			RECTANGLE_HEIGHT,
			GRID_WIDTH_IN_CELLS,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT_RECTANGLE_C);

		// Dummy Text with Line Height
		const BLOCK_GRID_TOP = 10;
		const BLOCK_GRID_BOTTOM = LINE_HEIGHT_MAX - 3;
		// const BLOCK_DELAY_PER_LINE = 1;

		for (let i = BLOCK_GRID_TOP; i < BLOCK_GRID_BOTTOM; i += 3) {
			// Create Component
			const Y = LINE_HEIGHT * i;

			const COMPONENT = new ComponentGlyphBoxWidthFull(
				this.SHAPE_MANAGER,
				'HELLO',
				0,
				Y,
				100,
				50,
				DirectableDotMatrixDelays.getDelayFromGridPosition(0, Y),
				FillType.PassThrough,
				FillStrategyType.PassThrough,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT);
		}

		for (let i = BLOCK_GRID_TOP + 1; i < BLOCK_GRID_BOTTOM; i += 3) {
			// Create Component
			const Y = LINE_HEIGHT * i;

			const COMPONENT = new ComponentGlyphBoxWidthFull(
				this.SHAPE_MANAGER,
				`I'M`,
				0,
				Y,
				100,
				50,
				DirectableDotMatrixDelays.getDelayFromGridPosition(0, Y),
				FillType.PassThrough,
				FillStrategyType.PassThrough,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT);
		}

		for (let i = BLOCK_GRID_TOP + 2; i < BLOCK_GRID_BOTTOM; i += 3) {
			// Create Component
			const Y = LINE_HEIGHT * i;

			const COMPONENT = new ComponentGlyphBoxWidthFull(
				this.SHAPE_MANAGER,
				'BARNABY',
				0,
				Y,
				100,
				50,
				DirectableDotMatrixDelays.getDelayFromGridPosition(0, Y),
				FillType.PassThrough,
				FillStrategyType.PassThrough,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT);
		}

		// Create Component Line Bottom
		const LINE_BOTTOM = new ComponentLineWidthFull(
			this.SHAPE_MANAGER,
			LINE_HEIGHT * (LINE_HEIGHT_MAX - 2),
			1,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.COMPONENT_MANAGER.addComponent(LINE_BOTTOM);
	}

	// __________________________________________________________________ Undraw

	undraw() {
		// Get Line Height
		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();

		// Get Grid Data
		const GRID_WIDTH_IN_CELLS = GridData.getGridWidthInCells();
		const GRID_HEIGHT_IN_CELLS = GridData.getGridHeightInCells();

		const GRID_WIDTH_IN_CELLS_THIRD = Math.floor(GRID_WIDTH_IN_CELLS / 3);
		const LINE_HEIGHT_MAX = Math.floor(GRID_HEIGHT_IN_CELLS / LINE_HEIGHT);

		// Component Line Top
		const LINE_TOP = new ComponentLineWidthFull(
			this.SHAPE_MANAGER,
			LINE_HEIGHT,
			1,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			DrawType.Clear,
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
			GRID_WIDTH_IN_CELLS,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			DrawType.Clear,
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
			GRID_WIDTH_IN_CELLS,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			DrawType.Clear,
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT_0001);

		// Add Component Special Chars
		const COMPONENT_SPECIAL_CHARS = new ComponentGlyphBox(
			this.SHAPE_MANAGER,
			this.#STRING_CHAR_TEST,
			0,
			LINE_HEIGHT * 5,
			100,
			50,
			GRID_WIDTH_IN_CELLS,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			DrawType.Clear,
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
			1,
			FillType.PassThrough,
			FillStrategyType.Reverse,
			DrawType.Clear,
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT_RECTANGLE_A);

		// Create Component Rectangle B
		const COMPONENT_RECTANGLE_B = new ComponentRectangle(
			this.SHAPE_MANAGER,
			RECTANGLE_WIDTH + 2,
			RECTANGLE_GRID_Y,
			RECTANGLE_WIDTH,
			RECTANGLE_HEIGHT,
			11,
			FillType.PassThrough,
			FillStrategyType.Random,
			DrawType.Clear,
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT_RECTANGLE_B);

		// Create Component Rectangle C
		const COMPONENT_RECTANGLE_C = new ComponentRectangle(
			this.SHAPE_MANAGER,
			RECTANGLE_WIDTH * 2 + 4,
			RECTANGLE_GRID_Y,
			RECTANGLE_WIDTH,
			RECTANGLE_HEIGHT,
			21,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			DrawType.Clear,
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT_RECTANGLE_C);

		// Dummy Text with Line Height
		const BLOCK_GRID_TOP = 10;
		const BLOCK_GRID_BOTTOM = LINE_HEIGHT_MAX - 3;

		for (let i = BLOCK_GRID_TOP; i < BLOCK_GRID_BOTTOM; i += 3) {
			// Create Component
			const Y = LINE_HEIGHT * i;

			const COMPONENT = new ComponentGlyphBoxWidthFull(
				this.SHAPE_MANAGER,
				'I',
				0,
				Y,
				100,
				50,
				DirectableDotMatrixDelays.getDelayFromGridPosition(0, Y),
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				DrawType.Clear,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT);
		}

		for (let i = BLOCK_GRID_TOP + 1; i < BLOCK_GRID_BOTTOM; i += 3) {
			// Create Component
			const Y = LINE_HEIGHT * i;

			const COMPONENT = new ComponentGlyphBoxWidthFull(
				this.SHAPE_MANAGER,
				'0',
				0,
				Y,
				100,
				50,
				DirectableDotMatrixDelays.getDelayFromGridPosition(0, Y),
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				DrawType.Clear,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT);
		}

		for (let i = BLOCK_GRID_TOP + 2; i < BLOCK_GRID_BOTTOM; i += 3) {
			// Create Component
			const Y = LINE_HEIGHT * i;

			const COMPONENT = new ComponentGlyphBoxWidthFull(
				this.SHAPE_MANAGER,
				'X',
				0,
				Y,
				100,
				50,
				DirectableDotMatrixDelays.getDelayFromGridPosition(0, Y),
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				DrawType.Clear,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT);
		}

		// Create Component Line Bottom
		const LINE_BOTTOM = new ComponentLineWidthFull(
			this.SHAPE_MANAGER,
			LINE_HEIGHT * (LINE_HEIGHT_MAX - 2),
			1,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			DrawType.Clear,
		);

		this.COMPONENT_MANAGER.addComponent(LINE_BOTTOM);
	}

	// ____________________________________________________________________ Tick

	tick() {
		// Not calling super.tick

		// Active ?
		if (this.isActive === false) {
			return;
		}

		const RANDOM_DRAW = Math.random();

		if (RANDOM_DRAW < 0.02) {
			// Draw
			this.draw();
		}

		if (RANDOM_DRAW > 0.99) {
			// Undraw
			this.undraw();
		}
	}
}
