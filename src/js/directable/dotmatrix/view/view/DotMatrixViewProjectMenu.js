import ApplicationLogger from '../../../../application/ApplicationLogger.js';

import DataController from '../../../../data/DataController.js';

import GridData from '../../../../grid/GridData.js';
import InteractiveSurface from '../../../../interactive/InteractiveSurface.js';

import DotMatrixView from '../DotMatrixView.js';
import DotMatrixViewConstants from '../DotMatrixViewConstants.js';

import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import ComponentGlyphLineCentered from '../../component/glyph/ComponentGlyphLineCentered.js';
import ApplicationDispatcher from '../../../../application/ApplicationDispatcher.js';

export default class DotMatrixViewProjectMenu extends DotMatrixView {
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
		ApplicationLogger.log('Project Menu start', this.#LOG_LEVEL);

		// Get Line Height
		const LINE_HEIGHT = DotMatrixViewConstants.getLineHeight();

		// Get Grid Size
		const GRID_MAX = GridData.getGridMax();
		const GRID_MAX_WIDTH = GRID_MAX[0];

		// Get Project Data
		const PROJECT_DATA = DataController.getProjects();

		// Draw
		for (let i = 0; i < PROJECT_DATA.length; i += 1) {
			// Get Project Data Item
			const PROJECT_DATA_ITEM = PROJECT_DATA[i];

			// Grid Y
			const GRID_Y = LINE_HEIGHT * (7 + i * 2);

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

			// Get Component Details
			const GRID_X_CENTERED_START = COMPONENT.getGridXCenteredStart();
			const GRID_WIDTH = COMPONENT.getGridWidth();

			// Create Interactive Block
			const INTERACTIVE_BLOCK = InteractiveSurface.createBlock(
				GRID_X_CENTERED_START * GridData.getGridCellWidthPx(),
				GRID_Y * GridData.getGridCellHeightPx(),
				GRID_WIDTH * GridData.getGridCellWidthPx(),
				LINE_HEIGHT * GridData.getGridCellHeightPx(),
				this.onButtonMenuClick.bind(this),
				this.onButtonMenuOver.bind(this),
				this.onButtonMenuOut.bind(this),
				{ projectId: PROJECT_DATA_ITEM['id'] },
			);

			this.INTERACTIVE_BLOCK_IDS.push(INTERACTIVE_BLOCK);
		}
	}

	// _____________________________________________________________ Button Menu

	onButtonMenuClick(clickData) {
		// TODO Implement

		ApplicationDispatcher.dispatch('view-project-menu-select', {
			projectId: clickData.projectId,
		});

		console.log('Project Menu Button Clicked ' + clickData.projectId);
	}

	onButtonMenuOver() {
		// TODO Implement
	}

	onButtonMenuOut() {
		// TODO Implement
	}
}
