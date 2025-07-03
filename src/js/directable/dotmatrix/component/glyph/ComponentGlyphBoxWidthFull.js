import GridData from '../../../../grid/GridData.js';

import FillType from '../../shape/fill/FillType.js';
import FillStrategyType from '../../shape/fill/FillStrategyType.js';

import Component from '../Component.js';

import ComponentGlyphConstants from './ComponentGlyphConstants.js';

export default class ComponentGlyphBoxWidthFull extends Component {
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

		// Get Grid Data
		const GRID_MAX = GridData.getGridMax();
		const GRID_MAX_WIDTH = GRID_MAX[0];

		// Build Text Pattern
		let TEXT_PATTERN = '';

		// Add Characters to Text Pattern Stopping Before Grid Width
		let textIndex = 0;
		let currentWidth = 0;

		while (currentWidth < GRID_MAX_WIDTH) {
			// Get Text Character at Current Index
			const TEXT_CHAR = this.TEXT[textIndex];

			// Get Glyph Width
			const GLYPH_WIDTH = this.SHAPE_MANAGER.getShapeGlyphData(TEXT_CHAR).width;

			if (currentWidth + GLYPH_WIDTH > GRID_MAX_WIDTH) {
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
}
