import ApplicationLogger from '../../../application/ApplicationLogger.js';

import FillType from '../shape/fill/FillType.js';
import FillStrategyType from '../shape/fill/FillStrategyType.js';

export default class ViewTest {
	#COMPONENT_MANAGER;

	#LOG_LEVEL = 4;

	// _________________________________________________________________________

	constructor(componentManager) {
		ApplicationLogger.log('ViewTest', this.#LOG_LEVEL);

		// Store
		this.#COMPONENT_MANAGER = componentManager;

		// Create Components
		this.#COMPONENT_MANAGER.addComponentLineWidthFull(1);

		this.#COMPONENT_MANAGER.addComponentTextBox(
			'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			10,
			16,
			100,
			50,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#COMPONENT_MANAGER.addComponentTextBox(
			'0123456789',
			10,
			22,
			100,
			50,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#COMPONENT_MANAGER.addComponentLineWidthFull(40);

		for (let i = 0; i < 7; i++) {
			this.#COMPONENT_MANAGER.addComponentTextBox(
				'XIXIXIXIXIXIXXIXIXIXIXIXIXXIXIXIXIXIXIX',
				10,
				48 + i * 6,
				100,
				50,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
			);
		}
	}

	// ____________________________________________________________________ tick

	tick() {
		// Component Manager
		this.#COMPONENT_MANAGER.tick();
	}
}
