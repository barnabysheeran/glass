import ApplicationLogger from '../../../../application/ApplicationLogger.js';
import ApplicationDispatcher from '../../../../application/ApplicationDispatcher.js';

import GridData from '../../../../grid/GridData.js';
import InteractiveSurface from '../../../../interactive/InteractiveSurface.js';

import DotMatrixView from '../DotMatrixView.js';
import DotMatrixViewConstants from '../DotMatrixViewConstants.js';

import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import ComponentGlyphLineCentered from '../../component/glyph/ComponentGlyphLineCentered.js';
import ComponentGlyphButton from '../../component/glyph/ComponentGlyphButton.js';

export default class DotMatrixViewHeader extends DotMatrixView {
	#INTERACTIVE_BLOCK;

	#isActive = false;

	#LOG_LEVEL = 4;

	// _________________________________________________________________________

	constructor(shapeManager, viewId) {
		super(shapeManager, viewId);

		ApplicationLogger.log('ViewHeader', this.#LOG_LEVEL);
	}

	// ___________________________________________________________________ Start

	start() {
		ApplicationLogger.log('ViewHeader start', this.#LOG_LEVEL);

		// Get Line Height
		const CHARACTER_HEIGHT = DotMatrixViewConstants.getCharacterHeight();
		const LINE_HEIGHT = DotMatrixViewConstants.getLineHeight();

		// Constant Position
		const GRID_Y = LINE_HEIGHT * 3;

		// Create Glyph Line Centered Component
		const COMPONENT = new ComponentGlyphLineCentered(
			this.SHAPE_MANAGER,
			'MENU',
			GRID_Y,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			this.getDelayFromGridY(3),
		);

		this.COMPONENTS.push(COMPONENT);

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
		const COMPONENT_BUTTON_TEST = new ComponentGlyphButton(
			this.SHAPE_MANAGER,
			'TEST',
			10,
			10,
		);

		this.COMPONENTS.push(COMPONENT_BUTTON_TEST);
	}

	// _________________________________________________ Interaction Button Menu

	onButtonMenuClick() {
		ApplicationLogger.log('ViewHeader Button Menu Click', this.#LOG_LEVEL);

		if (this.#isActive === true) {
			ApplicationDispatcher.dispatch('view-header-menu-inactive');
		} else {
			ApplicationDispatcher.dispatch('view-header-menu-active');
		}
	}

	onButtonMenuOver() {
		ApplicationLogger.log('ViewHeader Button Menu Over', this.#LOG_LEVEL);

		// TODO Implement
	}

	onButtonMenuOut() {
		ApplicationLogger.log('ViewHeader Button Menu Out', this.#LOG_LEVEL);

		// TODO Implement
	}

	// __________________________________________________________________ Active

	setIsActive(isActive) {
		this.#isActive = isActive;
	}
}
