// import ApplicationLogger from '../../application/ApplicationLogger';

import { overlayCreateLabel, overlayCreateButton } from '../OverlayUtil';

export default class OverlayPathTracer {
	#HOLDER;

	#LABEL;

	#BUTTON_CLEAR;
	#BUTTON_START;
	#BUTTON_STOP;

	// _________________________________________________________________________

	constructor(container) {
		// ApplicationLogger.log('OverlayPathTracer', 1);

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'overlay-holder-capture';
		this.#HOLDER.className = 'overlay-holder';
		container.appendChild(this.#HOLDER);

		// Create Label
		this.#LABEL = overlayCreateLabel('PATH');
		// this.#LABEL.classList.add('inactive');
		this.#HOLDER.appendChild(this.#LABEL);

		// Create Button Clear
		this.#BUTTON_CLEAR = overlayCreateButton(
			'CLEAR',
			'path-tracer-button-clear'
		);
		// this.#BUTTON_CLEAR.classList.add('inactive');
		this.#HOLDER.appendChild(this.#BUTTON_CLEAR);

		// Create Button Start
		this.#BUTTON_START = overlayCreateButton(
			'START',
			'path-tracer-button-start'
		);
		// this.#BUTTON_START.classList.add('inactive');
		this.#HOLDER.appendChild(this.#BUTTON_START);

		// Create Button Stop
		this.#BUTTON_STOP = overlayCreateButton('STOP', 'path-tracer-button-stop');
		// this.#BUTTON_STOP.classList.add('inactive');
		this.#HOLDER.appendChild(this.#BUTTON_STOP);
	}

	// _____________________________________________________________ Show / Hide

	show() {
		this.#HOLDER.style.display = 'initial';
	}

	hide() {
		this.#HOLDER.style.display = 'none';
	}
}
