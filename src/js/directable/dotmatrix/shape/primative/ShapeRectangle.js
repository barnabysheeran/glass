import ApplicationLogger from '../../../../application/ApplicationLogger.js';

import Shape from '../Shape.js';

import FillType from '../fill/FillType.js';
import FillStrategyType from '../fill/FillStrategyType.js';

import Fill from '../fill/Fill.js';
import FillStrategy from '../fill/FillStrategy.js';

export default class ShapeRectangle extends Shape {
	#LOG_LEVEL = -1; // 6;

	// _________________________________________________________________________

	constructor(
		dotManager,
		gridX,
		gridY,
		gridWidth,
		gridHeight,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		super(dotManager);

		ApplicationLogger.log(`ShapeRectangle`, this.#LOG_LEVEL);

		// Store Initial Position Grids
		for (let w = 0; w < gridWidth; w++) {
			for (let h = 0; h < gridHeight; h++) {
				this.positionGrids.push([gridX + w, gridY + h]);
			}
		}

		// Fill Type
		Fill.apply(fillType, this.positionGrids, gridWidth, gridHeight);

		// Fill Strategy Type
		FillStrategy.apply(fillStrategyType, this.positionGrids);
	}
}
