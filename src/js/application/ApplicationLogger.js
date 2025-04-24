export default class ApplicationLogger {
	static #isActive = true; // Default true for initial version console output

	static #colourLog = '#999';
	static #colourWarn = '#f00';

	// _________________________________________________________________________

	static initialise(creationParameters) {
		// Set Active from creationParameters isDebug
		this.#isActive = creationParameters.isDebug;
	}

	// _____________________________________________________________________ Log

	static log(messageIn, logLevel = 0) {
		// Active ?
		if (this.#isActive !== true) {
			return;
		}

		// Level
		if (logLevel <= 0) {
			return;
		}

		// Message
		let message = messageIn;

		for (let i = 1; i < logLevel; i += 1) {
			message = `  ${message}`;
		}

		// Log
		console.log(`%c${message}`, `color: ${this.#colourLog}`);
	}

	// _____________________________________________________________________ Warn

	static warn(messageIn, logLevel = 0) {
		// Active ?
		if (this.#isActive !== true) {
			return;
		}

		// Level
		if (logLevel <= 0) {
			return;
		}

		// Message
		let message = messageIn;

		for (let i = 1; i < logLevel; i += 1) {
			message = `  ${message}`;
		}

		// Log
		console.log(`%c${message}`, `color: ${this.#colourWarn}`);
	}
}
