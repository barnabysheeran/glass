import ApplicationLogger from './ApplicationLogger.js';

export default class ApplicationConfiguration {
	static #applicationContainer;
	static #assetPath;
	static #isDebug;

	static #LOG_LEVEL = 1;

	// _________________________________________________________________________

	static initialise(creationParameters) {
		ApplicationLogger.log('ApplicationConfiguration', this.#LOG_LEVEL);

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
