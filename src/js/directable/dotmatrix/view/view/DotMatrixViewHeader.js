import ApplicationLogger from '../../../../application/ApplicationLogger.js';

import GridData from '../../../../grid/GridData.js';
import InteractiveSurface from '../../../../interactive/InteractiveSurface.js';

import DotMatrixView from '../DotMatrixView.js';
import DotMatrixViewConstants from '../DotMatrixViewConstants.js';

import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import ComponentGlyphLineCentered from '../../component/glyph/ComponentGlyphLineCentered.js';
import ApplicationDispatcher from '../../../../application/ApplicationDispatcher.js';

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

		const LINE_HEIGHT = DotMatrixViewConstants.getLineHeight();

		const GRID_X = 0;
		const GRID_Y = LINE_HEIGHT * 3;

		// Create Glyph Line
		const COMPONENT = new ComponentGlyphLineCentered(
			this.SHAPE_MANAGER,
			'MENU',
			GRID_X,
			GRID_Y,
			100,
			50,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			this.getDelayFromGridY(3),
		);

		this.COMPONENTS.push(COMPONENT);

		// Create Interactive Block
		this.#INTERACTIVE_BLOCK = InteractiveSurface.createBlock(
			GRID_X * GridData.getGridCellWidthPx(),
			GRID_X * GridData.getGridCellHeightPx(),
			100,
			LINE_HEIGHT * GridData.getGridCellHeightPx(),
			this.onButtonMenuClick.bind(this),
			this.onButtonMenuOver.bind(this),
			this.onButtonMenuOut.bind(this),
		);

		this.INTERACTIVE_BLOCKS.push(this.#INTERACTIVE_BLOCK);
	}

	// _________________________________________________ Interaction Button Menu

	onButtonMenuClick() {
		ApplicationLogger.log('ViewHeader Button Menu Click', this.#LOG_LEVEL);

		// Toggle Active State
		this.#isActive = !this.#isActive;

		if (this.#isActive === true) {
			ApplicationDispatcher.dispatch('view-header-menu-active');
		} else {
			ApplicationDispatcher.dispatch('view-header-menu-inactive');
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
}
