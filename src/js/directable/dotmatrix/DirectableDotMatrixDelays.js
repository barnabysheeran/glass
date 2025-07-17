export default class DirectableDotMatrixDelays {
	// _________________________________________________________ Page Transition

	// TODO Move to Views

	static #DELAY_PAGE_TRANSITION = 60;

	static getDelayPageTransition() {
		return this.#DELAY_PAGE_TRANSITION;
	}

	// __________________________________________________________ Glyph Position

	// TODO Transition Type

	static getDelayFromGridPosition(gridX, gridY) {
		// Remove Header

		const DELAY = gridX * 1 + gridY * 1;

		return Math.floor(DELAY);
	}
}
