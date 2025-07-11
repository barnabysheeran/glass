// import ApplicationLogger from '../../../application/ApplicationLogger.js';

export default class Component {
	SHAPE_MANAGER;
	SHAPES = [];

	GRID_X = 0;
	GRID_Y = 0;

	FILL_TYPE;
	FILL_STRATEGY_TYPE;

	DELAY = 0;

	// #LOG_LEVEL = 4;

	// _________________________________________________________________________

	constructor(shapeManager, gridX, gridY, delay, fillType, fillStrategyType) {
		// Store
		this.SHAPE_MANAGER = shapeManager;
		this.GRID_X = gridX;
		this.GRID_Y = gridY;
		this.DELAY = delay;
		this.FILL_TYPE = fillType;
		this.FILL_STRATEGY_TYPE = fillStrategyType;

		// ApplicationLogger.log(
		// 	`Component gridX ${gridX} gridY ${gridY}` +
		// 		` delay ${delay}` +
		// 		` fillType ${fillType} fillStrategyType ${this.FILL_STRATEGY_TYPE}`,
		// 	this.#LOG_LEVEL,
		// );
	}

	// ____________________________________________________________________ Tick

	tick() {
		let isComplete = true;

		// Tick Shapes
		for (let i = 0; i < this.SHAPES.length; i += 1) {
			const IS_SHAPE_COMPLETE = this.SHAPES[i].tick();

			if (IS_SHAPE_COMPLETE === false) {
				isComplete = false;
			}
		}

		return isComplete;
	}

	// _________________________________________________________________ Destroy

	destroy() {
		// Clear Shapes
		this.SHAPES = [];
	}
}
