import FillType from '../enum/FillType.js';
import FillStrategyType from '../enum/FillStrategyType.js';
import DrawType from '../enum/DrawType.js';

import ComponentRectangle from '../component/primative/ComponentRectangle.js';

// TODO Move

export function viewAddRectanglesBlock(
	shapeManager,
	componentManager,
	gridX,
	gridY,
	gridWidth,
	gridHeight,
	delayFrames,
	fillType = FillType.PassThrough,
	fillStrategyType = FillStrategyType.PassThrough,
	drawType = DrawType.Fill,
) {
	console.log('viewAddRectanglesBlockEasedOut called');

	const BLOCK_WIDTH = 1;

	// Create Component Rectangles
	for (let w = 0; w < gridWidth; w += BLOCK_WIDTH) {
		// Create Component Rectangle
		const COMPONENT_RECTANGLE = new ComponentRectangle(
			shapeManager,
			gridX + w,
			gridY,
			BLOCK_WIDTH,
			gridHeight,
			delayFrames,
			fillType,
			fillStrategyType,
			drawType,
		);

		componentManager.addComponent(COMPONENT_RECTANGLE);
	}
}
