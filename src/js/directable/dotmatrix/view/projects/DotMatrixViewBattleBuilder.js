import DataController from '../../../../data/DataController.js';

import DotMatrixView from '../DotMatrixView.js';

import DirectableDotMatrixConstants from '../../DirectableDotMatrixConstants.js';
import DirectableDotMatrixDelays from '../../DirectableDotMatrixDelays.js';

import FillType from '../../enum/FillType.js';
import FillStrategyType from '../../enum/FillStrategyType.js';
import DrawType from '../../enum/DrawType.js';

import ComponentGlyphBox from '../../component/glyph/ComponentGlyphBox.js';
import ComponentGlyphLineCentered from '../../component/glyph/ComponentGlyphLineCentered.js';

export default class DotMatrixViewBattleBuilder extends DotMatrixView {
	#STRING_WINGED_SKULL = '{wing-left} {skull} {wing-right}';

	#DELAY_GLYPH = 1;

	// _________________________________________________________________________

	constructor(shapeManager, componentManager) {
		super(shapeManager, componentManager, 'BattleBuilder');
	}

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
		super.draw(delayFrames);

		if (!drawType) {
			console.warn('DotMatrixViewBattleBuilder draw. No Draw Type');
		}

		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();

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

		// Add Component Winged Skull
		const COMPONENT_WINGED_SKULL = new ComponentGlyphLineCentered(
			this.SHAPE_MANAGER,
			this.#STRING_WINGED_SKULL,
			gridY,
			delayFrames,
			this.#DELAY_GLYPH,
			FillType.PassThrough,
			FillStrategyType.Random,
			drawType,
		);

		// Store
		this.COMPONENT_MANAGER.addComponent(COMPONENT_WINGED_SKULL);

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

	// ____________________________________________________________________ Tick

	tick() {
		super.tick();

		// Active ?
		if (this.isActive !== true) {
			return;
		}

		if (Math.random() < 0.01) {
			this.draw(0, DrawType.Clear);
			this.draw(7, DrawType.Fill);
		}
	}
}
