import GridData from '../../../../grid/GridData.js';

import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import Component from '../Component.js';

export default class ComponentTextBox extends Component {
	#SHAPES_GLYPH = [];

	// Unique Parameters
	TEXT;
	GRID_WIDTH;
	GRID_HEIGHT;

	// _________________________________________________________________________

	constructor(
		shapeManager,
		text,
		gridX,
		gridY,
		gridWidth,
		gridHeight,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		super(shapeManager, gridX, gridY, fillType, fillStrategyType);

		// Store
		this.TEXT = text;
		this.GRID_WIDTH = gridWidth;
		this.GRID_HEIGHT = gridHeight;

		// Create Shape
		this.#createShape(text, gridWidth, gridHeight);
	}

	// ____________________________________________________________ Create Shape

	#createShape() {
		let currentGridX = this.GRID_X;

		// Add Letter Shapes through Text
		for (let i = 0; i < this.TEXT.length; i += 1) {
			const GLYPH_NAME = this.TEXT[i].toUpperCase();
			const METHOD_NAME = `addShapeGlyph_${GLYPH_NAME}`;

			// TODO Hardcoded Grid Spacing
			const GRID_SPACING_X = 1;

			let glyph;

			// Check if method exists before calling
			if (typeof this.SHAPE_MANAGER[METHOD_NAME] === 'function') {
				// Create Glyph Shape
				glyph = this.SHAPE_MANAGER[METHOD_NAME](
					currentGridX,
					this.GRID_Y,
					this.FILL_TYPE,
					this.FILL_STRATEGY_TYPE,
				);

				// Store
				if (glyph !== undefined) {
					this.#SHAPES_GLYPH.push(glyph);
				}

				// Increment Current Grid X Position
				currentGridX += glyph.getGlyphWidth() + GRID_SPACING_X;
			}

			if (GLYPH_NAME === ' ') {
				// Space character - just advance the position by 3 units
				// TODO Hard Coded Grid Space Width
				currentGridX += 3;
			}
		}
	}

	// __________________________________________________________________ Redraw

	redraw() {
		// Remove Existing Shape
		for (let i = 0; i < this.#SHAPES_GLYPH.length; i += 1) {
			this.SHAPE_MANAGER.removeShape(this.#SHAPES_GLYPH[i]);
		}

		// Create Shape
		this.#createShape();
	}
}
