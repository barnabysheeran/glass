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
		// this.#COMPONENT_MANAGER.addComponentLineWidthFull(1);

		this.#COMPONENT_MANAGER.addComponentTextBox(
			'A',
			10,
			10,
			100,
			50,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		// this.#COMPONENT_MANAGER.addComponentTextBox(
		// 	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
		// 	1,
		// 	15,
		// 	100,
		// 	50,
		// 	FillType.PassThrough,
		// 	FillStrategyType.PassThrough,
		// );

		// for (let i = 0; i < 10; i++) {
		// 	this.#COMPONENT_MANAGER.addComponentTextBox(
		// 		'XXXXXXXXXXXXXXXXXXXXX',
		// 		1,
		// 		24 + i * 7,
		// 		100,
		// 		50,
		// 		FillType.PassThrough,
		// 		FillStrategyType.PassThrough,
		// 	);
		// }
	}

	// ____________________________________________________________________ tick

	tick() {
		// Component Manager
		this.#COMPONENT_MANAGER.tick();
	}
}
