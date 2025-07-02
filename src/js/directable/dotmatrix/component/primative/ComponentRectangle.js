import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import Component from '../Component.js';

export default class ComponentRectangle extends Component {
	#SHAPE;

	// Unique Parameters

	GRID_WIDTH;
	GRID_HEIGHT;

	// _________________________________________________________________________

	constructor(
		shapeManager,
		gridX,
		gridY,
		gridWidth,
		gridHeight,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
		delay,
	) {
		super(shapeManager, gridX, gridY, fillType, fillStrategyType, delay);

		// Store
		this.GRID_WIDTH = gridWidth;
		this.GRID_HEIGHT = gridHeight;

		// Create Shape
		this.#createShape();
	}

	// ____________________________________________________________ Create Shape

	#createShape() {
		// Create Shape
		this.#SHAPE = this.SHAPE_MANAGER.addShapeRectangle(
			this.GRID_X,
			this.GRID_Y,
			this.GRID_WIDTH,
			this.GRID_HEIGHT,
			this.FILL_TYPE,
			this.FILL_STRATEGY_TYPE,
			this.DELAY,
		);
	}

	// ____________________________________________________________________ Tick

	tick() {
		this.#SHAPE.tick();
	}
}
