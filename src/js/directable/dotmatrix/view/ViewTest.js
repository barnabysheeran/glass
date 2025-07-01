import ApplicationLogger from '../../../application/ApplicationLogger.js';

import FillType from '../shape/fill/FillType.js';
import FillStrategyType from '../shape/fill/FillStrategyType.js';

export default class ViewTest {
	#COMPONENT_MANAGER;

	#LINE_HEIGHT = 6;

	#LOG_LEVEL = 4;

	// _________________________________________________________________________

	constructor(componentManager) {
		ApplicationLogger.log('ViewTest', this.#LOG_LEVEL);

		// Store
		this.#COMPONENT_MANAGER = componentManager;

		// Create Components
		this.#COMPONENT_MANAGER.addComponentLineWidthFull(
			1,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			120,
		);

		this.#COMPONENT_MANAGER.addComponentTextBox(
			'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			0,
			this.#LINE_HEIGHT,
			100,
			50,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			150,
		);

		this.#COMPONENT_MANAGER.addComponentTextBox(
			'0123456789',
			0,
			this.#LINE_HEIGHT * 2,
			100,
			50,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			200,
		);

		for (let i = 0; i < 40; i++) {
			this.#COMPONENT_MANAGER.addComponentTextBox(
				'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
				0,
				this.#LINE_HEIGHT * (i + 6),
				100,
				50,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				200 + 30 * i,
			);
		}
	}

	// ____________________________________________________________________ tick

	tick() {
		// Component Manager
		// this.#COMPONENT_MANAGER.tick();
		// console.log('ViewTest tick');
		//
		const R_1 = Math.random();

		if (R_1 < 0.01) {
			const GRID_Y = Math.floor(Math.random() * 50) * this.#LINE_HEIGHT;
			this.#COMPONENT_MANAGER.addComponentTextBox(
				'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
				0,
				GRID_Y,
				100,
				50,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				0,
			);
		}

		const R_2 = Math.random();

		if (R_2 < 0.01) {
			const GRID_Y = Math.floor(Math.random() * 50) * this.#LINE_HEIGHT;
			this.#COMPONENT_MANAGER.addComponentTextBox(
				'IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII',
				0,
				GRID_Y,
				100,
				50,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				0,
			);
		}

		const R_3 = Math.random();

		if (R_3 < 0.01) {
			const GRID_Y = Math.floor(Math.random() * 50) * this.#LINE_HEIGHT;
			this.#COMPONENT_MANAGER.addComponentTextBox(
				'01010101010101010101010101010101010101010101010101010101010101010101010101010101',
				0,
				GRID_Y,
				100,
				50,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				0,
			);
		}
	}
}
