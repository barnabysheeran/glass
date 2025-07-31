import GridData from '../../grid/GridData.js';

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

	// ___________________________________________________________________ Media

	static #MEDIA_MARGIN_TOP_IN_LINES = 6;

	static getMediaMarginTopInLines() {
		return this.#MEDIA_MARGIN_TOP_IN_LINES;
	}

	static getMediaMarginTopInGridCells() {
		return this.#MEDIA_MARGIN_TOP_IN_LINES * this.#LINE_HEIGHT_IN_GRID_CELLS;
	}

	static getMediaHeightInLines(aspectRatioString = '16:9') {
		const DISPLAY_WIDTH_IN_GRID_CELLS = GridData.getGridWidthInCells();

		const [widthRatio, heightRatio] = aspectRatioString.split(':').map(Number);

		const RATIO = widthRatio / heightRatio;

		return Math.ceil(
			DISPLAY_WIDTH_IN_GRID_CELLS / RATIO / this.#LINE_HEIGHT_IN_GRID_CELLS,
		);
	}

	static getMediaHeightInGridCells() {
		return this.getMediaHeightInLines() * this.#LINE_HEIGHT_IN_GRID_CELLS;
	}

	static getMediaBottomInLines() {
		return this.getMediaMarginTopInLines() + this.getMediaHeightInLines();
	}

	static getMediaBottomInGridCells() {
		return this.getMediaBottomInLines() * this.#LINE_HEIGHT_IN_GRID_CELLS;
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

	// ___________________________________________________ Delay Page Transition

	// TODO Move to Views

	static #DELAY_PAGE_TRANSITION = 60;

	static getDelayPageTransition() {
		return this.#DELAY_PAGE_TRANSITION;
	}

	// _____________________________________________________ DelayGlyph Position

	// TODO Transition Type

	static getDelayFromGridPosition(gridX, gridY) {
		// Remove Header

		const DELAY = gridX * 1 + gridY * 1;

		return Math.floor(DELAY);
	}
}
