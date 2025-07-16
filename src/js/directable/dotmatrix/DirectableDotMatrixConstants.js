export default class DirectableDotMatrixConstants {
	// __________________________________________________________________ Header

	static #LINE_HEIGHT_HEADER = 6;

	static getLineHeightHeader() {
		return this.#LINE_HEIGHT_HEADER;
	}

	static #LINE_HEIGHT_FOOTER = 7;

	static getLineHeightFooter() {
		return this.#LINE_HEIGHT_FOOTER;
	}

	// ___________________________________________________________________ Glyph

	static #CHARACTER_HEIGHT = 5;

	static getCharacterHeight() {
		return this.#CHARACTER_HEIGHT;
	}

	// _________________________________________________________________________

	static #LINE_HEIGHT = 8;

	static getLineHeight() {
		return this.#LINE_HEIGHT;
	}

	// _________________________________________________________________________

	static #GLYPH_SPACING_X = 1;

	static getGlyphSpacingX() {
		return this.#GLYPH_SPACING_X;
	}

	// ______________________________________________________________ Responsive

	static #BLOCK_WIDTH_MOBILE = 130;

	static getBlockWidthMobile() {
		return this.#BLOCK_WIDTH_MOBILE;
	}
}
