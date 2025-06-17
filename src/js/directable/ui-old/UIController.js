import ApplicationConfiguration from '../application/ApplicationConfiguration';
import ApplicationLogger from '../application/ApplicationLogger';

import UIGridController from './grid/UIGridController';

import UIBlockController from './block/UIBlockController';
import UIViewerController from './viewer/UIViewerController';

import UIDevelopmentController from './development/UIDevelopmentController';

export default class UIController {
	#HOLDER;
	#HOLDER_Z_INDEX = 200;

	#LOG_LEVEL = 2;

	// _________________________________________________________________________

	constructor(container) {
		ApplicationLogger.log('UIController', this.#LOG_LEVEL);

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'ui';
		this.#HOLDER.classList.add('full');
		this.#HOLDER.style.zIndex = this.#HOLDER_Z_INDEX;
		container.appendChild(this.#HOLDER);

		// Initialise
		UIGridController.initialise(this.#HOLDER);
		UIBlockController.initialise(this.#HOLDER);
		UIViewerController.initialise(this.#HOLDER);

		// Create Development Guides ?
		if (ApplicationConfiguration.getIsDebug()) {
			UIDevelopmentController.initialise();
		}
	}

	// ____________________________________________________________________ Tick

	/* eslint-disable-next-line class-methods-use-this */
	tick(frameDeltaMS) {
		// Tick
		UIBlockController.tick(frameDeltaMS);
		UIViewerController.tick(frameDeltaMS);
	}

	// ____________________________________________________________________ Size

	/* eslint-disable-next-line class-methods-use-this */
	setSize(widthPx, heightPx) {
		ApplicationLogger.log(
			`UIController setSize ${widthPx} ${heightPx}`,
			this.#LOG_LEVEL,
		);

		// Set Size
		UIGridController.setSize(widthPx, heightPx);
		UIBlockController.setSize(widthPx, heightPx);
		UIViewerController.setSize(widthPx, heightPx);
	}
}
