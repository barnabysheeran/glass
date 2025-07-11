import GridData from '../../../../grid/GridData.js';

import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import Component from '../Component.js';

export default class ComponentLineWidthFull extends Component {
	// _________________________________________________________________________

	constructor(
		shapeManager,
		gridY,
		delay,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		super(shapeManager, 0, gridY, delay, fillType, fillStrategyType);

		// Create Shape
		this.#createShape();
	}

	// ____________________________________________________________ Create Shape

	#createShape() {
		// Get Grid Data
		const GRID_WIDTH_IN_CELLS = GridData.getGridWidthInCells();

		// Create Shape
		const SHAPE = this.SHAPE_MANAGER.addShapeLineHorizontal(
			this.GRID_X,
			this.GRID_Y,
			GRID_WIDTH_IN_CELLS,
			this.DELAY,
			this.FILL_TYPE,
			this.FILL_STRATEGY_TYPE,
		);

		// Store
		this.SHAPES.push(SHAPE);
	}
}
