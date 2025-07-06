import ApplicationLogger from '../../../../application/ApplicationLogger.js';

import DataController from '../../../../data/DataController.js';

import GridData from '../../../../grid/GridData.js';
import InteractiveSurface from '../../../../interactive/InteractiveSurface.js';

import DotMatrixView from '../DotMatrixView.js';

import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import ComponentGlyphLineCentered from '../../component/glyph/ComponentGlyphLineCentered.js';

export default class DotMatrixViewProjectMenu extends DotMatrixView {
	// TODO Constants
	#LINE_HEIGHT = 7;

	// TODO Calc Pixels
	#BLOCK_WIDTH_MOBILE = 130;

	#LOG_LEVEL = 4;

	// _________________________________________________________________________

	constructor(shapeManager, viewId) {
		super(shapeManager, viewId);

		ApplicationLogger.log('Project Menu', this.#LOG_LEVEL);
	}

	// ___________________________________________________________________ Start

	start() {
		// Get Grid Size
		const GRID_MAX = GridData.getGridMax();
		const GRID_MAX_WIDTH = GRID_MAX[0];

		// Get Project Data
		const PROJECT_DATA = DataController.getProjects();

		// Draw
		for (let i = 0; i < PROJECT_DATA.length; i += 1) {
			// Get Project Data Item
			const PROJECT_DATA_ITEM = PROJECT_DATA[i];

			// Grid X Y
			const GRID_X = this.#LINE_HEIGHT * 2;
			const GRID_Y = this.#LINE_HEIGHT * (7 + i * 2);

			// Text
			let text = PROJECT_DATA_ITEM['name'];

			if (GRID_MAX_WIDTH < this.#BLOCK_WIDTH_MOBILE) {
				text = PROJECT_DATA_ITEM['name-short'];
			}

			// Create Glyph Line
			const COMPONENT = new ComponentGlyphLineCentered(
				this.SHAPE_MANAGER,
				text,
				GRID_Y,
				FillType.PassThrough,
				FillStrategyType.PassThrough,
				this.getDelayFromGridY(i + 7),
			);

			this.COMPONENTS.push(COMPONENT);

			// Create Interactive Block
			const INTERACTIVE_BLOCK = InteractiveSurface.createBlock(
				GRID_X * GridData.getGridCellWidthPx(),
				GRID_Y * GridData.getGridCellHeightPx(),
				100,
				this.#LINE_HEIGHT * GridData.getGridCellHeightPx(),
				this.onButtonMenuClick.bind(this),
				this.onButtonMenuOver.bind(this),
				this.onButtonMenuOut.bind(this),
			);

			this.INTERACTIVE_BLOCKS.push(INTERACTIVE_BLOCK);
		}
	}

	// _____________________________________________________________ Button Menu

	onButtonMenuClick() {
		ApplicationLogger.log('View Header Button Menu Click', this.#LOG_LEVEL);

		// TODO Implement
	}

	onButtonMenuOver() {
		ApplicationLogger.log('View Header Button Menu Over', this.#LOG_LEVEL);

		// TODO Implement
	}

	onButtonMenuOut() {
		ApplicationLogger.log('View Header Button Menu Out', this.#LOG_LEVEL);

		// TODO Implement
	}
}
