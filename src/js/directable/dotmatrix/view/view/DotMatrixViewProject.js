import ApplicationLogger from '../../../../application/ApplicationLogger.js';

import DataController from '../../../../data/DataController.js';

import DotMatrixView from '../DotMatrixView.js';

import DirectableDotMatrixConstants from '../../DirectableDotMatrixConstants.js';

import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import ComponentGlyphBox from '../../component/glyph/ComponentGlyphBox.js';

export default class DotMatrixViewProject extends DotMatrixView {
	#projectId = 0;

	// ______________________________________________________________ Project Id

	setProjectId(projectId) {
		this.#projectId = projectId;
	}

	// ____________________________________________________________________ Draw

	draw() {
		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();

		// Get Project Data
		const PROJECT_DATA_ITEM = DataController.getProjectById(this.#projectId);

		console.log('Project Data Item', PROJECT_DATA_ITEM);

		if (!PROJECT_DATA_ITEM) {
			return;
		}

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

		// Store
		this.COMPONENT_MANAGER.addComponent(COMPONENT_NAME);

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

		// Store
		this.COMPONENT_MANAGER.addComponent(COMPONENT_NAME_SHORT);

		// Add Credit ?
		if (PROJECT_DATA_ITEM['credit']) {
			const COMPONENT_CREDIT = new ComponentGlyphBox(
				this.SHAPE_MANAGER,
				PROJECT_DATA_ITEM['credit']['text'],
				8,
				LINE_HEIGHT * 12,
				100,
				50,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				this.getDelayFromGridY(12),
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT_CREDIT);
		}
	}
}
