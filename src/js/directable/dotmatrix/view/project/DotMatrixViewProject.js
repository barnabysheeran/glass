import DataController from '../../../../data/DataController.js';

import DotMatrixView from '../DotMatrixView.js';

import DirectableDotMatrixConstants from '../../DirectableDotMatrixConstants.js';
import DirectableDotMatrixDelays from '../../DirectableDotMatrixDelays.js';

import FillType from '../../enum/FillType.js';
import FillStrategyType from '../../enum/FillStrategyType.js';
import DrawType from '../../enum/DrawType.js';

import ComponentGlyphBox from '../../component/glyph/ComponentGlyphBox.js';

export default class DotMatrixViewProject extends DotMatrixView {
	#projectId;

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

	// ______________________________________________________________ Project Id

	setProjectId(projectId) {
		this.#projectId = projectId;
	}

	// ____________________________________________________________________ Draw

	draw(delayFrames) {
		super.draw(delayFrames);

		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();

		// Get Project Data
		const PROJECT_DATA_ITEM = DataController.getProjectById(this.#projectId);

		console.log('Project Data Item', PROJECT_DATA_ITEM);

		if (!PROJECT_DATA_ITEM) {
			return;
		}

		//
		let gridX = 0;
		let gridY = LINE_HEIGHT * 10;

		// TODO Long or Short Name

		// Add Component Name
		const COMPONENT_NAME = new ComponentGlyphBox(
			this.SHAPE_MANAGER,
			PROJECT_DATA_ITEM['name'],
			gridX,
			gridY,
			100,
			50,
			delayFrames +
				DirectableDotMatrixDelays.getDelayFromGridPosition(gridX, gridY),
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		// Store
		this.COMPONENT_MANAGER.addComponent(COMPONENT_NAME);

		// Next
		gridY += LINE_HEIGHT * 2;

		// Add Component Name Short
		const COMPONENT_NAME_SHORT = new ComponentGlyphBox(
			this.SHAPE_MANAGER,
			PROJECT_DATA_ITEM['name-short'],
			gridX,
			gridY,
			100,
			50,
			delayFrames +
				DirectableDotMatrixDelays.getDelayFromGridPosition(gridX, gridY),
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		// Store
		this.COMPONENT_MANAGER.addComponent(COMPONENT_NAME_SHORT);

		// Add Credit ?
		if (PROJECT_DATA_ITEM['credit']) {
			// Next
			gridY += LINE_HEIGHT * 2;

			// Create Component
			const COMPONENT_CREDIT = new ComponentGlyphBox(
				this.SHAPE_MANAGER,
				PROJECT_DATA_ITEM['credit']['text'],
				gridX,
				gridY,
				100,
				50,
				delayFrames +
					DirectableDotMatrixDelays.getDelayFromGridPosition(gridX, gridY),
				FillType.PassThrough,
				FillStrategyType.PassThrough,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT_CREDIT);
		}
	}

	// __________________________________________________________________ Undraw

	undraw(delayFrames) {
		super.undraw();

		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();

		// Get Project Data
		const PROJECT_DATA_ITEM = DataController.getProjectById(this.#projectId);

		console.log('Project Data Item', PROJECT_DATA_ITEM);

		if (!PROJECT_DATA_ITEM) {
			return;
		}

		//
		let gridX = 0;
		let gridY = LINE_HEIGHT * 10;

		// TODO Long or Short Name

		// Add Component Name
		const COMPONENT_NAME = new ComponentGlyphBox(
			this.SHAPE_MANAGER,
			PROJECT_DATA_ITEM['name'],
			gridX,
			gridY,
			100,
			50,
			delayFrames +
				DirectableDotMatrixDelays.getDelayFromGridPosition(gridX, gridY),
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			DrawType.Clear,
		);

		// Store
		this.COMPONENT_MANAGER.addComponent(COMPONENT_NAME);

		// Next
		gridY += LINE_HEIGHT * 2;

		// Add Component Name Short
		const COMPONENT_NAME_SHORT = new ComponentGlyphBox(
			this.SHAPE_MANAGER,
			PROJECT_DATA_ITEM['name-short'],
			gridX,
			gridY,
			100,
			50,
			delayFrames +
				DirectableDotMatrixDelays.getDelayFromGridPosition(gridX, gridY),
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			DrawType.Clear,
		);

		// Store
		this.COMPONENT_MANAGER.addComponent(COMPONENT_NAME_SHORT);

		// Add Credit ?
		if (PROJECT_DATA_ITEM['credit']) {
			// Next
			gridY += LINE_HEIGHT * 2;

			// Create Component
			const COMPONENT_CREDIT = new ComponentGlyphBox(
				this.SHAPE_MANAGER,
				PROJECT_DATA_ITEM['credit']['text'],
				gridX,
				gridY,
				100,
				50,
				delayFrames +
					DirectableDotMatrixDelays.getDelayFromGridPosition(gridX, gridY),
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				DrawType.Clear,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT_CREDIT);
		}
	}
}
