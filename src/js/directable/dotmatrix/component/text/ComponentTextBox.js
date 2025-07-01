import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import Component from '../Component.js';

export default class ComponentTextBox extends Component {
	#SHAPES = [];

	// Unique Parameters
	TEXT;
	GRID_WIDTH;
	GRID_HEIGHT;

	// _________________________________________________________________________

	constructor(
		shapeManager,
		dotManager,
		text,
		gridX,
		gridY,
		gridWidth,
		gridHeight,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
		delay,
	) {
		super(
			shapeManager,
			dotManager,
			gridX,
			gridY,
			fillType,
			fillStrategyType,
			delay,
		);

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
				// TODO Hardcoded Delay Increment

				const SHAPE_GLYPH = new 

				// Create Shape Glyph
				// const SHAPE = this.SHAPE_MANAGER.addShapeGlyph(
				// 	GLYPH_NAME,
				// 	currentGridX,
				// 	this.GRID_Y,
				// 	this.FILL_TYPE,
				// 	this.FILL_STRATEGY_TYPE,
				// 	this.DELAY + i * 2, // Delay for each glyph
				// );

				// Store
				// this.#SHAPES.push(SHAPE);

				// Increment Current Grid X Position
				currentGridX += SHAPE.getGlyphWidth() + GRID_SPACING_X;
			}
		}
	}
}
