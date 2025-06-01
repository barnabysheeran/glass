import ApplicationLogger from '../../../application/ApplicationLogger.js';

import GridData from '../grid/GridData.js';

import FillType from '../shape/fill/FillType.js';
import FillStrategyType from '../shape/fill/FillStrategyType.js';

export default class ViewTest {
	#SHAPE_MANAGER;

	#LOG_LEVEL = 5;

	// _________________________________________________________________________

	constructor(shapeManager) {
		ApplicationLogger.log('ViewTest', this.#LOG_LEVEL);

		// Store
		this.#SHAPE_MANAGER = shapeManager;

		// ---

		const gridMax = GridData.getGridMax();
		const gridMaxHalf = GridData.getGridMaxHalf();

		ApplicationLogger.log(
			'ViewTest: gridMax ' + gridMax[0] + ' ' + gridMax[1],
			this.#LOG_LEVEL,
		);

		ApplicationLogger.log(
			'ViewTest: gridMaxHalf ' + gridMaxHalf[0] + ' ' + gridMaxHalf[1],
			this.#LOG_LEVEL,
		);

		// Horizontal

		this.#SHAPE_MANAGER.addShapeLineHorizontal(
			3,
			1,
			10,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		// Vertical

		this.#SHAPE_MANAGER.addShapeLineVertical(
			1,
			3,
			10,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		// Rectangle

		this.#SHAPE_MANAGER.addShapeRectangle(
			10,
			10,
			10,
			10,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.#SHAPE_MANAGER.addShapeRectangle(
			21,
			10,
			10,
			10,
			FillType.PassThrough,
			FillStrategyType.Random,
		);

		this.#SHAPE_MANAGER.addShapeRectangle(
			32,
			10,
			10,
			10,
			FillType.PassThrough,
			FillStrategyType.Reverse,
		);

		this.#SHAPE_MANAGER.addShapeRectangle(
			43,
			10,
			10,
			10,
			FillType.Random,
			FillStrategyType.Reverse,
		);

		this.#SHAPE_MANAGER.addShapeRectangle(
			43,
			10,
			10,
			10,
			FillType.Random,
			FillStrategyType.Reverse,
		);

		// --------------

		// TODO integers required ?
		// let blockWidth = gridMaxHalf[0];
		// let blockHeight = gridMaxHalf[1];
		// let lineWidth = gridMaxHalf[0] - 2;

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
		// Shape Manager
		this.#SHAPE_MANAGER.tick();

		//
		let r = Math.random();

		if (r < 0.01) {
			ApplicationLogger.log('ViewTest tick Random Line', this.#LOG_LEVEL);

			// Random Line
			const randomRow = Math.floor(Math.random() * 100);

			this.#SHAPE_MANAGER.addShapeLineHorizontal(
				1,
				randomRow,
				100,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
			);
		}
	}
}
