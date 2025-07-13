export default class DirectableDotMatrixConstants {
	// ___________________________________________________________________ Glyph

	static #CHARACTER_HEIGHT = 5;

	static getCharacterHeight() {
		return this.#CHARACTER_HEIGHT;
	}

	// _________________________________________________________________________

	static #LINE_HEIGHT = 7;

	static getLineHeight() {
		return this.#LINE_HEIGHT;
	}

	// _________________________________________________________________________

	static #GLYPH_SPACING_X = 1;

	static getGlyphSpacingX() {
		return this.#GLYPH_SPACING_X;
	}

	// ___________________________________________________________________ Delay

	static #GLYPH_DELAY = 3;

	static getGlyphDelay() {
		return this.#GLYPH_DELAY;
	}

	// ______________________________________________________________ Responsive

	static #BLOCK_WIDTH_MOBILE = 130;

	static getBlockWidthMobile() {
		return this.#BLOCK_WIDTH_MOBILE;
	}
}
