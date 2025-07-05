import ApplicationLogger from '../../../application/ApplicationLogger.js';

import DataController from '../../../data/DataController.js';

import GridData from '../../../grid/GridData.js';

import DotMatrixView from './DotMatrixView.js';

import FillType from '../shape/fill/FillType.js';
import FillStrategyType from '../shape/fill/FillStrategyType.js';

import ComponentGlyphBox from '../component/glyph/ComponentGlyphBox.js';

export default class DotMatrixViewHeader extends DotMatrixView {
	// TODO Constants
	#LINE_HEIGHT = 7;

	#LOG_LEVEL = 4;

	// _________________________________________________________________________

	constructor(shapeManager, viewId) {
		super(shapeManager, viewId);

		ApplicationLogger.log('Project Menu', this.#LOG_LEVEL);
	}

	// ___________________________________________________________________ Start

	start() {
		// Draw
		const COMPONENT = new ComponentGlyphBox(
			this.SHAPE_MANAGER,
			'MENU',
			8,
			this.#LINE_HEIGHT * 5,
			100,
			50,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			10,
		);

		this.COMPONENTS.push(COMPONENT);
	}
}
