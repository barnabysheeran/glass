import ApplicationLogger from '../../../application/ApplicationLogger.js';

import FillType from '../shape/fill/FillType.js';
import FillStrategyType from '../shape/fill/FillStrategyType.js';

export default class ViewTextTest {
	#SHAPE_MANAGER;

	#LOG_LEVEL = 5;
	#CHAR_SPACING = 1; // Additional spacing between characters

	// _________________________________________________________________________

	constructor(shapeManager) {
		ApplicationLogger.log('ViewTest', this.#LOG_LEVEL);

		// Store
		this.#SHAPE_MANAGER = shapeManager;

		// Line
		this.addTextLine(
			'ABCDEFGHIJKLMNO',
			10,
			21,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);

		this.addTextLine(
			'PQRSTUVWXYZ',
			10,
			27,
			FillType.PassThrough,
			FillStrategyType.PassThrough,
		);
	}

	addTextLine(
		text,
		gridX = 0,
		gridY = 0,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
	) {
		ApplicationLogger.log(`addTextLine: ${text}`, this.#LOG_LEVEL);

		// Convert text to uppercase since we only have uppercase glyphs
		const upperText = text.toUpperCase();

		let currentX = gridX;

		// Iterate through each character
		for (let i = 0; i < upperText.length; i += 1) {
			const char = upperText[i];

			// Only process letters A-Z
			if (char >= 'A' && char <= 'Z') {
				// Get the method name for the character
				const methodName = `addShapeGlyph_${char}`;

				// Check if the method exists in the shape manager
				if (this.#SHAPE_MANAGER[methodName]) {
					// Add the glyph at the current position
					const glyph = this.#SHAPE_MANAGER[methodName](
						currentX,
						gridY,
						fillType,
						fillStrategyType,
					);

					// Advance position based on glyph's actual width plus spacing
					currentX += glyph.getGlyphWidth() + this.#CHAR_SPACING;
				} else {
					ApplicationLogger.log(
						`No glyph defined for character: ${char}`,
						this.#LOG_LEVEL,
					);
				}
			} else if (char === ' ') {
				// Space character - just advance the position by 3 units
				currentX += 3;
			} else {
				ApplicationLogger.log(
					`Unsupported character: ${char}`,
					this.#LOG_LEVEL,
				);
			}
		}
	}

	// ____________________________________________________________________ tick

	tick() {
		// Shape Manager
		this.#SHAPE_MANAGER.tick();
	}
}
