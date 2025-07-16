import ApplicationDispatcher from '../../../../application/ApplicationDispatcher.js';
import DataController from '../../../../data/DataController.js';

import GridData from '../../../../grid/GridData.js';
import InteractiveSurface from '../../../../interactive/InteractiveSurface.js';

import DotMatrixView from '../DotMatrixView.js';

import DirectableDotMatrixConstants from '../../DirectableDotMatrixConstants.js';
import DirectableDotMatrixDelays from '../../DirectableDotMatrixDelays.js';

import FillType from '../../enum/FillType.js';
import FillStrategyType from '../../enum/FillStrategyType.js';
import DrawType from '../../enum/DrawType.js';

import ComponentGlyphLineCentered from '../../component/glyph/ComponentGlyphLineCentered.js';
import ComponentRectangle from '../../component/primative/ComponentRectangle.js';

import { viewAddRectanglesBlock } from '../DotMatrixViewUtils.js';

export default class DotMatrixViewProjectMenu extends DotMatrixView {
	#DELAY_ROLLOVER_REDRAW = 6;

	#PROJECT_IDS;
	#GRID_X_CENTERED_STARTS;
	#GRID_YS;
	#GRID_WIDTH_GLYPHS;

	#DELAY_GLYPH = 1;
	#DELAY_GLYPH_FAST = 0.1;

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
		this.#PROJECT_IDS = [];

		// Get Height
		const CHARACTER_HEIGHT = DirectableDotMatrixConstants.getCharacterHeight();
		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();
		const LINE_HEIGHT_HEADER =
			DirectableDotMatrixConstants.getLineHeightHeader();

		// Get Width
		const BLOCK_WIDTH_MOBILE =
			DirectableDotMatrixConstants.getBlockWidthMobile();

		// Get Grid Data
		const GRID_WIDTH_IN_CELLS = GridData.getGridWidthInCells();

		// Get Project Data
		const PROJECT_DATA = DataController.getProjects();

		// Calculate Line Distribution
		const LINE_SPACING = 2;
		const LINE_HEIGHT_MENU_START = LINE_HEIGHT_HEADER + 1;

		// Draw
		for (let i = 0; i < PROJECT_DATA.length; i += 1) {
			// Get Project Data Item
			const PROJECT_DATA_ITEM = PROJECT_DATA[i];

			// Grid Y
			const GRID_Y = LINE_HEIGHT * (LINE_HEIGHT_MENU_START + i * LINE_SPACING);

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
				this.#DELAY_GLYPH,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT);

			// Get Component Details
			const GRID_X_CENTERED_START = COMPONENT.getGridXCenteredStart();
			const GRID_WIDTH = COMPONENT.getGridWidth();

			// Create Interactive Blocks
			if (this.INTERACTIVE_BLOCK_IDS.length === 0) {
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
			}

			// Store Component Details
			this.#PROJECT_IDS.push(PROJECT_DATA_ITEM['id']);
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
				this.#DELAY_GLYPH,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				DrawType.Clear,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT);
		}

		// Undraw Rectangles
		for (let i = 0; i < this.#PROJECT_IDS.length; i += 1) {
			// Undraw Rectangle
			this.#undrawSurroundingRectangle(this.#PROJECT_IDS[i], delayFrames);
		}
	}

	// _____________________________________________________________ Interaction

	onButtonMenuClick(clickData) {
		// Dispatch Event
		ApplicationDispatcher.dispatch('view-project-menu-select', {
			projectId: clickData.projectId,
		});
	}

	onButtonMenuOver(clickData) {
		this.#highlightProject(clickData.projectId);
	}

	onButtonMenuOut(clickData) {
		this.#lowlightProject(clickData.projectId);
	}

	// _________________________________________________________________ Buttons

	#highlightProject(projectId) {
		console.log('higlightButton', projectId);

		// Draw Rectangle
		this.#drawSurroundingRectangle(projectId, 0);
	}

	#lowlightProject(projectId) {
		console.log('lowlightProject', projectId);

		// Undraw Rectangle
		this.#undrawSurroundingRectangle(projectId, 0);
	}

	// ______________________________________________________________ Rectangles

	#drawSurroundingRectangle(projectId, delayFrames) {
		// Get Project Index
		const PROJECT_INDEX = this.#PROJECT_IDS.indexOf(projectId);

		// Get Height
		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();

		// Position
		const GRID_X = this.#GRID_X_CENTERED_STARTS[PROJECT_INDEX] - 1;
		const GRID_Y = this.#GRID_YS[PROJECT_INDEX] - 1;

		// Size
		const GRID_WIDTH = this.#GRID_WIDTH_GLYPHS[PROJECT_INDEX] + 2;
		const GRID_HEIGHT = LINE_HEIGHT * 1;

		viewAddRectanglesBlock(
			this.SHAPE_MANAGER,
			this.COMPONENT_MANAGER,
			GRID_X,
			GRID_Y,
			GRID_WIDTH,
			GRID_HEIGHT,
			delayFrames,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			DrawType.Fill,
		);
	}

	#undrawSurroundingRectangle(projectId, delayFrames) {
		// Get Project Index
		const PROJECT_INDEX = this.#PROJECT_IDS.indexOf(projectId);

		// Get Height
		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();

		// Position and Size
		// const GRID_X = this.#gridXCenteredStart - 1;
		const GRID_X = this.#GRID_X_CENTERED_STARTS[PROJECT_INDEX] - 1;

		// const GRID_Y = this.#gridY - 1;
		const GRID_Y = this.#GRID_YS[PROJECT_INDEX] - 1;

		// const GRID_WIDTH = this.#gridWidthGlyphs + 2;
		const GRID_WIDTH = this.#GRID_WIDTH_GLYPHS[PROJECT_INDEX] + 2;

		// const GRID_HEIGHT = LINE_HEIGHT * 1;
		const GRID_HEIGHT = LINE_HEIGHT * 1;

		viewAddRectanglesBlock(
			this.SHAPE_MANAGER,
			this.COMPONENT_MANAGER,
			GRID_X,
			GRID_Y,
			GRID_WIDTH,
			GRID_HEIGHT,
			delayFrames,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			DrawType.Clear,
		);
	}
}
