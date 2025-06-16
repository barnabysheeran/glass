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

		// Horizontal

		// this.#SHAPE_MANAGER.addShapeLineHorizontal(
		// 	3,
		// 	1,
		// 	10,
		// 	FillType.PassThrough,
		// 	FillStrategyType.PassThrough,
		// );

		// Vertical

		// this.#SHAPE_MANAGER.addShapeLineVertical(
		// 	1,
		// 	3,
		// 	10,
		// 	FillType.PassThrough,
		// 	FillStrategyType.PassThrough,
		// );

		// Rectangle

		// this.#SHAPE_MANAGER.addShapeRectangle(
		// 	10,
		// 	10,
		// 	10,
		// 	10,
		// 	FillType.PassThrough,
		// 	FillStrategyType.PassThrough,
		// );

		// this.#SHAPE_MANAGER.addShapeRectangle(
		// 	21,
		// 	10,
		// 	10,
		// 	10,
		// 	FillType.PassThrough,
		// 	FillStrategyType.Random,
		// );

		// this.#SHAPE_MANAGER.addShapeRectangle(
		// 	32,
		// 	10,
		// 	10,
		// 	10,
		// 	FillType.PassThrough,
		// 	FillStrategyType.Reverse,
		// );

		// this.#SHAPE_MANAGER.addShapeRectangle(
		// 	43,
		// 	10,
		// 	10,
		// 	10,
		// 	FillType.Random,
		// 	FillStrategyType.Reverse,
		// );

		// this.#SHAPE_MANAGER.addShapeRectangle(
		// 	43,
		// 	10,
		// 	10,
		// 	10,
		// 	FillType.Random,
		// 	FillStrategyType.Reverse,
		// );

		// --------------

		const GRID_MAX = GridData.getGridMax();
		const GRID_MAX_HALF = GridData.getGridMaxHalf();

		const LINE_WIDTH = GRID_MAX[0] - 2;

		console.log('GRID_MAX', GRID_MAX[0], GRID_MAX[1]);
		console.log('GRID_MAX_HALF', GRID_MAX_HALF[0], GRID_MAX_HALF[1]);
		console.log('LINE_WIDTH', LINE_WIDTH);

		this.#SHAPE_MANAGER.addShapeLineHorizontal(
			1,
			1,
			LINE_WIDTH,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);
	}

	// ____________________________________________________________________ tick

	tick() {
		// Shape Manager
		this.#SHAPE_MANAGER.tick();
	}
}
