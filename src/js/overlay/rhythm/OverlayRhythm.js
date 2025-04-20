// import ApplicationLogger from '../../application/ApplicationLogger';

import { overlayCreateLabel, overlayCreateButton } from '../OverlayUtil.js';

export default class OverlayRhythm {
	#HOLDER;

	#LABEL_RHYTHM;

	#BUTTON_STOP;
	#BUTON_START;

	#LABEL_BPM;

	#BUTTON_33;
	#BUTTON_45;
	#BUTTON_78;

	// _________________________________________________________________________

	constructor(container) {
		// ApplicationLogger.log('OverlayRhythm', 1);

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'overlay-holder-rhythm';
		this.#HOLDER.className = 'overlay-holder';
		container.appendChild(this.#HOLDER);

		// Create Label
		this.#LABEL_RHYTHM = overlayCreateLabel('RHYTHM');
		this.#LABEL_RHYTHM.classList.add('inactive');
		this.#HOLDER.appendChild(this.#LABEL_RHYTHM);

		// Create Button Stop
		this.#BUTTON_STOP = overlayCreateButton('STOP', 'rhythm-button-stop');
		// this.#BUTTON_STOP.classList.add('inactive');
		this.#HOLDER.appendChild(this.#BUTTON_STOP);

		// Create Button Start
		this.#BUTON_START = overlayCreateButton('START', 'rhythm-button-start');
		// this.#BUTON_START.classList.add('inactive');
		this.#HOLDER.appendChild(this.#BUTON_START);

		// Create Label
		this.#LABEL_BPM = overlayCreateLabel('BPM');
		// this.#LABEL_BPM.classList.add('inactive');
		this.#HOLDER.appendChild(this.#LABEL_BPM);

		// Create Button 33
		this.#BUTTON_33 = overlayCreateButton('33', 'rhythm-button-33', 'half');
		// this.#BUTTON_33.classList.add('inactive');
		this.#HOLDER.appendChild(this.#BUTTON_33);

		// Create Button 45
		this.#BUTTON_45 = overlayCreateButton('45', 'rhythm-button-45', 'half');
		// this.#BUTTON_45.classList.add('inactive');
		this.#HOLDER.appendChild(this.#BUTTON_45);

		// Create Button 78
		this.#BUTTON_78 = overlayCreateButton('78', 'rhythm-button-78', 'half');
		// this.#BUTTON_78.classList.add('inactive');
		this.#HOLDER.appendChild(this.#BUTTON_78);
	}

	// _____________________________________________________________ Show / Hide

	show() {
		this.#HOLDER.style.display = 'initial';
	}

	hide() {
		this.#HOLDER.style.display = 'none';
	}
}
