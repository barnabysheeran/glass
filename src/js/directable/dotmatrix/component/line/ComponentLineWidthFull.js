import GridData from '../../grid/GridData.js';

import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import Component from '../Component.js';

export default class ComponentLineWidthFull extends Component {
	#SHAPE_LINE_HORIZONTAL_TOP;

	// _________________________________________________________________________

	constructor(shapeManager, gridY) {
		super(shapeManager);

		const GRID_MAX = GridData.getGridMax();
		const LINE_WIDTH = GRID_MAX[0] - 2;

		this.#SHAPE_LINE_HORIZONTAL_TOP = this.SHAPE_MANAGER.addShapeLineHorizontal(
			1,
			gridY,
			LINE_WIDTH,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		// TODO Resize
	}
}
