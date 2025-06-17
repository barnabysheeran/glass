import ApplicationDispatcher from '../../application-dispatcher/ApplicationDispatcher';
import ApplicationLogger from '../../application/ApplicationLogger';

import UIGridController from '../grid/UIGridController';

export default class UIViewerController {
	static #HOLDER;

	static #VIEWERS = [];

	static #LOG_LEVEL = 3;

	// _________________________________________________________________________

	static initialise(container) {
		// Calculate Holder Size
		const HOLDER_WIDTH_PX = UIGridController.getMaxWidthPx();
		const HOLDER_HEIGHT_PX = UIGridController.getMaxHeightPx();

		// Create Holder Viewers
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'viewer-holder';
		this.#HOLDER.classList.add('full');
		this.#HOLDER.classList.add('centered');
		this.#HOLDER.style.width = `${HOLDER_WIDTH_PX}px`;
		this.#HOLDER.style.height = `${HOLDER_HEIGHT_PX}px`;
		this.#HOLDER.style.transform = 'translate(-50%, 0%)';
		container.appendChild(this.#HOLDER);
	}

	// ____________________________________________________________________ Tick

	static tick() {
		// Tick Viewers
		this.#VIEWERS.forEach((block) => {
			block.tick();
		});
	}

	// ____________________________________________________________________ Size

	static setSize(widthPx, heightPx) {
		// TODO
	}
}
