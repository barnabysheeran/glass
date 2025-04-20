// import ApplicationLogger from '../../application/ApplicationLogger';

import { overlayCreateLabel, overlayCreateButton } from '../OverlayUtil.js';

export default class OverlayCapture {
	#HOLDER;

	#LABEL;

	#BUTTON_FRAME;
	#BUTTON_FRAMES;

	// _________________________________________________________________________

	constructor(container) {
		// ApplicationLogger.log('OverlayCapture', 1);

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'overlay-holder-capture';
		this.#HOLDER.className = 'overlay-holder';
		container.appendChild(this.#HOLDER);

		// Create Label
		this.#LABEL = overlayCreateLabel('CAPTURE');
		this.#LABEL.classList.add('inactive');
		this.#HOLDER.appendChild(this.#LABEL);

		// Create Buttons
		this.#BUTTON_FRAME = overlayCreateButton('FRAME', 'capture-button-frame');
		this.#BUTTON_FRAME.classList.add('inactive');
		this.#HOLDER.appendChild(this.#BUTTON_FRAME);

		// this.#BUTTON_FRAMES = overlayCreateButton(
		// 	'FRAMES',
		// 	'capture-button-frames'
		// );
		// this.#HOLDER.appendChild(this.#BUTTON_FRAMES);
	}

	// _____________________________________________________________ Show / Hide

	show() {
		this.#HOLDER.style.display = 'initial';
	}

	hide() {
		this.#HOLDER.style.display = 'none';
	}
}
