// import ApplicationLogger from '../../application/ApplicationLogger';

import { overlayCreateLabel, overlayCreateButton } from '../OverlayUtil.js';

export default class OverlayFormat {
	#HOLDER;

	#LABEL;

	#BUTTON_WIDE_2_39_1;
	#BUTTON_WIDE_2_1;
	#BUTTON_WIDE_4_3;

	#BUTTON_SQUARE;

	constructor(container) {
		// ApplicationLogger.log('OverlayFormat', 1);

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'overlay-holder-aspect';
		this.#HOLDER.className = 'overlay-holder';
		container.appendChild(this.#HOLDER);

		// Create Label
		this.#LABEL = overlayCreateLabel('FORMAT');
		this.#HOLDER.appendChild(this.#LABEL);

		// Create Buttons
		this.#BUTTON_WIDE_2_39_1 = overlayCreateButton(
			'2.39:1',
			'format-button-wide-2-39-1',
		);
		this.#BUTTON_WIDE_2_39_1.classList.add('inactive');
		this.#HOLDER.appendChild(this.#BUTTON_WIDE_2_39_1);

		this.#BUTTON_WIDE_2_1 = overlayCreateButton(
			'2:1',
			'format-button-wide-2-1',
		);
		this.#BUTTON_WIDE_2_1.classList.add('inactive');
		this.#HOLDER.appendChild(this.#BUTTON_WIDE_2_1);

		this.#BUTTON_WIDE_4_3 = overlayCreateButton(
			'4:3',
			'format-button-wide-4-3',
		);
		this.#BUTTON_WIDE_4_3.classList.add('inactive');
		this.#HOLDER.appendChild(this.#BUTTON_WIDE_4_3);

		this.#BUTTON_SQUARE = overlayCreateButton('SQUARE', 'format-button-square');
		this.#BUTTON_SQUARE.classList.add('inactive');
		this.#HOLDER.appendChild(this.#BUTTON_SQUARE);

		this.#BUTTON_SQUARE = overlayCreateButton('FILL', 'format-button-fill');
		this.#BUTTON_SQUARE.classList.add('inactive');
		this.#HOLDER.appendChild(this.#BUTTON_SQUARE);
	}

	// _____________________________________________________________ Show / Hide

	show() {
		this.#HOLDER.style.display = 'initial';
	}

	hide() {
		this.#HOLDER.style.display = 'none';
	}
}
