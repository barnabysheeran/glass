import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import Component from '../Component.js';

export default class ComponentGlyphButton extends Component {
	// Unique Parameters
	TEXT;

	// _________________________________________________________________________

	constructor(
		shapeManager,
		text,
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
		delay = 0,
	) {
		super(shapeManager, gridX, gridY, fillType, fillStrategyType, delay);

		// Store
		this.TEXT = text;
	}
}
