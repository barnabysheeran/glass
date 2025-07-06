import ApplicationLogger from '../../../../application/ApplicationLogger.js';

import GridData from '../../../../grid/GridData.js';
import InteractiveSurface from '../../../../interactive/InteractiveSurface.js';

import DotMatrixView from '../DotMatrixView.js';

import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import ComponentGlyphLineCentered from '../../component/glyph/ComponentGlyphLineCentered.js';

export default class DotMatrixViewHeader extends DotMatrixView {
	// TODO Constants
	#LINE_HEIGHT = 7;

	#INTERACTIVE_BLOCK;

	#LOG_LEVEL = 4;

	// _________________________________________________________________________

	constructor(shapeManager, viewId) {
		super(shapeManager, viewId);

		ApplicationLogger.log('View Header', this.#LOG_LEVEL);
	}

	// ___________________________________________________________________ Start

	start() {
		const GRID_X = this.#LINE_HEIGHT * 2;
		const GRID_Y = this.#LINE_HEIGHT * 3;

		// Create Glyph Line
		const COMPONENT = new ComponentGlyphLineCentered(
			this.SHAPE_MANAGER,
			'MENU',
			GRID_X,
			GRID_X,
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
			this.#LINE_HEIGHT * GridData.getGridCellHeightPx(),
			this.onButtonMenuClick.bind(this),
			this.onButtonMenuOver.bind(this),
			this.onButtonMenuOut.bind(this),
		);

		this.INTERACTIVE_BLOCKS.push(this.#INTERACTIVE_BLOCK);
	}

	// _____________________________________________________________ Button Menu

	onButtonMenuClick() {
		ApplicationLogger.log('View Header Button Menu Click', this.#LOG_LEVEL);

		// TODO Implement
	}

	onButtonMenuOver() {
		ApplicationLogger.log('View Header Button Menu Over', this.#LOG_LEVEL);

		// TODO Implement
	}

	onButtonMenuOut() {
		ApplicationLogger.log('View Header Button Menu Out', this.#LOG_LEVEL);

		// TODO Implement
	}

	// ___________________________________________________________________ Reset
}
