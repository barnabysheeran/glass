import { overlayCreateLabel } from '../OverlayUtil.js';

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
		this.#BUTTON_SHOW_HIDE = overlayCreateLabel('0 FPS');
		this.#HOLDER.appendChild(this.#BUTTON_SHOW_HIDE);
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {
		// Update FPS
		const FPS = Math.round(1000 / frameDeltaMS);
		this.#BUTTON_SHOW_HIDE.innerHTML = `${FPS} FPS`;
	}
}
