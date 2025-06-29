export default class DevelopmentGrid {
	#HOLDER;

	#isHidden = false;

	// _________________________________________________________________________

	constructor(container) {}

	// _______________________________________________________________ Show Hide

	toggleShowHide() {
		if (this.#isHidden) {
			this.#show();
		} else {
			this.#hide();
		}
	}

	#show() {
		// Show Guide Holder
		// this.#GUIDE_HOLDER.style.display = 'initial';

		// Store
		this.#isHidden = false;
	}

	#hide() {
		// Hide Guide Holder
		// this.#GUIDE_HOLDER.style.display = 'none';

		// Store
		this.#isHidden = true;
	}
}
