import Shape from '../Shape.js';

import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

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

		// // Fill Type
		// Fill.Apply(fillType, this.positionGrids, gridLength, 1);

		// // Fill Strategy Type
		// FillStrategy.Apply(fillStrategyType, this.positionGrids);
	}
}
