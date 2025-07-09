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
		// Tick Shapes
		for (let i = 0; i < this.SHAPES.length; i += 1) {
			this.SHAPES[i].tick();
		}

		return false; // Stub, should return true if complete
	} // Stub

	destroy() {
		// Clear Shapes
		this.SHAPES = [];
	} // Stub
}
