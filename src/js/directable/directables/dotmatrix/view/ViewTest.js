import ApplicationLogger from '../../../../application/ApplicationLogger.js';

import View from './View.js';

export default class ViewTest extends View {
	#LOG_LEVEL = 5;

	// _________________________________________________________________________

	constructor(shapeManager) {
		super(shapeManager);

		ApplicationLogger.log('ViewTest', this.#LOG_LEVEL);

		// Vector2Int gridMax = GridData.GetGridMax();
		// Vector2Int gridMaxHalf = GridData.GetGridMaxHalf();

		// Debug.Log("ViewTest: gridMax: " + gridMax);

		// int blockWidth = gridMaxHalf.x;
		// int blockHeight = gridMaxHalf.y;

		// int lineWidth = gridMaxHalf.x - 2;

		//
		// #shapeManager.AddShapeLineHorizontal(1, 1, gridMax.x - 2, FillType.PassThrough, FillStrategyType.PassThrough);

		// Top Left
		// #shapeManager.AddShapeLineHorizontal(1, 1, lineWidth, FillType.PassThrough, FillStrategyType.PassThrough);
		// #shapeManager.AddShapeLineHorizontal(1, gridMaxHalf.y - 1, lineWidth, FillType.PassThrough, FillStrategyType.PassThrough);

		// Top Right
		// #shapeManager.AddShapeLineHorizontal(gridMaxHalf.x + 1, 1, lineWidth, FillType.PassThrough, FillStrategyType.PassThrough);
		// #shapeManager.AddShapeLineHorizontal(gridMaxHalf.x + 1, gridMaxHalf.y - 1, lineWidth, FillType.PassThrough, FillStrategyType.PassThrough);

		// Bottom Left
		// #shapeManager.AddShapeLineHorizontal(1, gridMaxHalf.y + 2, lineWidth, FillType.PassThrough, FillStrategyType.PassThrough);
		// #shapeManager.AddShapeLineHorizontal(1, gridMax.y - 1, lineWidth, FillType.PassThrough, FillStrategyType.PassThrough);

		// Bottom Right
		// #shapeManager.AddShapeLineHorizontal(gridMaxHalf.x + 1, gridMaxHalf.y + 2, lineWidth, FillType.PassThrough, FillStrategyType.PassThrough);
		// #shapeManager.AddShapeLineHorizontal(gridMaxHalf.x + 1, gridMax.y - 1, lineWidth, FillType.PassThrough, FillStrategyType.PassThrough);
	}

	// ____________________________________________________________________ tick

	tick() {
		super.update();

		// base.Update();
		// Vector2Int gridMax = GridData.GetGridMax();
		// int randomChance = Random.Range(0, 500);
		// int randomRow = Random.Range(1, gridMax.y - 1);
		// if (randomChance < 1)
		// {
		//     #shapeManager.AddShapeLineHorizontal(1, randomRow, gridMax.x - 2, FillType.PassThrough, FillStrategyType.PassThrough);
		// }
	}
}
