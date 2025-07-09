export default class Component {
	SHAPE_MANAGER;
	SHAPES = [];

	GRID_X = 0;
	GRID_Y = 0;

	FILL_TYPE;
	FILL_STRATEGY_TYPE;

	DELAY = 0;

	// _________________________________________________________________________

	constructor(shapeManager, gridX, gridY, fillType, fillStrategyType, delay) {
		// Store
		this.SHAPE_MANAGER = shapeManager;
		this.GRID_X = gridX;
		this.GRID_Y = gridY;
		this.FILL_TYPE = fillType;
		this.FILL_STRATEGY_TYPE = fillStrategyType;
		this.DELAY = delay;
	}

	// ____________________________________________________________________ Tick

	tick() {
		console.log(`Component tick - ${this.constructor.name} started`);

		let isComplete = true;

		// Tick Shapes
		for (let i = 0; i < this.SHAPES.length; i += 1) {
			const IS_SHAPE_COMPLETE = this.SHAPES[i].tick();

			console.log(' - Component tick - Shape complete:', IS_SHAPE_COMPLETE);

			if (IS_SHAPE_COMPLETE === false) {
				isComplete = false;
			}
		}

		console.log(
			`Component tick - ${this.constructor.name} complete: ${isComplete}`,
		);

		return isComplete; // Stub, should return true if complete
	}

	destroy() {
		// Clear Shapes
		this.SHAPES = [];
	}
}
