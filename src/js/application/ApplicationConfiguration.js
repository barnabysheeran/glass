export default class ApplicationConfiguration {
	static #applicationContainer;
	static #assetPath;
	static #isDebug;

	// _________________________________________________________________________

	static initialise(creationParameters) {
		// Store
		this.#applicationContainer = creationParameters.applicationContainer;
		this.#assetPath = creationParameters.assetPath;
		this.#isDebug = creationParameters.isDebug;
	}

	// ___________________________________________________ Application Container

	static getApplicationContainer() {
		return this.#applicationContainer;
	}

	// ______________________________________________________________ Asset Path

	static getAssetPath() {
		return this.#assetPath;
	}

	// ________________________________________________________________ Is Debug

	static isDebug() {
		return this.#isDebug;
	}
}
