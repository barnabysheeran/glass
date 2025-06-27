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

		this.#COMPONENT_MANAGER.addComponentTextBox(
			'ABCD EF  GHIJKLMNOPQRSTUVWXYZ0123456789',
			1,
			5,
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
