// import ApplicationLogger from '../../application/ApplicationLogger';

import { overlayCreateLabel, overlayCreateButton } from '../OverlayUtil';

export default class OverlayTeleprompt {
	#HOLDER;

	#LABEL;

	#BUTTON_RESET;

	// _________________________________________________________________________

	constructor(container) {
		// ApplicationLogger.log('OverlayTeleprompt', 1);

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'overlay-holder-capture';
		this.#HOLDER.className = 'overlay-holder';
		container.appendChild(this.#HOLDER);

		// Create Label
		this.#LABEL = overlayCreateLabel('TELE');
		// this.#LABEL.classList.add('inactive');
		this.#HOLDER.appendChild(this.#LABEL);

		// Create Button Reset
		this.#BUTTON_RESET = overlayCreateButton(
			'RESET',
			'teleprompt-button-reset'
		);
		// this.#BUTTON_RESET.classList.add('inactive');
		this.#HOLDER.appendChild(this.#BUTTON_RESET);
	}

	// _____________________________________________________________ Show / Hide

	show() {
		this.#HOLDER.style.display = 'initial';
	}

	hide() {
		this.#HOLDER.style.display = 'none';
	}
}
