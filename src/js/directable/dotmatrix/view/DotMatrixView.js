import ApplicationLogger from '../../../application/ApplicationLogger.js';
import InteractiveSurface from '../../../interactive/InteractiveSurface.js';

import GridData from '../../../grid/GridData.js';

import DirectableDotMatrixConstants from '../DirectableDotMatrixConstants.js';

import ComponentRectangle from '../component/primative/ComponentRectangle.js';
import ComponentGlyphBox from '../component/glyph/ComponentGlyphBox.js';

import FillType from '../enum/FillType.js';
import FillStrategyType from '../enum/FillStrategyType.js';
import DrawType from '../enum/DrawType.js';

export default class View {
	SHAPE_MANAGER;
	COMPONENT_MANAGER;

	INTERACTIVE_BLOCK_IDS = [];

	#VIEW_ID;

	isActive = false;

	#LOG_LEVEL = -1; // 4;

	// _________________________________________________________________________

	constructor(shapeManager, componentManager, viewId) {
		ApplicationLogger.log(`View '${viewId}'`, this.#LOG_LEVEL);

		// Store
		this.SHAPE_MANAGER = shapeManager;
		this.COMPONENT_MANAGER = componentManager;
		this.#VIEW_ID = viewId;
	}

	// ___________________________________________________________________ Start

	start(delayFrames = 0) {
		ApplicationLogger.log(
			`View '${this.#VIEW_ID}' start delay ${delayFrames}`,
			this.#LOG_LEVEL,
		);

		// Active
		this.isActive = true;
	}

	// ____________________________________________________________________ Stop

	stop(delayFrames = 0) {
		ApplicationLogger.log(
			`View '${this.#VIEW_ID}' stop delay ${delayFrames}`,
			this.#LOG_LEVEL,
		);

		// Clear Interactive Blocks
		this.#clearInteractiveBlocks();

		// Inactive
		this.isActive = false;
	}

	// ____________________________________________________________________ Draw

	draw(delayFrames = 0, drawType = DrawType.Fill) {
		ApplicationLogger.log(
			`View '${this.#VIEW_ID}' draw delay ${delayFrames} drawType ${drawType}`,
			this.#LOG_LEVEL,
		);
	}

	onDrawComplete() {
		ApplicationLogger.log(
			`View '${this.#VIEW_ID}' onDrawComplete`,
			this.#LOG_LEVEL,
		);
	}

	// ____________________________________________________________________ Tick

	tick() {} // Stub

	// ___________________________________________________________________ Reset

	#clearInteractiveBlocks() {
		ApplicationLogger.log(
			`View '${this.#VIEW_ID}' clearInteractiveBlocks`,
			this.#LOG_LEVEL,
		);

		// Destroy Interactive Blocks
		for (let i = 0; i < this.INTERACTIVE_BLOCK_IDS.length; i += 1) {
			ApplicationLogger.log(
				` - Removing Block ${this.INTERACTIVE_BLOCK_IDS[i]}`,
				this.#LOG_LEVEL,
			);

			InteractiveSurface.removeBlock(this.INTERACTIVE_BLOCK_IDS[i]);
		}

		// Reset Interactive Block Ids
		this.INTERACTIVE_BLOCK_IDS = [];
	}

	// ____________________________________________________________ Project Text

	addProjectText(dataProject, gridX, gridY, delayGlyph, delayFrames, drawType) {
		// Get Heights
		const LINE_HEIGHT_IN_GRID_CELLS =
			DirectableDotMatrixConstants.getLineHeightInGridCells();

		// Get Is Mobile
		const IS_MOBILE = GridData.getIsMobile();

		// Add Component Name
		let textName;

		if (IS_MOBILE) {
			textName = dataProject['name-short'];
		} else {
			textName = dataProject['name'];
		}

		const COMPONENT_NAME = new ComponentGlyphBox(
			this.SHAPE_MANAGER,
			textName,
			gridX,
			gridY,
			100,
			50,
			delayFrames,
			delayGlyph,
			FillType.PassThrough,
			FillStrategyType.Random,
			drawType,
		);

		// Store
		this.COMPONENT_MANAGER.addComponent(COMPONENT_NAME);

		// Add Technology
		if (dataProject['technology']) {
			// Next
			gridY += LINE_HEIGHT_IN_GRID_CELLS * 2;

			// Create Component
			const COMPONENT_TECHNOLOGY = new ComponentGlyphBox(
				this.SHAPE_MANAGER,
				dataProject['technology'],
				gridX,
				gridY,
				100,
				50,
				delayFrames,
				delayGlyph,
				FillType.PassThrough,
				FillStrategyType.Random,
				drawType,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT_TECHNOLOGY);
		}

		// Add Credit ?
		if (dataProject['credit']) {
			// Next
			gridY += LINE_HEIGHT_IN_GRID_CELLS * 2;

			// Create Component
			const COMPONENT_CREDIT = new ComponentGlyphBox(
				this.SHAPE_MANAGER,
				`> ${dataProject['credit']['text']}`,
				gridX,
				gridY,
				100,
				50,
				delayFrames,
				delayGlyph,
				FillType.PassThrough,
				FillStrategyType.Random,
				drawType,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT_CREDIT);
		}
	}

	// ______________________________________________________________ Rectangles

	addRectanglesBlock(
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

	// __________________________________________________________________ Access

	getViewId() {
		return this.#VIEW_ID;
	}
}
