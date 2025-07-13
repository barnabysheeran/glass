import GridData from '../../../../grid/GridData.js';

import Component from '../Component.js';

import DirectableDotMatrixConstants from '../../DirectableDotMatrixConstants.js';
import DirectableDotMatrixDelays from '../../DirectableDotMatrixDelays.js';

export default class ComponentGlyphBoxWidthFull extends Component {
	// Unique Parameters
	TEXT;

	// _________________________________________________________________________

	constructor(
		shapeManager,
		text,
		gridX,
		gridY,
		delay,
		fillType,
		fillStrategyType,
		drawType,
	) {
		super(
			shapeManager,
			gridX,
			gridY,
			delay,
			fillType,
			fillStrategyType,
			drawType,
		);

		// Store Unique Parameters
		this.TEXT = text;

		// Create Shape
		this.#createShape();
	}

	// ____________________________________________________________ Create Shape

	#createShape() {
		// Get Constants
		const GLYPH_SPACING_X = DirectableDotMatrixConstants.getGlyphSpacingX();
		const GLYPH_DELAY = DirectableDotMatrixDelays.getGlyphDelay();

		// Get Grid Data
		const GRID_WIDTH_IN_CELLS = GridData.getGridWidthInCells();

		// Build Text Pattern
		let TEXT_PATTERN = '';

		// Add Characters to Text Pattern Stopping Before Grid Width
		let textIndex = 0;
		let currentWidth = 0;

		while (currentWidth < GRID_WIDTH_IN_CELLS) {
			// Get Text Character at Current Index
			const TEXT_CHAR = this.TEXT[textIndex];

			// Get Glyph Width
			const GLYPH_WIDTH = this.SHAPE_MANAGER.getShapeGlyphWidth(TEXT_CHAR);

			if (currentWidth + GLYPH_WIDTH > GRID_WIDTH_IN_CELLS) {
				break;
			}

			// Add Character to Text Pattern
			TEXT_PATTERN += TEXT_CHAR;

			// Increment current width by Glyph Width and Spacing
			currentWidth += GLYPH_WIDTH + GLYPH_SPACING_X;

			// Next Text Index
			textIndex += 1;

			// If Text Index Exceeds Text Length, Reset to Start
			if (textIndex >= this.TEXT.length) {
				textIndex = 0;
			}
		}

		// Start at Grid X Position
		let currentGridX = this.GRID_X;

		// Add Letter Shapes through Text
		for (let i = 0; i < TEXT_PATTERN.length; i += 1) {
			// Get Glyph Name
			const GLYPH_NAME = TEXT_PATTERN[i].toUpperCase();

			// Create Shape Glyph
			const SHAPE = this.SHAPE_MANAGER.addShapeGlyph(
				GLYPH_NAME,
				currentGridX,
				this.GRID_Y,
				this.DELAY + i * GLYPH_DELAY,
				this.FILL_TYPE,
				this.FILL_STRATEGY_TYPE,
				this.DRAW_TYPE,
			);

			// Store
			this.SHAPES.push(SHAPE);

			// Increment Current Grid X Position
			currentGridX += SHAPE.getGlyphWidth() + GLYPH_SPACING_X;
		}
	}
}
