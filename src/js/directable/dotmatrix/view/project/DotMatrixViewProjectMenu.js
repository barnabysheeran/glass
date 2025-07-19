import ApplicationDispatcher from '../../../../application/ApplicationDispatcher.js';
import DataController from '../../../../data/DataController.js';

import GridData from '../../../../grid/GridData.js';
import InteractiveSurface from '../../../../interactive/InteractiveSurface.js';

import DotMatrixView from '../DotMatrixView.js';

import DirectableDotMatrixConstants from '../../DirectableDotMatrixConstants.js';

import FillType from '../../enum/FillType.js';
import FillStrategyType from '../../enum/FillStrategyType.js';
import DrawType from '../../enum/DrawType.js';

import ComponentGlyphLineCentered from '../../component/glyph/ComponentGlyphLineCentered.js';

import { viewAddRectanglesBlock } from '../DotMatrixViewUtils.js';

export default class DotMatrixViewProjectMenu extends DotMatrixView {
	// TODO Tune with Menu Text
	#DELAY_ROLLOVER_REDRAW = 20;

	#PROJECT_IDS;
	#GRID_X_CENTERED_STARTS;
	#GRID_YS;
	#GRID_WIDTH_GLYPHS;

	#IS_OVERS;
	#REQUIRES_UPDATES;

	#DELAY_GLYPH = 5;

	// ______________________________________________________________ Start Stop

	start(delayFrames, drawType) {
		super.draw(delayFrames, drawType);

		// Order Important - Draw Stores Grid Position Information

		// Reset
		this.#PROJECT_IDS = [];
		this.#GRID_X_CENTERED_STARTS = [];
		this.#GRID_YS = [];
		this.#GRID_WIDTH_GLYPHS = [];

		// Get Project Data
		const PROJECT_DATA = DataController.getProjects();

		// Initialise Is Overs
		this.#IS_OVERS = [];

		for (let i = 0; i < PROJECT_DATA.length; i += 1) {
			this.#IS_OVERS[i] = false;
		}

		// Initialise Requires Updates
		this.#REQUIRES_UPDATES = [];

		for (let i = 0; i < PROJECT_DATA.length; i += 1) {
			this.#REQUIRES_UPDATES[i] = true;
		}

		// Draw
		this.draw(delayFrames, DrawType.Fill);

		// Create Interactive Blocks
		this.#createInteractiveBlocks();
	}

