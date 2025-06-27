import ApplicationLogger from '../../../application/ApplicationLogger.js';
import GridData from '../grid/GridData.js';

import FillType from '../shape/fill/FillType.js';
import FillStrategyType from '../shape/fill/FillStrategyType.js';

export default class ViewTextTest {
	#SHAPE_MANAGER;

	#LOG_LEVEL = 5;
	#CHAR_SPACING = 1; // Additional spacing between characters

	#CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	#MAX_LINE_LENGTH = 20; // Increased for wider text lines

	// _________________________________________________________________________

	constructor(shapeManager) {
		ApplicationLogger.log('ViewTest', this.#LOG_LEVEL);

		// Store
		this.#SHAPE_MANAGER = shapeManager;

		// Line with letters
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

		// Line with numbers
		this.addTextLine(
			'0123456789',
			10,
			33,
			FillType.PassThrough,
			FillStrategyType.Reverse,
		);

		// Mixed line
		this.addTextLine(
			'HELLO WORLD',
			10,
			39,
			FillType.Random,
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

			// Process letters A-Z
			if (char >= 'A' && char <= 'Z') {
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
			}
			// Process numbers 0-9
			else if (char >= '0' && char <= '9') {
				const methodName = `addShapeGlyph_${char}`;

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
						`No glyph defined for digit: ${char}`,
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

	// ____________________________________________________________ Random Text

	#generateRandomText(length = 20) {
		let result = '';
		const charactersLength = this.#CHARACTERS.length;

		for (let i = 0; i < length; i++) {
			result += this.#CHARACTERS.charAt(
				Math.floor(Math.random() * charactersLength),
			);
		}

		return result;
	}

	#randomFillTypeIndex = 0;
	#getRandomFillType() {
		const fillType = [
			FillType.PassThrough,
			FillType.Random,
			FillType.Solid,
			FillType.None,
		];

		this.#randomFillTypeIndex =
			(this.#randomFillTypeIndex + 1) % fillType.length;

		return fillType[this.#randomFillTypeIndex];
	}

	#randomFillStrategyTypeIndex = 0;
	#getRandomFillStrategyType() {
		const fillStrategyType = [
			FillStrategyType.PassThrough,
			FillStrategyType.Reverse,
			FillStrategyType.Random,
		];

		this.#randomFillStrategyTypeIndex =
			(this.#randomFillStrategyTypeIndex + 1) % fillStrategyType.length;

		return fillStrategyType[this.#randomFillStrategyTypeIndex];
	}

	// ____________________________________________________________________ tick

	tick() {
		// Shape Manager
		this.#SHAPE_MANAGER.tick();
	}
}
