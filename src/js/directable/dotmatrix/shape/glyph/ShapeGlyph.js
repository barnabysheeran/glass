import ApplicationLogger from '../../../../application/ApplicationLogger.js';

import Shape from '../Shape.js';

import FillType from '../fill/FillType.js';
import FillStrategyType from '../fill/FillStrategyType.js';
import Fill from '../fill/Fill.js';
import FillStrategy from '../fill/FillStrategy.js';

export default class ShapeGlyph extends Shape {
	#positionGridGlyphs = [];
	#glyphWidth = 0;
	#glyphHeight = 0;

	#LOG_LEVEL = -1; // 6;

	// _________________________________________________________________________

	constructor(
		dotManager,
		gridX,
		gridY,
		glyphData,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
		delay = 0,
	) {
		super(dotManager, delay);

		ApplicationLogger.log(`ShapeGlyph`, this.#LOG_LEVEL);

		// Get Glyph Data
		this.#positionGridGlyphs = glyphData.points;
		this.#glyphWidth = glyphData.width;
		this.#glyphHeight = glyphData.height;

		// Store Initial Position Grids
		for (let y = 0; y < this.#glyphHeight; y += 1) {
			for (let x = 0; x < this.#glyphWidth; x += 1) {
				if (this.getIsFilled(x, y)) {
					this.positionGrids.push([gridX + x, gridY + y]);
				}
			}
		}

		// Fill Type
		Fill.apply(fillType, this.positionGrids);

		// Fill Strategy Type
		FillStrategy.apply(fillStrategyType, this.positionGrids);
	}

	getIsFilled(x, y) {
		// Check bounds
		if (y < 0 || y >= this.#glyphHeight || x < 0 || x >= this.#glyphWidth) {
			return false;
		}

		return this.#positionGridGlyphs[y][x] === 1;
	}

	getGlyphWidth() {
		return this.#glyphWidth;
	}

	getGlyphHeight() {
		return this.#glyphHeight;
	}
}
