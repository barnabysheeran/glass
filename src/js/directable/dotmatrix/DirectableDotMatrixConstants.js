export default class DirectableDotMatrixConstants {
	static #LINE_HEIGHT = 7;

	static getLineHeight() {
		return this.#LINE_HEIGHT;
	}

	static #CHARACTER_HEIGHT = 5;

	static getCharacterHeight() {
		return this.#CHARACTER_HEIGHT;
	}

	static #GLYPH_SPACING_X = 1;

	static getGlyphSpacingX() {
		return this.#GLYPH_SPACING_X;
	}

	static #GLYPH_DELAY = 2;

	static getGlyphDelay() {
		return this.#GLYPH_DELAY;
	}
}
