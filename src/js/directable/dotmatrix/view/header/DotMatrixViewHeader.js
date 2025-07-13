import ApplicationDispatcher from '../../../../application/ApplicationDispatcher.js';

import GridData from '../../../../grid/GridData.js';
import InteractiveSurface from '../../../../interactive/InteractiveSurface.js';

import DotMatrixView from '../DotMatrixView.js';

import DirectableDotMatrixConstants from '../../DirectableDotMatrixConstants.js';
import DirectableDotMatrixDelays from '../../DirectableDotMatrixDelays.js';

import FillType from '../../enum/FillType.js';
import FillStrategyType from '../../enum/FillStrategyType.js';

import ComponentGlyphLineCentered from '../../component/glyph/ComponentGlyphLineCentered.js';
import ComponentGlyphButton from '../../component/glyph/ComponentGlyphButton.js';

export default class DotMatrixViewHeader extends DotMatrixView {
	#INTERACTIVE_BLOCK;

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

		// Get Line Height
		const CHARACTER_HEIGHT = DirectableDotMatrixConstants.getCharacterHeight();
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
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT);

		// Get Component Details
		const GRID_X_CENTERED_START = COMPONENT.getGridXCenteredStart();
		const GRID_WIDTH = COMPONENT.getGridWidth();

		// Create Interactive Block
		this.#INTERACTIVE_BLOCK = InteractiveSurface.createBlock(
			GRID_X_CENTERED_START * GridData.getGridCellWidthPx(),
			GRID_Y * GridData.getGridCellHeightPx(),
			GRID_WIDTH * GridData.getGridCellWidthPx(),
			CHARACTER_HEIGHT * GridData.getGridCellHeightPx(),
			this.onButtonMenuClick.bind(this),
			this.onButtonMenuOver.bind(this),
			this.onButtonMenuOut.bind(this),
		);

		this.INTERACTIVE_BLOCK_IDS.push(this.#INTERACTIVE_BLOCK);

		// Test Button
		let gridY = 10;

		const COMPONENT_BUTTON_TEST = new ComponentGlyphButton(
			this.SHAPE_MANAGER,
			'TEST',
			2,
			gridY,
			delayFrames +
				DirectableDotMatrixDelays.getDelayFromGridPosition(0, gridY),
		);

		this.COMPONENT_MANAGER.addComponent(COMPONENT_BUTTON_TEST);
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

	onButtonMenuOver() {
		// TODO Implement
	}

	onButtonMenuOut() {
		// TODO Implement
	}

	// __________________________________________________________________ Active

	setIsActive(isActive) {
		this.#isActive = isActive;
	}
}
