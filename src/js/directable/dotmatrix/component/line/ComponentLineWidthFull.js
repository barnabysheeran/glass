import GridData from '../../../../grid/GridData.js';

import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import Component from '../Component.js';

export default class ComponentLineWidthFull extends Component {
	#SHAPE;

	// _________________________________________________________________________

	constructor(
		shapeManager,
		gridY,
		delay,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		super(shapeManager, 0, gridY, delay, fillType, fillStrategyType);

		console.log(
			`ComponentLineWidthFull gridY ${gridY} delay ${delay} fillType ${fillType} fillStrategyType ${fillStrategyType}`,
		);

		// Create Shape
		this.#createShape();
	}

	// ____________________________________________________________ Create Shape

	#createShape() {
		// Create Shape
		const GRID_MAX = GridData.getGridMax();
		const LINE_WIDTH = GRID_MAX[0];

		this.#SHAPE = this.SHAPE_MANAGER.addShapeLineHorizontal(
			this.GRID_X,
			this.GRID_Y,
			LINE_WIDTH,
			this.DELAY,
			this.FILL_TYPE,
			this.FILL_STRATEGY_TYPE,
		);
	}

	// ____________________________________________________________________ Tick

	tick() {
		this.#SHAPE.tick();
	}

	// _________________________________________________________________ Destroy

	destroy() {
		this.#SHAPE = null;
	}
}
