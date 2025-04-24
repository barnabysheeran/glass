// import ApplicationLogger from '../../application/ApplicationLogger';

import { overlayCreateButton } from '../OverlayUtil.js';

export default class OverlayOverlay {
	#HOLDER;

	#BUTTON_SHOW_HIDE;

	constructor(container) {
		// ApplicationLogger.log('OverlayOverlay', 1);

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'overlay-holder-overlay';
		this.#HOLDER.className = 'overlay-holder';
		container.appendChild(this.#HOLDER);

		// Create Buttons
		this.#BUTTON_SHOW_HIDE = overlayCreateButton(
			'*',
			'overlay-button-show-hide',
			'half',
		);
		this.#HOLDER.appendChild(this.#BUTTON_SHOW_HIDE);
	}
}
