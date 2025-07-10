import ApplicationLogger from '../../../application/ApplicationLogger.js';

import FillType from './fill/FillType.js';
import FillStrategyType from './fill/FillStrategyType.js';

import ShapeLineHorizontal from './line/ShapeLineHorizontal.js';
import ShapeRectangle from './primative/ShapeRectangle.js';

import SHAPE_GLYPH_DATA from './glyph/ShapeGlyphData.js';
import ShapeGlyph from './glyph/ShapeGlyph.js';

export default class ShapeManager {
	#DOT_MANAGER;

	#SHAPES = [];

	#LOG_LEVEL = -1; // 4;

	// _________________________________________________________________________

	constructor(dotManager) {
		ApplicationLogger.log('ShapeManager', this.#LOG_LEVEL);

		// Store
		this.#DOT_MANAGER = dotManager;
	}

	// ___________________________________________________________________ Reset

	reset() {
		ApplicationLogger.log('ShapeManager reset', this.#LOG_LEVEL);

		// Clear Shapes Array
		this.#SHAPES = [];
	}

	// __________________________________________________________________ Remove

	removeShape(shapeId) {
		ApplicationLogger.log(
			`ShapeManager removeShape ${shapeId}`,
			this.#LOG_LEVEL,
		);

		// Find Index by ID
		for (let i = 0; i < this.#SHAPES.length; i += 1) {
			if (this.#SHAPES[i].getShapeId() === shapeId) {
				// Remove Shape
				this.#SHAPES.splice(i, 1);

				ApplicationLogger.log(` - removed ${shapeId}`, this.#LOG_LEVEL);

				return true;
			}
		}
	}

	// _________________________________________________________ Line Horizontal

	addShapeLineHorizontal(
		gridX,
		gridY,
		length,
		delay = 0,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		// Create Shape
		const SHAPE = new ShapeLineHorizontal(
			this.#DOT_MANAGER,
			gridX,
			gridY,
			length,
			delay,
			fillType,
			fillStrategyType,
		);

		// Store
		this.#SHAPES.push(SHAPE);

		// Return
		return SHAPE;
	}

	// _______________________________________________________________ Rectangle

	addShapeRectangle(
		gridX,
		gridY,
		gridWidth,
		gridHeight,
		delay = 0,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		// Create Shape
		const SHAPE = new ShapeRectangle(
			this.#DOT_MANAGER,
			gridX,
			gridY,
			gridWidth,
			gridHeight,
			delay,
			fillType,
			fillStrategyType,
		);

		// Store
		this.#SHAPES.push(SHAPE);

		// Return
		return SHAPE;
	}

	// ___________________________________________________________________ Glyph

	addShapeGlyph(
		character,
		gridX,
		gridY,
		delay = 0,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		const upperChar = character.toUpperCase();
		const glyphData = SHAPE_GLYPH_DATA[upperChar];

		if (!glyphData) {
			ApplicationLogger.warn(
				`ShapeManager addShapeGlyph Unknown character '${character}'`,
				this.#LOG_LEVEL,
			);
			return null;
		}

		ApplicationLogger.log(
			`ShapeManager addShapeGlyph ${upperChar}`,
			this.#LOG_LEVEL,
		);

		// Create Shape
		const SHAPE = new ShapeGlyph(
			this.#DOT_MANAGER,
			gridX,
			gridY,
			glyphData,
			delay,
			fillType,
			fillStrategyType,
		);

		// Store
		this.#SHAPES.push(SHAPE);

		// Return
		return SHAPE;
	}

	#getShapeGlyphData(character) {
		const upperChar = character.toUpperCase();
		const glyphData = SHAPE_GLYPH_DATA[upperChar];

		if (!glyphData) {
			ApplicationLogger.warn(
				`ShapeManager getShapeGlyphData Unknown character '${character}'`,
				this.#LOG_LEVEL,
			);
			return null;
		}

		return glyphData;
	}

	getShapeGlyphWidth(character) {
		const glyphData = this.#getShapeGlyphData(character);

		if (!glyphData) {
			return 0;
		}

		return glyphData.points[0].length;
	}

	getShapeGlyphHeight(character) {
		const glyphData = this.#getShapeGlyphData(character);

		if (!glyphData) {
			return 0;
		}

		return glyphData.points.length;
	}
}
