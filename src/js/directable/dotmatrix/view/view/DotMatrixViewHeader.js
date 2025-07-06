import ApplicationLogger from '../../../../application/ApplicationLogger.js';

import DataController from '../../../../data/DataController.js';

import GridData from '../../../../grid/GridData.js';

import DotMatrixView from '../DotMatrixView.js';

import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import ComponentGlyphBox from '../../component/glyph/ComponentGlyphBox.js';
import InteractiveSurface from '../../../../interactive/InteractiveSurface.js';

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
		const X = this.#LINE_HEIGHT * 2;
		const Y = this.#LINE_HEIGHT * 3;

		// Create Glyph Box
		// TODO Use Line
		const COMPONENT = new ComponentGlyphBox(
			this.SHAPE_MANAGER,
			'MENU',
			X,
			Y,
			100,
			50,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			this.getDelayFromGridY(3),
		);

		this.COMPONENTS.push(COMPONENT);

		// Create Interactive Block
		this.#INTERACTIVE_BLOCK = InteractiveSurface.createBlock(
			X,
			Y,
			100,
			50,
			this.onButtonMenuClick.bind(this),
			this.onButtonMenuOver.bind(this),
			this.onButtonMenuOut.bind(this),
		);
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
