import GridData from '../../../../grid/GridData.js';

import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import Component from '../Component.js';

import ComponentGlyphConstants from './ComponentGlyphConstants.js';

export default class ComponentGlyphLineCentered extends Component {
	#SHAPES = [];

	// Unique Parameters
	TEXT;

	// _________________________________________________________________________

	constructor(
		shapeManager,
		text,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
		delay,
	) {
		super(shapeManager, 0, gridY, fillType, fillStrategyType, delay);

		// Store
		this.TEXT = text;

		// Create Shape
		this.#createShape();
	}

	// ____________________________________________________________ Create Shape

	#createShape() {
		// Get Constants
		const GLYPH_SPACING_X = ComponentGlyphConstants.GLYPH_SPACING_X;
		const GLYPH_DELAY = ComponentGlyphConstants.GLYPH_DELAY;

		// Get Grid Data
		const GRID_MAX = GridData.getGridMax();
		const GRID_MAX_WIDTH = GRID_MAX[0];

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
		gridX = Math.floor((GRID_MAX_WIDTH - gridX + GLYPH_SPACING_X) / 2);

		// Add Letter Shapes through Text
		for (let i = 0; i < this.TEXT.length; i += 1) {
			// Get Glyph Name
			const GLYPH_NAME = this.TEXT[i].toUpperCase();

			// Create Shape Glyph
			const SHAPE = this.SHAPE_MANAGER.addShapeGlyph(
				GLYPH_NAME,
				gridX,
				this.GRID_Y,
				this.FILL_TYPE,
				this.FILL_STRATEGY_TYPE,
				this.DELAY + i * GLYPH_DELAY,
			);

			// Store
			this.#SHAPES.push(SHAPE);

			// Increment Current Grid X Position
			gridX += SHAPE.getGlyphWidth() + GLYPH_SPACING_X;
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
