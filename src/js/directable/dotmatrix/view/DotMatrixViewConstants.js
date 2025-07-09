export default class DotMatrixViewConstants {
	static #LINE_HEIGHT = 7;
	static #CHARACTER_HEIGHT = 5;

	static getLineHeight() {
		return this.#LINE_HEIGHT;
	}

	static getCharacterHeight() {
		return this.#CHARACTER_HEIGHT;
	}
}
