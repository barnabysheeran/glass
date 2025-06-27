import ApplicationLogger from './ApplicationLogger.js';

export default class ApplicationConfiguration {
	static #applicationContainer;
	static #assetPath;
	static #isDebug = false;

	static #LOG_LEVEL = 1;

	// _________________________________________________________________________

	static initialise(creationParameters, isDebug) {
		ApplicationLogger.log('ApplicationConfiguration', this.#LOG_LEVEL);

		// Store
		this.#applicationContainer = creationParameters.applicationContainer;
		this.#assetPath = creationParameters.assetPath;

		// Set Debug
		this.isDebug = isDebug;
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

	static set isDebug(value) {
		this.#isDebug = value;
	}

	static get isDebug() {
		return this.#isDebug;
	}
}