	stop(delayFrames) {
		// Super Removes Interactive Blocks
		super.stop(delayFrames);

		// Undraw Unsurrounding Rectangles
		for (let i = 0; i < this.#PROJECT_IDS.length; i += 1) {
			this.#drawSurroundingRectangle(
				this.#PROJECT_IDS[i],
				delayFrames,
				DrawType.Clear,
			);
		}
	}

	// ____________________________________________________________________ Draw

	draw(delayFrames, drawType) {
		super.draw(delayFrames, drawType);

		// Get Height
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

		// Delay Glyphs
		// TODO Hardcoded
		const DELAY_GLYPHS = 10;

		// Draw
		for (let i = 0; i < PROJECT_DATA.length; i += 1) {
			// Requires Update ?
			if (this.#REQUIRES_UPDATES[i] === false) {
				continue;
			}

			// Get Project Data Item
			const PROJECT_DATA_ITEM = PROJECT_DATA[i];

			// Grid Y
			const GRID_Y = LINE_HEIGHT * (LINE_HEIGHT_MENU_START + i * LINE_SPACING);

			// Text
			let text = PROJECT_DATA_ITEM['name'];

			if (GRID_WIDTH_IN_CELLS < BLOCK_WIDTH_MOBILE) {
				text = PROJECT_DATA_ITEM['name-short'];
			}

			// Draw Mode
			let drawType = DrawType.Fill;

			// Is Over ?
			if (this.#IS_OVERS[i] === true) {
				drawType = DrawType.Clear;
			}

			// Create Glyph Line
			const COMPONENT = new ComponentGlyphLineCentered(
				this.SHAPE_MANAGER,
				text,
				GRID_Y,
				delayFrames + this.#DELAY_ROLLOVER_REDRAW,
				this.#DELAY_GLYPH,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				drawType,
			);

			// Store
			this.COMPONENT_MANAGER.addComponent(COMPONENT);

			// Store Component Details
			this.#PROJECT_IDS[i] = PROJECT_DATA_ITEM['id'];

			this.#GRID_X_CENTERED_STARTS[i] = COMPONENT.getGridXCenteredStart();
			this.#GRID_YS[i] = GRID_Y;
			this.#GRID_WIDTH_GLYPHS[i] = COMPONENT.getGridWidth();

			// Rectangle
			if (this.#IS_OVERS[i] === true) {
				// Is Over
				this.#drawSurroundingRectangle(
					this.#PROJECT_IDS[i],
					delayFrames,
					DrawType.Fill,
				);
			} else {
				// Is Not Over
				this.#drawSurroundingRectangle(
					this.#PROJECT_IDS[i],
					delayFrames,
					DrawType.Clear,
				);
			}

			// Updated
			this.#REQUIRES_UPDATES[i] = false;
		}
	}

	// _____________________________________________________________ Interaction

	#createInteractiveBlocks() {
		// Get Height
		const CHARACTER_HEIGHT = DirectableDotMatrixConstants.getCharacterHeight();

		for (let i = 0; i < this.#PROJECT_IDS.length; i += 1) {
			const INTERACTIVE_BLOCK = InteractiveSurface.createBlock(
				this.#GRID_X_CENTERED_STARTS[i] * GridData.getGridCellWidthPx(),
				this.#GRID_YS[i] * GridData.getGridCellHeightPx(),
				this.#GRID_WIDTH_GLYPHS[i] * GridData.getGridCellWidthPx(),
				CHARACTER_HEIGHT * GridData.getGridCellHeightPx(),
				this.onButtonMenuClick.bind(this),
				this.onButtonMenuOver.bind(this),
				this.onButtonMenuOut.bind(this),
				{ projectId: this.#PROJECT_IDS[i] },
			);

			// Store
			this.INTERACTIVE_BLOCK_IDS.push(INTERACTIVE_BLOCK);
		}
	}

	onButtonMenuClick(clickData) {
		// Dispatch Event
		ApplicationDispatcher.dispatch('view-project-menu-select', {
			projectId: clickData.projectId,
		});
	}

	onButtonMenuOver(clickData) {
		// Get Project Index
		const PROJECT_INDEX = this.#PROJECT_IDS.indexOf(clickData.projectId);

		console.log(
			`DotMatrixViewProjectMenu onButtonMenuOver projectId ${clickData.projectId} index ${PROJECT_INDEX}`,
		);

		// Is Over
		this.#IS_OVERS[PROJECT_INDEX] = true;

		// Require Update
		this.#REQUIRES_UPDATES[PROJECT_INDEX] = true;

		// Draw
		this.draw(0, DrawType.Clear);
		this.draw(this.#DELAY_ROLLOVER_REDRAW, DrawType.Fill);
	}

	onButtonMenuOut(clickData) {
		// Get Project Index
		const PROJECT_INDEX = this.#PROJECT_IDS.indexOf(clickData.projectId);

		console.log(
			`DotMatrixViewProjectMenu onButtonMenuOut projectId ${clickData.projectId} index ${PROJECT_INDEX}`,
		);

		// Is Not Over
		this.#IS_OVERS[PROJECT_INDEX] = false;

		// Require Update
		this.#REQUIRES_UPDATES[PROJECT_INDEX] = true;

		// Draw
		this.draw(0, DrawType.Clear);
		this.draw(this.#DELAY_ROLLOVER_REDRAW, DrawType.Fill);
	}

	// ______________________________________________________________ Rectangles

	#drawSurroundingRectangle(projectId, delayFrames, drawType) {
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
			FillStrategyType.Reverse,
			drawType,
		);
	}
}
