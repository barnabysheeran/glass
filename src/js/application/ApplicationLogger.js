export default class ApplicationLogger {
	static #isActive = true; // Default true for initial version console output

	static #colourLog = '#999';

	// _________________________________________________________________________

	static initialise(creationParameters) {
		// Set Active from creationParameters isDebug
		this.#isActive = creationParameters.isDebug;
	}

	// _____________________________________________________________________ Log

	static log(message, logLevel = 0) {
		// Active ?
		if (this.#isActive !== true) {
			return;
		}

		// Level
		if (logLevel <= 0) {
			return;
		}

		// Log
		console.log(`%c${message}`, `color: ${this.#colourLog}`);
	}
}
