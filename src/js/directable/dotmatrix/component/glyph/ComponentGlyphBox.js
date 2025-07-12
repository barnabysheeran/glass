import ApplicationLogger from '../../../../application/ApplicationLogger.js';

import Component from '../Component.js';

import DirectableDotMatrixConstants from '../../DirectableDotMatrixConstants.js';

export default class ComponentGlyphBox extends Component {
	// Unique Parameters
	TEXT;
	GRID_WIDTH;
	GRID_HEIGHT;

	#LOG_LEVEL = 3;

	// _________________________________________________________________________

	constructor(
		shapeManager,
		text,
		gridX,
		gridY,
		gridWidth,
		gridHeight,
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
		this.GRID_WIDTH = gridWidth;
		this.GRID_HEIGHT = gridHeight;

		// Create Shape
		this.#createShape();
	}

	// ____________________________________________________________ Create Shape

	#createShape() {
		// Get Constants
		const GLYPH_SPACING_X = DirectableDotMatrixConstants.getGlyphSpacingX();
		const GLYPH_DELAY = DirectableDotMatrixConstants.getGlyphDelay();

		// Start at Grid X Position
		let currentGridX = this.GRID_X;

		// Add Letter Shapes through Text
		for (let i = 0; i < this.TEXT.length; i += 1) {
			// Get Glyph Name
			const GLYPH_NAME = this.TEXT[i].toUpperCase();

			// Create Shape Glyph
			const SHAPE = this.SHAPE_MANAGER.addShapeGlyph(
				GLYPH_NAME,
				currentGridX,
				this.GRID_Y,
				this.DELAY + i * GLYPH_DELAY,
				this.FILL_TYPE,
				this.FILL_STRATEGY_TYPE,
			);

			if (SHAPE) {
				// Store
				this.SHAPES.push(SHAPE);

				// Increment Current Grid X Position
				currentGridX += SHAPE.getGlyphWidth() + GLYPH_SPACING_X;
			} else {
				ApplicationLogger.warn(
					`ComponentGlyphBox Glyph '${GLYPH_NAME}' not found`,
					this.#LOG_LEVEL,
				);
			}
		}
	}
}
