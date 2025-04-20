/* global APPLICATION_VERSION */

import ApplicationConfiguration from './ApplicationConfiguration.js';
import ApplicationLogger from './ApplicationLogger.js';

export default class Application {
	#LOG_LEVEL = 1;

	// _________________________________________________________________________

	constructor(creationParameters) {
		// Always Log
		ApplicationLogger.log(
			'Application ' + APPLICATION_VERSION,
			this.#LOG_LEVEL,
		);

		// Configuration
		ApplicationConfiguration.initialise(creationParameters);

		// Logger
		ApplicationLogger.initialise(creationParameters);
	}
}
