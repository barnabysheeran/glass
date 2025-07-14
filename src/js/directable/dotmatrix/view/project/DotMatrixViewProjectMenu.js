import DataController from '../../../../data/DataController.js';

import GridData from '../../../../grid/GridData.js';
import InteractiveSurface from '../../../../interactive/InteractiveSurface.js';

import DotMatrixView from '../DotMatrixView.js';

import DirectableDotMatrixConstants from '../../DirectableDotMatrixConstants.js';

import FillType from '../../enum/FillType.js';
import FillStrategyType from '../../enum/FillStrategyType.js';
import DrawType from '../../enum/DrawType.js';

import ComponentGlyphLineCentered from '../../component/glyph/ComponentGlyphLineCentered.js';
import ApplicationDispatcher from '../../../../application/ApplicationDispatcher.js';
import DirectableDotMatrixDelays from '../../DirectableDotMatrixDelays.js';

export default class DotMatrixViewProjectMenu extends DotMatrixView {
	#DELAY_ROLLOVER_REDRAW = 140;

	#GRID_X_CENTERED_STARTS;
	#GRID_YS;
	#GRID_WIDTH_GLYPHS;

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

	// ____________________________________________________________________ Draw

	draw(delayFrames) {
		super.draw(delayFrames);

		// Reset
		this.#GRID_X_CENTERED_STARTS = [];
		this.#GRID_YS = [];
		this.#GRID_WIDTH_GLYPHS = [];

		// Get Height
		const CHARACTER_HEIGHT = DirectableDotMatrixConstants.getCharacterHeight();
		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();
		const LINE_HEIGHT_HEADER =
			DirectableDotMatrixConstants.getLineHeightHeader();

		const LINE_HEIGHT_MENU_START = LINE_HEIGHT_HEADER + 1;

		// Get Width
		const BLOCK_WIDTH_MOBILE =
			DirectableDotMatrixConstants.getBlockWidthMobile();

		// Get Grid Data
		const GRID_WIDTH_IN_CELLS = GridData.getGridWidthInCells();

		// Get Project Data
		const PROJECT_DATA = DataController.getProjects();

		// Draw
		for (let i = 0; i < PROJECT_DATA.length; i += 1) {
			// Get Project Data Item
			const PROJECT_DATA_ITEM = PROJECT_DATA[i];

			// Grid Y
			const GRID_Y = LINE_HEIGHT * (LINE_HEIGHT_MENU_START + i * 2);

			// Text
			let text = PROJECT_DATA_ITEM['name'];

			if (GRID_WIDTH_IN_CELLS < BLOCK_WIDTH_MOBILE) {
				text = PROJECT_DATA_ITEM['name-short'];
			}

			// Create Glyph Line
			const COMPONENT = new ComponentGlyphLineCentered(
				this.SHAPE_MANAGER,
				text,
				GRID_Y,
				delayFrames +
					DirectableDotMatrixDelays.getDelayFromGridPosition(0, GRID_Y),
				FillType.PassThrough,
				FillStrategyType.PassThrough,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT);

			// Get Component Details
			const GRID_X_CENTERED_START = COMPONENT.getGridXCenteredStart();
			const GRID_WIDTH = COMPONENT.getGridWidth();

			// Create Interactive Block
			const INTERACTIVE_BLOCK = InteractiveSurface.createBlock(
				GRID_X_CENTERED_START * GridData.getGridCellWidthPx(),
				GRID_Y * GridData.getGridCellHeightPx(),
				GRID_WIDTH * GridData.getGridCellWidthPx(),
				CHARACTER_HEIGHT * GridData.getGridCellHeightPx(),
				this.onButtonMenuClick.bind(this),
				this.onButtonMenuOver.bind(this),
				this.onButtonMenuOut.bind(this),
				{ projectId: PROJECT_DATA_ITEM['id'] },
			);

			// Store
			this.INTERACTIVE_BLOCK_IDS.push(INTERACTIVE_BLOCK);

			// Store Grid Data
			this.#GRID_X_CENTERED_STARTS.push(GRID_X_CENTERED_START);
			this.#GRID_YS.push(GRID_Y);
			this.#GRID_WIDTH_GLYPHS.push(GRID_WIDTH);
		}
	}

	// __________________________________________________________________ Undraw

	undraw(delayFrames) {
		super.undraw(delayFrames);

		// Get Height
		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();
		const LINE_HEIGHT_HEADER =
			DirectableDotMatrixConstants.getLineHeightHeader();

		// Get Width
		const BLOCK_WIDTH_MOBILE =
			DirectableDotMatrixConstants.getBlockWidthMobile();

		const LINE_HEIGHT_MENU_START = LINE_HEIGHT_HEADER + 1;

		// Get Grid Data
		const GRID_WIDTH_IN_CELLS = GridData.getGridWidthInCells();

		// Get Project Data
		const PROJECT_DATA = DataController.getProjects();

		// Draw
		for (let i = 0; i < PROJECT_DATA.length; i += 1) {
			// Get Project Data Item
			const PROJECT_DATA_ITEM = PROJECT_DATA[i];

			// Grid Y
			const GRID_Y = LINE_HEIGHT * (LINE_HEIGHT_MENU_START + i * 2);

			// Text
			let text = PROJECT_DATA_ITEM['name'];

			if (GRID_WIDTH_IN_CELLS < BLOCK_WIDTH_MOBILE) {
				text = PROJECT_DATA_ITEM['name-short'];
			}

			// Create Glyph Line
			const COMPONENT = new ComponentGlyphLineCentered(
				this.SHAPE_MANAGER,
				text,
				GRID_Y,
				delayFrames +
					DirectableDotMatrixDelays.getDelayFromGridPosition(0, GRID_Y),
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				DrawType.Clear,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT);
		}
	}

	// _____________________________________________________________ Interaction

	onButtonMenuClick(clickData) {
		console.log('onButtonMenuClick', clickData);

		// Dispatch Event
		ApplicationDispatcher.dispatch('view-project-menu-select', {
			projectId: clickData.projectId,
		});
	}

	onButtonMenuOver(clickData) {
		console.log('onButtonMenuOver', clickData);

		// TODO Implement
	}

	onButtonMenuOut(clickData) {
		console.log('onButtonMenuOut', clickData);

		// TODO Implement
	}
}
