import DataController from '../../../../data/DataController.js';

import DotMatrixView from '../DotMatrixView.js';

import DirectableDotMatrixConstants from '../../DirectableDotMatrixConstants.js';

import FillType from '../../enum/FillType.js';
import FillStrategyType from '../../enum/FillStrategyType.js';
import DrawType from '../../enum/DrawType.js';

import ComponentGlyphBox from '../../component/glyph/ComponentGlyphBox.js';

export default class DotMatrixViewProject_ferrari extends DotMatrixView {
	#DELAY_GLYPH = 1;

	// ___________________________________________________________________ Start

	start(delayFrames = 0) {
		super.start(delayFrames);

		// Start
		this.draw(delayFrames, DrawType.Fill);
	}

	stop(delayFrames = 0) {
		super.stop(delayFrames);

		// Stop
		this.draw(delayFrames, DrawType.Clear);
	}

	// ____________________________________________________________________ Draw

	draw(delayFrames, drawType) {
		super.draw(delayFrames, drawType);

		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeightInGridCells();

		// Get Project Data
		const DATA_PROJECT = DataController.getProjectById(this.getViewId());

		if (!DATA_PROJECT) {
			console.warn(
				'DotMatrixViewBattleBuilder draw. No Project Data, ViewId ' +
					this.getViewId(),
				this.LOG_LEVEL,
			);

			return;
		}

		console.log('BattleBuilder Project Data Item', DATA_PROJECT);

		//
		let gridX = 0;
		let gridY = LINE_HEIGHT * 10;

		// TODO Long or Short Name

		// Next
		gridY += LINE_HEIGHT * 2;

		// Add Component Name
		const COMPONENT_NAME = new ComponentGlyphBox(
			this.SHAPE_MANAGER,
			DATA_PROJECT['name'],
			gridX,
			gridY,
			100,
			50,
			delayFrames,
			this.#DELAY_GLYPH,
			FillType.PassThrough,
			FillStrategyType.Random,
			drawType,
		);

		// Store
		this.COMPONENT_MANAGER.addComponent(COMPONENT_NAME);

		// Next
		gridY += LINE_HEIGHT * 2;

		// Add Component Name Short
		const COMPONENT_NAME_SHORT = new ComponentGlyphBox(
			this.SHAPE_MANAGER,
			DATA_PROJECT['name-short'],
			gridX,
			gridY,
			100,
			50,
			delayFrames,
			this.#DELAY_GLYPH,
			FillType.PassThrough,
			FillStrategyType.Random,
			drawType,
		);

		// Store
		this.COMPONENT_MANAGER.addComponent(COMPONENT_NAME_SHORT);

		// Add Technology
		if (DATA_PROJECT['technology']) {
			// Next
			gridY += LINE_HEIGHT * 2;

			// Create Component
			const COMPONENT_TECHNOLOGY = new ComponentGlyphBox(
				this.SHAPE_MANAGER,
				DATA_PROJECT['technology'],
				gridX,
				gridY,
				100,
				50,
				delayFrames,
				this.#DELAY_GLYPH,
				FillType.PassThrough,
				FillStrategyType.Random,
				drawType,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT_TECHNOLOGY);
		}

		// Add Credit ?
		if (DATA_PROJECT['credit']) {
			// Next
			gridY += LINE_HEIGHT * 2;

			// Create Component
			const COMPONENT_CREDIT = new ComponentGlyphBox(
				this.SHAPE_MANAGER,
				DATA_PROJECT['credit']['text'],
				gridX,
				gridY,
				100,
				50,
				delayFrames,
				this.#DELAY_GLYPH,
				FillType.PassThrough,
				FillStrategyType.Random,
				drawType,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT_CREDIT);
		}
	}
}
