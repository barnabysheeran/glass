import ApplicationDispatcher from '../../../../application/ApplicationDispatcher.js';

import GridData from '../../../../grid/GridData.js';
import InteractiveSurface from '../../../../interactive/InteractiveSurface.js';

import DotMatrixView from '../DotMatrixView.js';

import DirectableDotMatrixConstants from '../../DirectableDotMatrixConstants.js';
import DirectableDotMatrixDelays from '../../DirectableDotMatrixDelays.js';

import FillType from '../../enum/FillType.js';
import FillStrategyType from '../../enum/FillStrategyType.js';
import DrawType from '../../enum/DrawType.js';

import ComponentGlyphLineCentered from '../../component/glyph/ComponentGlyphLineCentered.js';
import ComponentRectangle from '../../component/primative/ComponentRectangle.js';

export default class DotMatrixViewHeader extends DotMatrixView {
	#DELAY_ROLLOVER_REDRAW = 140;

	#gridXCenteredStart = 0;
	#gridY = 0;
	#gridWidthGlyphs = 0;

	// TODO Remove isActive in favour of super.isActive
	#isActive = false;

	// ___________________________________________________________________ Start

	start(delayFrames = 0) {
		super.start(delayFrames);

		// Start
		this.draw(delayFrames);
	}

	stop(delayFrames = 0) {
		super.stop(delayFrames);

		// Stop
		this.undraw(delayFrames);
	}

	// ____________________________________________________________________ Draw

	draw(delayFrames) {
		super.draw(delayFrames);

		// Get Height
		const CHARACTER_HEIGHT = DirectableDotMatrixConstants.getCharacterHeight();
		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();

		// Constant Position
		this.#gridY = LINE_HEIGHT * 2;

		// Create Glyph Line Centered Component
		const COMPONENT = new ComponentGlyphLineCentered(
			this.SHAPE_MANAGER,
			'Menu',
			this.#gridY,
			delayFrames +
				DirectableDotMatrixDelays.getDelayFromGridPosition(0, this.#gridY),
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT);

		// Get Component Details
		this.#gridXCenteredStart = COMPONENT.getGridXCenteredStart();
		this.#gridWidthGlyphs = COMPONENT.getGridWidth();

		// Create Interactive Block
		const INTERACTIVE_BLOCK = InteractiveSurface.createBlock(
			this.#gridXCenteredStart * GridData.getGridCellWidthPx(),
			this.#gridY * GridData.getGridCellHeightPx(),
			this.#gridWidthGlyphs * GridData.getGridCellWidthPx(),
			CHARACTER_HEIGHT * GridData.getGridCellHeightPx(),
			this.onButtonMenuClick.bind(this),
			this.onButtonMenuOver.bind(this),
			this.onButtonMenuOut.bind(this),
		);

		this.INTERACTIVE_BLOCK_IDS.push(INTERACTIVE_BLOCK);
	}

	#drawSurroundingRectangle(delayFrames) {
		// Get Height
		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();

		// Position and Size
		const GRID_X = this.#gridXCenteredStart - 1;
		const GRID_Y = this.#gridY - 1;
		const GRID_WIDTH = this.#gridWidthGlyphs + 2;
		const GRID_HEIGHT = LINE_HEIGHT * 1;

		// Create Component Rectangle
		const COMPONENT_RECTANGLE = new ComponentRectangle(
			this.SHAPE_MANAGER,
			GRID_X,
			GRID_Y,
			GRID_WIDTH,
			GRID_HEIGHT,
			delayFrames,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT_RECTANGLE);
	}

	// __________________________________________________________________ Undraw

	undraw(delayFrames) {
		super.undraw(delayFrames);

		// Get Line Height
		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();

		// Constant Position
		const GRID_Y = LINE_HEIGHT * 2;

		// Create Glyph Line Centered Component
		const COMPONENT = new ComponentGlyphLineCentered(
			this.SHAPE_MANAGER,
			'Menu',
			GRID_Y,
			delayFrames +
				DirectableDotMatrixDelays.getDelayFromGridPosition(0, GRID_Y),
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			DrawType.Clear,
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT);
	}

	#undrawSurroundingRectangle(delayFrames) {
		// Get Height
		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();

		// Position and Size
		const GRID_X = this.#gridXCenteredStart - 1;
		const GRID_Y = this.#gridY - 1;
		const GRID_WIDTH = this.#gridWidthGlyphs + 2;
		const GRID_HEIGHT = LINE_HEIGHT * 1;

		// Create Component Rectangle
		const COMPONENT_RECTANGLE = new ComponentRectangle(
			this.SHAPE_MANAGER,
			GRID_X,
			GRID_Y,
			GRID_WIDTH,
			GRID_HEIGHT,
			delayFrames,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			DrawType.Clear,
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT_RECTANGLE);
	}

	// _________________________________________________ Interaction Button Menu

	onButtonMenuClick() {
		if (this.#isActive === true) {
			ApplicationDispatcher.dispatch('view-header-menu-inactive');

			// Inactive
			this.#isActive = false;
		} else {
			ApplicationDispatcher.dispatch('view-header-menu-active');

			// Active
			this.#isActive = true;
		}
	}

	// TODO Hardcoded delay

	onButtonMenuOver() {
		// Draw Surrounding Rectangle
		this.#drawSurroundingRectangle(0);

		// Draw
		this.undraw(this.#DELAY_ROLLOVER_REDRAW);
	}

	onButtonMenuOut() {
		// Undraw Surrounding Rectangle
		this.#undrawSurroundingRectangle(0);

		// Draw
		this.draw(this.#DELAY_ROLLOVER_REDRAW);
	}

	// __________________________________________________________________ Active

	setIsActive(isActive) {
		this.#isActive = isActive;
	}
}
