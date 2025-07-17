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

import { viewAddRectanglesBlock } from '../DotMatrixViewUtils.js';

export default class DotMatrixViewHeader extends DotMatrixView {
	#DELAY_ROLLOVER_REDRAW = 6;

	#gridXCenteredStart = 0;
	#gridY = 0;
	#gridWidthGlyphs = 0;

	#LINE_HEIGHT_ABOVE_HEADER = 2;

	#DELAY_GLYPH = 1;

	// ______________________________________________________________ Start Stop

	start(delayFrames = 0) {
		super.start(delayFrames);

		// Order Important - Draw Stores Grid Position Information

		// Draw
		this.draw(delayFrames);

		// Create Interactive Block
		this.#createInteractiveBlock();

		// Header is Unique, isActive Tracks App State
		this.isActive = false;
	}

	stop(delayFrames = 0) {
		// Super Removes Interactive Blocks
		super.stop(delayFrames);

		// Undraw
		this.undraw(delayFrames);
	}

	// ____________________________________________________________________ Draw

	draw(delayFrames) {
		super.draw(delayFrames);

		// Get Height
		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();
		const LINE_HEIGHT_HEADER =
			DirectableDotMatrixConstants.getLineHeightHeader();

		// Constant Position
		this.#gridY =
			LINE_HEIGHT * (LINE_HEIGHT_HEADER - this.#LINE_HEIGHT_ABOVE_HEADER);

		// Create Glyph Line Centered Component
		const COMPONENT = new ComponentGlyphLineCentered(
			this.SHAPE_MANAGER,
			'Menu',
			this.#gridY,
			delayFrames +
				DirectableDotMatrixDelays.getDelayFromGridPosition(0, this.#gridY),
			this.#DELAY_GLYPH,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT);

		// Store Component Details
		this.#gridXCenteredStart = COMPONENT.getGridXCenteredStart();
		this.#gridWidthGlyphs = COMPONENT.getGridWidth();
	}

	// __________________________________________________________________ Undraw

	undraw(delayFrames) {
		super.undraw(delayFrames);

		// Get Height
		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();
		const LINE_HEIGHT_HEADER =
			DirectableDotMatrixConstants.getLineHeightHeader();

		// Constant Position
		const GRID_Y =
			LINE_HEIGHT * (LINE_HEIGHT_HEADER - this.#LINE_HEIGHT_ABOVE_HEADER);

		// Create Glyph Line Centered Component
		const COMPONENT = new ComponentGlyphLineCentered(
			this.SHAPE_MANAGER,
			'Menu',
			GRID_Y,
			delayFrames +
				DirectableDotMatrixDelays.getDelayFromGridPosition(0, GRID_Y),
			this.#DELAY_GLYPH,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			DrawType.Clear,
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT);
	}

	// _____________________________________________________________ Interaction

	#createInteractiveBlock() {
		// Get Height
		const CHARACTER_HEIGHT = DirectableDotMatrixConstants.getCharacterHeight();

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

		// Store
		this.INTERACTIVE_BLOCK_IDS.push(INTERACTIVE_BLOCK);
	}

	onButtonMenuClick() {
		console.log(
			'DotMatrixViewHeader onButtonMenuClick. active:',
			this.isActive,
		);

		if (this.isActive === true) {
			ApplicationDispatcher.dispatch('project-menu-close');

			console.log(' - setting active to false');

			// Inactive
			this.isActive = false;

			// Unsurround Button
			this.#drawButtonUnsurrounded();
		} else {
			ApplicationDispatcher.dispatch('project-menu-open');

			console.log(' - setting active to true');

			// Active
			this.isActive = true;

			// Surround Button
			this.#drawButtonSurrounded();
		}
	}

	onButtonMenuOver() {
		console.log('DotMatrixViewHeader onButtonMenuOver. active:', this.isActive);

		if (this.isActive === false) {
			this.#drawButtonSurrounded();
		} else {
			this.#drawButtonUnsurrounded();
		}
	}

	onButtonMenuOut() {
		console.log('DotMatrixViewHeader onButtonMenuOut. active:', this.isActive);

		if (this.isActive === false) {
			this.#drawButtonUnsurrounded();
		} else {
			this.#drawButtonSurrounded();
		}
	}

	// __________________________________________________________________ Button

	#drawButtonSurrounded() {
		// Draw Surrounding Rectangle
		this.#drawSurroundingRectangle(0);

		// Draw
		this.undraw(this.#DELAY_ROLLOVER_REDRAW);
	}

	#drawButtonUnsurrounded() {
		// Undraw Surrounding Rectangle
		this.#undrawSurroundingRectangle(0);

		// Draw
		this.draw(this.#DELAY_ROLLOVER_REDRAW);
	}

	// _______________________________________________________________ Rectangle

	#drawSurroundingRectangle(delayFrames) {
		// Get Height
		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();

		// Position and Size
		const GRID_X = this.#gridXCenteredStart - 1;
		const GRID_Y = this.#gridY - 1;
		const GRID_WIDTH = this.#gridWidthGlyphs + 2;
		const GRID_HEIGHT = LINE_HEIGHT * 1;

		viewAddRectanglesBlock(
			this.SHAPE_MANAGER,
			this.COMPONENT_MANAGER,
			GRID_X,
			GRID_Y,
			GRID_WIDTH,
			GRID_HEIGHT,
			delayFrames,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			DrawType.Fill,
		);
	}

	#undrawSurroundingRectangle(delayFrames) {
		// Get Height
		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();

		// Position and Size
		const GRID_X = this.#gridXCenteredStart - 1;
		const GRID_Y = this.#gridY - 1;
		const GRID_WIDTH = this.#gridWidthGlyphs + 2;
		const GRID_HEIGHT = LINE_HEIGHT * 1;

		viewAddRectanglesBlock(
			this.SHAPE_MANAGER,
			this.COMPONENT_MANAGER,
			GRID_X,
			GRID_Y,
			GRID_WIDTH,
			GRID_HEIGHT,
			delayFrames,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			DrawType.Clear,
		);
	}
}
