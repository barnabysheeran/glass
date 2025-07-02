import ApplicationLogger from '../../../application/ApplicationLogger.js';

import GridData from '../../../grid/GridData.js';

import FillType from '../shape/fill/FillType.js';
import FillStrategyType from '../shape/fill/FillStrategyType.js';

import ComponentLineWidthFull from '../component/line/ComponentLineWidthFull.js';
import ComponentGlyphBox from '../component/glyph/ComponentGlyphBox.js';
import ComponentGlyphBoxWidthFull from '../component/glyph/ComponentGlyphBoxWidthFull.js';

export default class ViewTest {
	#SHAPE_MANAGER;

	#LINE_HEIGHT = 6;

	#COMPONENTS = [];

	#LOG_LEVEL = 4;

	// _________________________________________________________________________

	constructor(shapeManager) {
		ApplicationLogger.log('ViewTest', this.#LOG_LEVEL);

		// Store
		this.#SHAPE_MANAGER = shapeManager;

		// Initial Draw
		this.start();
	}

	// ____________________________________________________________________ Draw

	start() {
		// Get Grid Size
		const GRID_MAX = GridData.getGridMax();
		// const GRID_MAX_WIDTH = GRID_MAX[0];
		const GRID_MAX_HEIGHT = GRID_MAX[1];

		const LINE_HEIGHT_MAX = Math.floor(GRID_MAX_HEIGHT / this.#LINE_HEIGHT);

		// Create Component Line Top
		const LINE_TOP = new ComponentLineWidthFull(
			this.#SHAPE_MANAGER,
			this.#LINE_HEIGHT,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			1,
		);

		this.#COMPONENTS.push(LINE_TOP);

		// Create Component ABC
		const COMPONENT_ABC = new ComponentGlyphBox(
			this.#SHAPE_MANAGER,
			'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			0,
			this.#LINE_HEIGHT * 3,
			100,
			50,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			150,
		);

		this.#COMPONENTS.push(COMPONENT_ABC);

		// Add Component 0001
		const COMPONENT_0001 = new ComponentGlyphBox(
			this.#SHAPE_MANAGER,
			'0123456789',
			0,
			this.#LINE_HEIGHT * 4,
			100,
			50,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			150,
		);

		this.#COMPONENTS.push(COMPONENT_0001);

		// Add Dummy Text with Line Height
		const BLOCK_GRID_TOP = 10;
		const BLOCK_GRID_BOTTOM = LINE_HEIGHT_MAX - 8;

		for (let i = BLOCK_GRID_TOP; i < BLOCK_GRID_BOTTOM; i += 2) {
			// Create Component
			const COMPONENT = new ComponentGlyphBoxWidthFull(
				this.#SHAPE_MANAGER,
				'X',
				0,
				this.#LINE_HEIGHT * i,
				100,
				50,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				30 * i,
			);

			// Store
			this.#COMPONENTS.push(COMPONENT);
		}

		for (let i = BLOCK_GRID_TOP + 1; i < BLOCK_GRID_BOTTOM; i += 2) {
			// Create Component
			const COMPONENT = new ComponentGlyphBoxWidthFull(
				this.#SHAPE_MANAGER,
				'I',
				0,
				this.#LINE_HEIGHT * i,
				100,
				50,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				30 * i,
			);

			// Store
			this.#COMPONENTS.push(COMPONENT);
		}

		// Create Component Line Bottom
		const LINE_BOTTOM = new ComponentLineWidthFull(
			this.#SHAPE_MANAGER,
			this.#LINE_HEIGHT * (LINE_HEIGHT_MAX - 7),
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			120,
		);

		this.#COMPONENTS.push(LINE_BOTTOM);

		// TODO Add Rectangle
	}

	// ____________________________________________________________________ tick

	tick() {
		// Tick Components
		for (let i = 0; i < this.#COMPONENTS.length; i += 1) {
			this.#COMPONENTS[i].tick();
		}
	}

	reset() {}
}
