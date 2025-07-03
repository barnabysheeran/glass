import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import Component from '../Component.js';

import ComponentGlyphConstants from './ComponentGlyphConstants.js';

export default class ComponentGlyphBox extends Component {
	#SHAPES = [];

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
		delay,
	) {
		super(shapeManager, gridX, gridY, fillType, fillStrategyType, delay);

		// Store
		this.TEXT = text;
		this.GRID_WIDTH = gridWidth;
		this.GRID_HEIGHT = gridHeight;

		// Create Shape
		this.#createShape(text, gridWidth, gridHeight);
	}

	// ____________________________________________________________ Create Shape

	#createShape() {
		// Get Constants
		const GLYPH_SPACING_X = ComponentGlyphConstants.GLYPH_SPACING_X;
		const GLYPH_DELAY = ComponentGlyphConstants.GLYPH_DELAY;

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
				this.FILL_TYPE,
				this.FILL_STRATEGY_TYPE,
				this.DELAY + i * GLYPH_DELAY,
			);

			// Store
			this.#SHAPES.push(SHAPE);

			// Increment Current Grid X Position
			currentGridX += SHAPE.getGlyphWidth() + GLYPH_SPACING_X;
		}
	}

	// ____________________________________________________________________ Tick

	tick() {
		// Tick Shapes
		for (let i = 0; i < this.#SHAPES.length; i += 1) {
			this.#SHAPES[i].tick();
		}
	}

	// _________________________________________________________________ Destroy

	destroy() {
		// Clear Shapes
		this.#SHAPES = [];
	}
}
