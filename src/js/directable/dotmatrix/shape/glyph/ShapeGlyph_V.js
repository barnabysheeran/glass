import ApplicationLogger from '../../../../application/ApplicationLogger.js';
import { vec2 } from 'gl-matrix';

import Shape from '../Shape.js';
import FillType from '../fill/FillType.js';
import FillStrategyType from '../fill/FillStrategyType.js';
import Fill from '../fill/Fill.js';
import FillStrategy from '../fill/FillStrategy.js';

export default class ShapeGlyph_V extends Shape {
	#LOG_LEVEL = 6;

	/* eslint-disable */
    #positionGridGlyphs = [
        vec2.fromValues(0, 0),                                                               vec2.fromValues(4, 0),
        vec2.fromValues(0, 1),                                                               vec2.fromValues(4, 1),
        vec2.fromValues(0, 2),                                                               vec2.fromValues(4, 2),
                               vec2.fromValues(1, 3),                        vec2.fromValues(3, 3),
                                               vec2.fromValues(2, 4),
    ];
    /* eslint-enable */

	#glyphWidth = 5;
	#glyphHeight = 5;

	// _________________________________________________________________________

	constructor(
		dotManager,
		gridX,
		gridY,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		super(dotManager);

		ApplicationLogger.log(`ShapeGlyph_V`, this.#LOG_LEVEL);

		// Store Initial Position Grids
		for (let x = 0; x < this.#glyphWidth; x += 1) {
			for (let y = 0; y < this.#glyphHeight; y += 1) {
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

	// _________________________________________________________________________

	getIsFilled(x, y) {
		let isFilled = false;

		for (let i = 0; i < this.#positionGridGlyphs.length; i += 1) {
			if (
				this.#positionGridGlyphs[i][0] === x &&
				this.#positionGridGlyphs[i][1] === y
			) {
				console.log(`getIsFilled: x: ${x}, y: ${y}`);

				isFilled = true;
				break;
			}
		}

		return isFilled;
	}

	// __________________________________________________________________ Access

	getGlyphWidth() {
		return this.#glyphWidth;
	}

	getGlyphHeight() {
		return this.#glyphHeight;
	}
}
