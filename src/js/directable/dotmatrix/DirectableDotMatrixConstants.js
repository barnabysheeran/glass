export default class DirectableDotMatrixConstants {
	// ____________________________________________________________________ Line

	static #LINE_HEIGHT_IN_GRID_CELLS = 7;

	static getLineHeightInGridCells() {
		return this.#LINE_HEIGHT_IN_GRID_CELLS;
	}

	// __________________________________________________________________ Header

	static #HEADER_HEIGHT_IN_LINES = 5;

	static getHeaderHeightInLines() {
		return this.#HEADER_HEIGHT_IN_LINES;
	}

	static getHeaderHeightInGridCells() {
		return this.#HEADER_HEIGHT_IN_LINES * this.#LINE_HEIGHT_IN_GRID_CELLS;
	}

	// ____________________________________________________________ Media Header

	static #MEDIA_HEADER_HEIGHT_IN_LINES = 6;

	static getMediaHeaderHeightInLines() {
		return this.#MEDIA_HEADER_HEIGHT_IN_LINES;
	}

	static getMediaHeaderHeightInGridCells() {
		return this.#MEDIA_HEADER_HEIGHT_IN_LINES * this.#LINE_HEIGHT_IN_GRID_CELLS;
	}

	// __________________________________________________________________ Footer

	static #FOOTER_HEIGHT_IN_LINES = 7;

	static getFooterHeightInLines() {
		return this.#FOOTER_HEIGHT_IN_LINES;
	}

	static getFooterHeightInGridCells() {
		return this.#FOOTER_HEIGHT_IN_LINES * this.#LINE_HEIGHT_IN_GRID_CELLS;
	}

	// ___________________________________________________________________ Glyph

	static #CHARACTER_HEIGHT = 5;

	static getCharacterHeight() {
		return this.#CHARACTER_HEIGHT;
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
