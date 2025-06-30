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
			// Get Glyph Name
			const GLYPH_NAME = this.TEXT[i].toUpperCase();
			// TODO Hardcoded Grid Spacing
			const GRID_SPACING_X = 1;

			if (GLYPH_NAME === ' ') {
				// Space
				// TODO Hard Coded Grid Space Width
				currentGridX += 3;
			} else {
				// Create Shape Glyph
				const SHAPE_GLYPH = this.SHAPE_MANAGER.addShapeGlyph(
					GLYPH_NAME,
					currentGridX,
					this.GRID_Y,
					this.FILL_TYPE,
					this.FILL_STRATEGY_TYPE,
				);

				// Store
				this.#SHAPES_GLYPH.push(SHAPE_GLYPH);

				// Increment Current Grid X Position
				currentGridX += SHAPE_GLYPH.getGlyphWidth() + GRID_SPACING_X;
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
