import GridData from '../../../../grid/GridData.js';

import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import Component from '../Component.js';

export default class ComponentLineWidthFull extends Component {
	#SHAPE_LINE_WIDTH_FULL;

	// _________________________________________________________________________

	constructor(
		shapeManager,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		super(shapeManager, 1, gridY, fillType, fillStrategyType);

		// Create Shape
		this.#createShape();
	}

	// ____________________________________________________________ Create Shape

	#createShape() {
		// Create Shape
		const GRID_MAX = GridData.getGridMax();
		const LINE_WIDTH = GRID_MAX[0] - 1;

		this.#SHAPE_LINE_WIDTH_FULL = this.SHAPE_MANAGER.addShapeLineHorizontal(
			this.GRID_X,
			this.GRID_Y,
			LINE_WIDTH,
			this.FILL_TYPE,
			this.FILL_STRATEGY_TYPE,
		);
	}

	// __________________________________________________________________ Redraw

	redraw() {
		// Remove Existing Shape
		if (this.#SHAPE_LINE_WIDTH_FULL) {
			this.SHAPE_MANAGER.removeShape(this.#SHAPE_LINE_WIDTH_FULL);
		}

		// Create Shape
		this.#createShape();
	}
}
