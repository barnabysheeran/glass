import Shape from '../Shape.js';

import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import Fill from '../../shape/fill/Fill.js';
import FillStrategy from '../../shape/fill/FillStrategy.js';

export default class ShapeLineHorizontal extends Shape {
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

		// Store Initial Position Grids
		// for (let i = 0; i < gridLength; i++) {
		// 	this.positionGrids.Add(new Vector2Int(gridX + i, gridY));
		// }

		for (let i = 0; i < gridLength; i += 1) {
			this.positionGrids.push([gridX + i, gridY]);
		}

		// Fill Type
		Fill.apply(fillType, this.positionGrids, gridLength, 1);

		// Fill Strategy Type
		FillStrategy.apply(fillStrategyType, this.positionGrids);
	}
}
