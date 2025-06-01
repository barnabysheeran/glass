import { overlayCreateButton } from '../OverlayUtil.js';

export default class OverlayFPS {
	#HOLDER;

	#BUTTON_SHOW_HIDE;

	constructor(container) {
		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'overlay-holder-overlay';
		this.#HOLDER.className = 'overlay-holder';
		container.appendChild(this.#HOLDER);

		// Create Buttons
		this.#BUTTON_SHOW_HIDE = overlayCreateButton(
			'[  &nbsp;&nbsp;&nbsp; ]',
			'overlay-toggle-visibility',
			'half',
		);
		this.#HOLDER.appendChild(this.#BUTTON_SHOW_HIDE);
	}
}
