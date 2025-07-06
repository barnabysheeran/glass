import ApplicationLogger from '../../../../application/ApplicationLogger.js';

import DataController from '../../../../data/DataController.js';

import GridData from '../../../../grid/GridData.js';

import DotMatrixView from '../DotMatrixView.js';

import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import ComponentGlyphBox from '../../component/glyph/ComponentGlyphBox.js';

export default class DotMatrixViewProjectMenu extends DotMatrixView {
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
		// Get Project Data
		const PROJECT_DATA = DataController.getProjects();

		// Draw
		for (let i = 0; i < PROJECT_DATA.length; i += 1) {
			const PROJECT_DATA_ITEM = PROJECT_DATA[i];

			const COMPONENT = new ComponentGlyphBox(
				this.SHAPE_MANAGER,
				PROJECT_DATA_ITEM['name'],
				8,
				this.#LINE_HEIGHT * (7 + i * 2),
				100,
				50,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				this.getDelayFromGridY(i + 7),
			);

			this.COMPONENTS.push(COMPONENT);
		}
	}
}
