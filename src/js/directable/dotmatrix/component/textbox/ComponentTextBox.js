import GridData from '../../grid/GridData.js';

import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import Component from '../Component.js';

export default class ComponentLineWidthFull extends Component {
	#SHAPE_LINE_HORIZONTAL_TOP;

	// _________________________________________________________________________

	constructor(
		shapeManager,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		super(shapeManager);
	}

	// __________________________________________________________________ Redraw

	redraw() {
		// Simple Redraw of Existing Shape
		// this.#SHAPE_LINE_HORIZONTAL_TOP.redraw();
	}
}
