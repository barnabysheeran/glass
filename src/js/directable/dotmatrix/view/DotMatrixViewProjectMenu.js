import ApplicationLogger from '../../../application/ApplicationLogger.js';

import DataController from '../../../data/DataController.js';

import GridData from '../../../grid/GridData.js';

import DotMatrixView from './DotMatrixView.js';

import FillType from '../shape/fill/FillType.js';
import FillStrategyType from '../shape/fill/FillStrategyType.js';

import ComponentLineWidthFull from '../component/line/ComponentLineWidthFull.js';
import ComponentGlyphBox from '../component/glyph/ComponentGlyphBox.js';
import ComponentGlyphBoxWidthFull from '../component/glyph/ComponentGlyphBoxWidthFull.js';
import ComponentRectangle from '../component/primative/ComponentRectangle.js';

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
		// Get Grid Size
		// const GRID_MAX = GridData.getGridMax();

		// const GRID_MAX_WIDTH = GRID_MAX[0];
		// const GRID_MAX_WIDTH_THIRD = Math.floor(GRID_MAX_WIDTH / 3);

		// const GRID_MAX_HEIGHT = GRID_MAX[1];
		// const LINE_HEIGHT_MAX = Math.floor(GRID_MAX_HEIGHT / this.#LINE_HEIGHT);

		// Get Project Data
		const PROJECT_DATA = DataController.getProjects();

		// Draw
		for (let i = 0; i < PROJECT_DATA.length; i += 1) {
			const PROJECT_DATA_ITEM = PROJECT_DATA[i];

			const COMPONENT_ABC = new ComponentGlyphBox(
				this.SHAPE_MANAGER,
				PROJECT_DATA_ITEM['name'],
				0,
				5 + this.#LINE_HEIGHT * i,
				100,
				50,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				10 * i,
			);

			this.COMPONENTS.push(COMPONENT_ABC);
		}
	}
}
