import ApplicationLogger from '../../../application/ApplicationLogger.js';

import GridData from '../../../grid/GridData.js';

import DotMatrixView from './DotMatrixView.js';

import FillType from '../shape/fill/FillType.js';
import FillStrategyType from '../shape/fill/FillStrategyType.js';

export default class ViewTest extends DotMatrixView {
	#LINE_HEIGHT = 6;

	#LOG_LEVEL = 4;

	// _________________________________________________________________________

	constructor(componentManager) {
		super(componentManager);

		ApplicationLogger.log('ViewTest', this.#LOG_LEVEL);

		// Initial Draw
		this.start();
	}

	// ____________________________________________________________________ Draw

	start() {
		// Not calling Super

		// Get Grid Size
		const GRID_MAX = GridData.getGridMax();
		const GRID_MAX_WIDTH = GRID_MAX[0];
		const GRID_MAX_HEIGHT = GRID_MAX[1];

		const LINE_HEIGHT_MAX = Math.floor(GRID_MAX_HEIGHT / this.#LINE_HEIGHT);

		// Create Components Line Top
		this.COMPONENT_MANAGER.addComponentLineWidthFull(
			this.#LINE_HEIGHT,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			1,
		);

		// Line Bottom
		this.COMPONENT_MANAGER.addComponentLineWidthFull(
			this.#LINE_HEIGHT * LINE_HEIGHT_MAX,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			1,
		);

		// Add Dummy Text
		this.COMPONENT_MANAGER.addComponentTextBox(
			'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			0,
			this.#LINE_HEIGHT * 2,
			100,
			50,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			150,
		);

		this.COMPONENT_MANAGER.addComponentTextBox(
			'0123456789',
			0,
			this.#LINE_HEIGHT * 3,
			100,
			50,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			200,
		);

		// Add Dummy Text with Line Height
		const BLOCK_GRID_TOP = 10;
		const BLOCK_GRID_BOTTOM = LINE_HEIGHT_MAX - 10;

		for (let i = BLOCK_GRID_TOP; i < BLOCK_GRID_BOTTOM; i++) {
			this.COMPONENT_MANAGER.addComponentTextBox(
				'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
				0,
				this.#LINE_HEIGHT * i,
				100,
				50,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				30 * i,
			);
		}

		// Add Rectangle
	}

	// ____________________________________________________________________ tick

	tick() {}
}
