import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import GridData from '../../../../grid/GridData.js';
import InteractiveSurface from '../../../../interactive/InteractiveSurface.js';

import Component from '../Component.js';

import DirectableDotMatrixConstants from '../../DirectableDotMatrixConstants.js';

import ComponentGlyphLineCentered from '../../component/glyph/ComponentGlyphLineCentered.js';

export default class ComponentGlyphButton extends Component {
	#INTERACTIVE_BLOCK;

	// Unique Parameters
	TEXT;

	// _________________________________________________________________________

	constructor(
		shapeManager,
		text,
		gridX,
		gridY,
		delay = 0,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		super(shapeManager, gridX, gridY, delay, fillType, fillStrategyType);

		// Store
		this.TEXT = text;

		// Get Line Height
		const CHARACTER_HEIGHT = DirectableDotMatrixConstants.getCharacterHeight();
		const LINE_HEIGHT = DirectableDotMatrixConstants.getLineHeight();

		// Constant Position
		const GRID_Y = LINE_HEIGHT * 3;

		// Create Glyph Line Centered Component
		const COMPONENT = new ComponentGlyphLineCentered(
			this.SHAPE_MANAGER,
			'MENU_TEST',
			GRID_Y,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
			10, // this.getDelayFromGridY(3),
		);

		// this.COMPONENTS.push(COMPONENT);

		// Get Component Details
		// const GRID_X_CENTERED_START = COMPONENT.getGridXCenteredStart();
		// const GRID_WIDTH = COMPONENT.getGridWidth();

		// Create Interactive Block
		// this.#INTERACTIVE_BLOCK = InteractiveSurface.createBlock(
		// 	GRID_X_CENTERED_START * GridData.getGridCellWidthPx(),
		// 	GRID_Y * GridData.getGridCellHeightPx(),
		// 	GRID_WIDTH * GridData.getGridCellWidthPx(),
		// 	CHARACTER_HEIGHT * GridData.getGridCellHeightPx(),
		// 	this.onButtonMenuClick.bind(this),
		// 	this.onButtonMenuOver.bind(this),
		// 	this.onButtonMenuOut.bind(this),
		// );

		// this.INTERACTIVE_BLOCK_IDS.push(this.#INTERACTIVE_BLOCK);
	}
}
