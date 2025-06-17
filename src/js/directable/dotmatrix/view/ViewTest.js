import ApplicationLogger from '../../../application/ApplicationLogger.js';

import FillType from '../shape/fill/FillType.js';
import FillStrategyType from '../shape/fill/FillStrategyType.js';

export default class ViewTest {
	#COMPONENT_MANAGER;

	#LOG_LEVEL = 5;

	// _________________________________________________________________________

	constructor(componentManager) {
		ApplicationLogger.log('ViewTest', this.#LOG_LEVEL);

		// Store
		this.#COMPONENT_MANAGER = componentManager;

		// Create Components
		this.#COMPONENT_MANAGER.addComponentLineWidthFull(1);

		this.#COMPONENT_MANAGER.addComponentLineWidthFull(
			6,
			FillType.Random,
			FillStrategyType.Random,
		);

		this.#COMPONENT_MANAGER.addComponentLineWidthFull(
			11,
			FillType.PassThrough,
			FillStrategyType.Reverse,
		);

		this.#COMPONENT_MANAGER.addComponentTextBox(
			'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
			20,
			20,
			100,
			50,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);
	}

	// ____________________________________________________________________ tick

	tick() {
		// Component Manager
		this.#COMPONENT_MANAGER.tick();
	}
}
