export default class DirectableDotMatrixDelays {
	// _________________________________________________________ Page Transition

	static #DELAY_PAGE_TRANSITION = 120;

	static getDelayPageTransition() {
		return this.#DELAY_PAGE_TRANSITION;
	}

	// __________________________________________________________ Glyph Position

	// TODO Transition Type

	static getDelayFromGridPosition(gridX, gridY) {
		const DELAY = gridX * 1 + gridY * 1;

		return Math.floor(DELAY);
	}
}
