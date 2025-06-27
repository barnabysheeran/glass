// import ApplicationLogger from '../../application/ApplicationLogger';

import { overlayCreateLabel, overlayCreateButton } from '../OverlayUtil.js';

import DisplayFormats from '../../display/DisplayFormats.js';

export default class OverlayDisplayFormat {
	#HOLDER;

	#LABEL;

	#BUTTON_FILL;
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
		this.#BUTTON_FILL = overlayCreateButton('FILL', 'display-format-change', {
			displayFormat: DisplayFormats.FILL,
		});
		this.#HOLDER.appendChild(this.#BUTTON_FILL);

		this.#BUTTON_WIDE_2_39_1 = overlayCreateButton(
			'2.39:1',
			'display-format-change',
			{
				displayFormat: DisplayFormats.WIDE_2_39_1,
			},
		);
		this.#HOLDER.appendChild(this.#BUTTON_WIDE_2_39_1);

		this.#BUTTON_WIDE_2_1 = overlayCreateButton(
			'2:1',
			'display-format-change',
			{
				displayFormat: DisplayFormats.WIDE_2_1,
			},
		);
		this.#HOLDER.appendChild(this.#BUTTON_WIDE_2_1);

		this.#BUTTON_WIDE_4_3 = overlayCreateButton(
			'4:3',
			'display-format-change',
			{
				displayFormat: DisplayFormats.WIDE_4_3,
			},
		);

		this.#HOLDER.appendChild(this.#BUTTON_WIDE_4_3);

		this.#BUTTON_SQUARE = overlayCreateButton(
			'SQUARE',
			'display-format-change',
			{
				displayFormat: DisplayFormats.SQUARE,
			},
		);
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
