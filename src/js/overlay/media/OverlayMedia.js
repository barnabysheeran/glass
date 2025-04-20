// import ApplicationLogger from '../../application/ApplicationLogger';

import { overlayCreateButton } from '../OverlayUtil.js';

export default class OverlayMedia {
	#HOLDER;

	// #LABEL;

	#BUTTON_1280_720;
	#BUTTON_1024_1024;
	#BUTTON_2048_1024;

	// _________________________________________________________________________

	constructor(container) {
		// ApplicationLogger.log('OverlayMedia', 1);

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'overlay-holder-media';
		this.#HOLDER.className = 'overlay-holder';
		container.appendChild(this.#HOLDER);

		// Create Label
		// this.#LABEL = overlayCreateLabel(' ');
		// this.#HOLDER.appendChild(this.#LABEL);

		// Create Button 1280x720
		this.#BUTTON_1280_720 = overlayCreateButton(
			'1280x720',
			'media-button-1280-720',
		);
		this.#BUTTON_1280_720.classList.add('inactive');
		this.#HOLDER.appendChild(this.#BUTTON_1280_720);

		// Create Button 1024x1024
		this.#BUTTON_1024_1024 = overlayCreateButton(
			'1024x1024',
			'media-button-1024-1024',
		);
		this.#BUTTON_1280_720.classList.add('inactive');
		this.#HOLDER.appendChild(this.#BUTTON_1024_1024);

		// Create Button 2048x1024
		this.#BUTTON_2048_1024 = overlayCreateButton(
			'2048x1024',
			'media-button-2048-1024',
		);
		this.#HOLDER.appendChild(this.#BUTTON_2048_1024);
	}

	// _____________________________________________________________ Show / Hide

	show() {
		this.#HOLDER.style.display = 'initial';
	}

	hide() {
		this.#HOLDER.style.display = 'none';
	}
}
