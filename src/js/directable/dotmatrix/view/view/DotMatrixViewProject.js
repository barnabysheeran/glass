import ApplicationLogger from '../../../../application/ApplicationLogger.js';

import DataController from '../../../../data/DataController.js';

import DotMatrixView from '../DotMatrixView.js';
import DotMatrixViewConstants from '../DotMatrixViewConstants.js';

import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import ComponentGlyphBox from '../../component/glyph/ComponentGlyphBox.js';

export default class DotMatrixViewProject extends DotMatrixView {
	#projectId = 0;

	#LOG_LEVEL = 4;

	// _________________________________________________________________________

	constructor(shapeManager, viewId) {
		super(shapeManager, viewId);

		ApplicationLogger.log('Project View Project', this.#LOG_LEVEL);
	}

	// ______________________________________________________________ Project Id

	setProjectId(projectId) {
		this.#projectId = projectId;
	}

	// ___________________________________________________________________ Start

	start() {
		const LINE_HEIGHT = DotMatrixViewConstants.getLineHeight();

		// Get Project Data
		const PROJECT_DATA = DataController.getProjects();
		const PROJECT_DATA_ITEM = PROJECT_DATA[this.#projectId];

		// Add Component Name
		const COMPONENT_NAME = new ComponentGlyphBox(
			this.SHAPE_MANAGER,
			PROJECT_DATA_ITEM['name'],
			8,
			LINE_HEIGHT * 10,
			100,
			50,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			this.getDelayFromGridY(10),
		);

		this.COMPONENTS.push(COMPONENT_NAME);

		// Add Component Name Short
		const COMPONENT_NAME_SHORT = new ComponentGlyphBox(
			this.SHAPE_MANAGER,
			PROJECT_DATA_ITEM['name-short'],
			8,
			LINE_HEIGHT * 11,
			100,
			50,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			this.getDelayFromGridY(11),
		);

		this.COMPONENTS.push(COMPONENT_NAME_SHORT);
	}
}
