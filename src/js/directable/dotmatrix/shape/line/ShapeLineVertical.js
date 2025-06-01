import ApplicationLogger from '../../../../application/ApplicationLogger.js';

import Shape from '../Shape.js';

import FillType from '../fill/FillType.js';
import FillStrategyType from '../fill/FillStrategyType.js';

import Fill from '../fill/Fill.js';
import FillStrategy from '../fill/FillStrategy.js';

export default class ShapeLineVertical extends Shape {
	#LOG_LEVEL = -1; // 6;

	// _____________________________________________________________________

	constructor(
		dotManager,
		gridX,
		gridY,
		gridLength,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		super(dotManager);

		ApplicationLogger.log(`ShapeLineVertical`, this.#LOG_LEVEL);

		// Store Initial Position Grids
		for (let i = 0; i < gridLength; i += 1) {
			this.positionGrids.push([gridX, gridY + i]);
		}

		// Fill Type
		Fill.apply(fillType, this.positionGrids);

		// Fill Strategy Type
		FillStrategy.apply(fillStrategyType, this.positionGrids);
	}
}
