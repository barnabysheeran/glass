import DataController from '../../../../data/DataController.js';

import DotMatrixView from '../DotMatrixView.js';

import DirectableDotMatrixConstants from '../../DirectableDotMatrixConstants.js';

import FillType from '../../enum/FillType.js';
import FillStrategyType from '../../enum/FillStrategyType.js';
import DrawType from '../../enum/DrawType.js';

import GridData from '../../../../grid/GridData.js';
import InteractiveSurface from '../../../../interactive/InteractiveSurface.js';

import ComponentGlyphLineCentered from '../../component/glyph/ComponentGlyphLineCentered.js';

export default class ViewProject extends DotMatrixView {
	#STRING_WINGED_SKULL = '{wing-left} {skull} {wing-right}';

	#DELAY_GLYPH_IN = 2;
	#DELAY_GLYPH_OUT = 0;
	#delayGlyph;

	#LOG_LEVEL = 4;

	// ______________________________________________________________ Start Stop

	start(delayFrames) {
		super.start(delayFrames);

		// Order Important - Draw Stores Grid Position Information

		// Set Delay Glyph
		this.#delayGlyph = this.#DELAY_GLYPH_IN;

		// Draw
		this.draw(delayFrames, DrawType.Fill);

		// Create Interactive Blocks
		this.createInteractiveBlocks();
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

		// Get Heights
		const LINE_HEIGHT_IN_GRID_CELLS =
			DirectableDotMatrixConstants.getLineHeightInGridCells();

		const MEDIA_BOTTOM_IN_GRID_CELLS =
			DirectableDotMatrixConstants.getMediaBottomInGridCells(
				DATA_PROJECT['media-aspect'],
			);

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

		// Add Project Text
		this.addProjectText(
			DATA_PROJECT,
			gridX,
			gridY,
			this.#delayGlyph,
			delayFrames,
			drawType,
		);
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

	// _____________________________________________________________ Interaction

	createInteractiveBlocks() {
		// Get Height
		const CHARACTER_HEIGHT = DirectableDotMatrixConstants.getCharacterHeight();

		// Create Interactive Blocks
		for (let i = 0; i < this.INTERACTIVE_GRID_XS.length; i += 1) {
			console.log(' --- ' + i + ' ---');

			const INTERACTIVE_BLOCK_ID = InteractiveSurface.createBlock(
				this.INTERACTIVE_GRID_XS[i] * GridData.getGridCellWidthPx(),
				this.INTERACTIVE_GRID_YS[i] * GridData.getGridCellHeightPx(),
				this.INTERACTIVE_GLYPH_WIDTHS[i] * GridData.getGridCellWidthPx(),
				CHARACTER_HEIGHT * GridData.getGridCellHeightPx(),
				this.onButtonMenuClick.bind(this),
				this.onButtonMenuOver.bind(this),
				this.onButtonMenuOut.bind(this),
				{ projectId: 'todo' },
			);

			// Store
			this.INTERACTIVE_BLOCK_IDS.push(INTERACTIVE_BLOCK_ID);
		}
	}

	onButtonMenuClick(event) {
		console.log(
			`ViewProject onButtonMenuClick: ${event.target.dataset.projectId}`,
		);
	}

	onButtonMenuOver(event) {
		console.log(
			`ViewProject onButtonMenuOver: ${event.target.dataset.projectId}`,
		);
	}

	onButtonMenuOut(event) {
		console.log(
			`ViewProject onButtonMenuOut: ${event.target.dataset.projectId}`,
		);
	}
}
