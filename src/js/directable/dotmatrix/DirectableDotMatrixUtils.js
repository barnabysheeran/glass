import FillType from './enum/FillType.js';
import FillStrategyType from './enum/FillStrategyType.js';
import DrawType from './enum/DrawType.js';

import ComponentRectangle from './component/primative/ComponentRectangle.js';

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
	const BLOCK_WIDTH = 3;

	// Create Component Rectangles
	let i = 0;

	for (let w = 0; w < gridWidth; w += BLOCK_WIDTH) {
		// Calculate Width to ensure it doesn't exceed gridWidth
		const actualWidth = Math.min(BLOCK_WIDTH, gridWidth - w);

		// Skip if width is 0 or negative
		if (actualWidth <= 0) break;

		// Create Component Rectangle
		const COMPONENT_RECTANGLE = new ComponentRectangle(
			shapeManager,
			gridX + w,
			gridY,
			actualWidth,
			gridHeight,
			delayFrames + i,
			fillType,
			fillStrategyType,
			drawType,
		);

		componentManager.addComponent(COMPONENT_RECTANGLE);

		// Increment
		i++;
	}
}
