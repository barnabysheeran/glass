import GridData from '../../../../grid/GridData.js';

import Component from '../Component.js';

import DirectableDotMatrixConstants from '../../DirectableDotMatrixConstants.js';

export default class ComponentGlyphLineCentered extends Component {
	// Unique Parameters
	TEXT;

	gridXCentered = 0;
	gridWidth = 0;

	// _________________________________________________________________________

	constructor(
		shapeManager,
		text,
		gridY,
		delay,
		fillType,
		fillStrategyType,
		drawType,
	) {
		super(shapeManager, 0, gridY, delay, fillType, fillStrategyType, drawType);

		// Store Unique Parameters
		this.TEXT = text;

		// Create Shape
		this.#createShape();
	}

	// ____________________________________________________________ Create Shape

	#createShape() {
		// Get Constants
		const GLYPH_SPACING_X = DirectableDotMatrixConstants.getGlyphSpacingX();
		const GLYPH_DELAY = DirectableDotMatrixConstants.getGlyphDelay();

		// Get Grid Data
		const GRID_WIDTH_IN_CELLS = GridData.getGridWidthInCells();

		// Start at Grid X Position
		let gridX = 0;

		// Calculate Total Width of Text
		for (let i = 0; i < this.TEXT.length; i += 1) {
			// Get Glyph Name
			const GLYPH_NAME = this.TEXT[i].toUpperCase();

			// Get Glyph Width
			const GLYPH_WIDTH = this.SHAPE_MANAGER.getShapeGlyphWidth(GLYPH_NAME);

			// Increment Current Grid X Position
			gridX += GLYPH_WIDTH + GLYPH_SPACING_X;
		}

		// Remove Last Glyph Spacing
		gridX -= GLYPH_SPACING_X;

		// Center Glyphs
		gridX = Math.floor((GRID_WIDTH_IN_CELLS - gridX + GLYPH_SPACING_X) / 2);

		// Store Grid X Centered Start
		this.gridXCenteredStart = gridX;

		// Add Letter Shapes through Text
		for (let i = 0; i < this.TEXT.length; i += 1) {
			// Get Glyph Name
			const GLYPH_NAME = this.TEXT[i].toUpperCase();

			// Create Shape Glyph
			const SHAPE = this.SHAPE_MANAGER.addShapeGlyph(
				GLYPH_NAME,
				gridX,
				this.GRID_Y,
				this.DELAY + i * GLYPH_DELAY,
				this.FILL_TYPE,
				this.FILL_STRATEGY_TYPE,
				this.DRAW_TYPE,
			);

			// Store
			this.SHAPES.push(SHAPE);

			// Increment Current Grid X Position
			gridX += SHAPE.getGlyphWidth() + GLYPH_SPACING_X;
		}

		// Remove Last Glyph Spacing
		gridX -= GLYPH_SPACING_X;

		// Store Grid Width
		this.gridWidth = gridX - this.gridXCenteredStart;
	}

	// __________________________________________________________________ Access

	getGridXCenteredStart() {
		return this.gridXCenteredStart;
	}

	getGridWidth() {
		return this.gridWidth;
	}
}
