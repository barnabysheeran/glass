import DataController from '../../../../data/DataController.js';

import GridData from '../../../../grid/GridData.js';

import View from '../DotMatrixView.js';

import DirectableDotMatrixConstants from '../../DirectableDotMatrixConstants.js';

import FillType from '../../enum/FillType.js';
import FillStrategyType from '../../enum/FillStrategyType.js';
import DrawType from '../../enum/DrawType.js';

import ComponentGlyphBox from '../../component/glyph/ComponentGlyphBox.js';
import ComponentGlyphLineCentered from '../../component/glyph/ComponentGlyphLineCentered.js';

export default class ViewProject_battlebuilder extends View {
	#STRING_WINGED_SKULL = '{wing-left} {skull} {wing-right}';

	#DELAY_GLYPH_IN = 2;
	#DELAY_GLYPH_OUT = 0;
	#delayGlyph;

	// ______________________________________________________________ Start Stop

	start(delayFrames) {
		super.start(delayFrames);

		// Set Delay Glyph
		this.#delayGlyph = this.#DELAY_GLYPH_IN;

		// Draw
		this.draw(delayFrames, DrawType.Fill);
	}

	stop(delayFrames) {
		super.stop(delayFrames);

		// Set Delay Glyph
		this.#delayGlyph = this.#DELAY_GLYPH_OUT;

		// Draw
		this.draw(delayFrames, DrawType.Clear);
	}

	// ____________________________________________________________________ Draw

	draw(delayFrames, drawType) {
		super.draw(delayFrames, drawType);

		// Get Project Data
		const DATA_PROJECT = DataController.getProjectById(this.getViewId());

		if (!DATA_PROJECT) {
			console.warn(
				'ViewBattleBuilder draw. No Project Data, ViewId ' + this.getViewId(),
				this.LOG_LEVEL,
			);

			return;
		}

		// Get Heights
		const LINE_HEIGHT_IN_GRID_CELLS =
			DirectableDotMatrixConstants.getLineHeightInGridCells();

		const MEDIA_BOTTOM_IN_GRID_CELLS =
			DirectableDotMatrixConstants.getMediaBottomInGridCells(
				DATA_PROJECT['media-aspect'],
			);

		// Get Is Mobile
		const IS_MOBILE = GridData.getIsMobile();

		// Initialise Grid Positions
		let gridX = 0;
		let gridY = MEDIA_BOTTOM_IN_GRID_CELLS + LINE_HEIGHT_IN_GRID_CELLS;

		// Add Component Winged Skull
		const COMPONENT_WINGED_SKULL = new ComponentGlyphLineCentered(
			this.SHAPE_MANAGER,
			this.#STRING_WINGED_SKULL,
			gridY,
			delayFrames,
			this.#delayGlyph,
			FillType.PassThrough,
			FillStrategyType.Random,
			drawType,
		);

		// Store
		this.COMPONENT_MANAGER.addComponent(COMPONENT_WINGED_SKULL);

		// Next
		gridY += LINE_HEIGHT_IN_GRID_CELLS * 2;

		// Add Component Name
		let textName;

		if (IS_MOBILE) {
			textName = DATA_PROJECT['name-short'];
		} else {
			textName = DATA_PROJECT['name'];
		}

		const COMPONENT_NAME = new ComponentGlyphBox(
			this.SHAPE_MANAGER,
			textName,
			gridX,
			gridY,
			100,
			50,
			delayFrames,
			this.#delayGlyph,
			FillType.PassThrough,
			FillStrategyType.Random,
			drawType,
		);

		// Store
		this.COMPONENT_MANAGER.addComponent(COMPONENT_NAME);

		// Add Comment
		if (DATA_PROJECT['comment']) {
			// Next
			gridY += LINE_HEIGHT_IN_GRID_CELLS * 2;

			// Create Component
			const COMPONENT_COMMENT = new ComponentGlyphBox(
				this.SHAPE_MANAGER,
				DATA_PROJECT['comment'],
				gridX,
				gridY,
				100,
				50,
				delayFrames,
				this.#delayGlyph,
				FillType.PassThrough,
				FillStrategyType.Random,
				drawType,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT_COMMENT);
		}

		// Add Technology
		if (DATA_PROJECT['technology']) {
			// Next
			gridY += LINE_HEIGHT_IN_GRID_CELLS * 2;

			// Create Component
			const COMPONENT_TECHNOLOGY = new ComponentGlyphBox(
				this.SHAPE_MANAGER,
				DATA_PROJECT['technology'],
				gridX,
				gridY,
				100,
				50,
				delayFrames,
				this.#delayGlyph,
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
			gridY += LINE_HEIGHT_IN_GRID_CELLS * 2;

			// Create Component
			const COMPONENT_CREDIT = new ComponentGlyphBox(
				this.SHAPE_MANAGER,
				DATA_PROJECT['credit']['text'],
				gridX,
				gridY,
				100,
				50,
				delayFrames,
				this.#delayGlyph,
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

		// TODO Hardcoded Delay
		if (Math.random() < 0.005) {
			this.draw(0, DrawType.Clear);
			this.draw(10, DrawType.Fill);
		}
	}
}
