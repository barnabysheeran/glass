import ApplicationLogger from './ApplicationLogger.js';

export default class ApplicationConfiguration {
	static #applicationContainer;
	static #assetPath;
	static #isDevelopment = false;

	static #LOG_LEVEL = -1;

	// _________________________________________________________________________

	static initialise(creationParameters, isDevelopment) {
		ApplicationLogger.log('ApplicationConfiguration', this.#LOG_LEVEL);

		// Store
		this.#applicationContainer = creationParameters.applicationContainer;
		this.#assetPath = creationParameters.assetPath;

		// Set Debug
		this.isDevelopment = isDevelopment;
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

	static set isDevelopment(value) {
		this.#isDevelopment = value;
	}

	static get isDevelopment() {
		return this.#isDevelopment;
	}
}
