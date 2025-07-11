import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import Component from '../Component.js';

export default class ComponentRectangle extends Component {
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
		delay,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		super(shapeManager, gridX, gridY, delay, fillType, fillStrategyType);

		// Store
		this.GRID_WIDTH = gridWidth;
		this.GRID_HEIGHT = gridHeight;

		// Create Shape
		this.#createShape();
	}

	// ____________________________________________________________ Create Shape

	#createShape() {
		// Create Shape
		const SHAPE = this.SHAPE_MANAGER.addShapeRectangle(
			this.GRID_X,
			this.GRID_Y,
			this.GRID_WIDTH,
			this.GRID_HEIGHT,
			this.DELAY,
			this.FILL_TYPE,
			this.FILL_STRATEGY_TYPE,
		);

		// Store
		this.SHAPES.push(SHAPE);
	}
}
