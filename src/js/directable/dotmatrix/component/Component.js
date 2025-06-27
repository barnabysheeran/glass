export default class Component {
	SHAPE_MANAGER;

	GRID_X = 0;
	GRID_Y = 0;

	FILL_TYPE;
	FILL_STRATEGY_TYPE;

	// _________________________________________________________________________

	constructor(shapeManager, gridX, gridY, fillType, fillStrategyType) {
		// Store
		this.SHAPE_MANAGER = shapeManager;
		this.GRID_X = gridX;
		this.GRID_Y = gridY;
		this.FILL_TYPE = fillType;
		this.FILL_STRATEGY_TYPE = fillStrategyType;
	}

	// ____________________________________________________________________ Tick

	// tick(frameDeltaMS) {}

	// __________________________________________________________________ Redraw

	redraw() {
		// Stub Method
	}
}
