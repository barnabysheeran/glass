import ApplicationConfiguration from '../../../application/ApplicationConfiguration';

export default class DevelopmentGuides {
	#GUIDE_HOLDER;
	#HOLDER_Z_INDEX = 300;

	#GUIDE_HORIZONTAL_THIRD_SHORT;
	#GUIDE_HORIZONTAL_HALF;
	#GUIDE_HORIZONTAL_TWO_THIRDS_SHORT;

	#GUIDE_VERTICAL_THIRD_SHORT;
	#GUIDE_VERTICAL_HALF;
	#GUIDE_VERTICAL_TWO_THIRDS_SHORT;

	#GUIDE_HOLDER_CSS = ``;

	#GUIDE_HORIZONTAL_CSS = `
		position: absolute;

		left: 0;

		width: 100%;
		height: 1px;

		background-color: #fff;

		opacity: 0.5;
	`;

	#GUIDE_HORIZONTAL_SHORT_CSS = `
		position: absolute;

		left: calc(50% - 100px);

		width: 200px;
		height: 1px;

		background-color: #fff;

		opacity: 0.5;
	`;

	#GUIDE_VERTICAL_CSS = `
		position: absolute;

		top: 0;

		width: 1px;
		height: 100%;
		background-color: #fff;

		opacity: 0.5;
	`;

	#GUIDE_VERTICAL_SHORT_CSS = `
        position: absolute;

        top: calc(50% - 100px);

        width: 1px;
        height: 200px;

        background-color: #fff;

        opacity: 0.5;
    `;

	#isHidden = false;

	// _________________________________________________________________________

	constructor() {
		// Get Site Container
		const APPLICATION_CONTAINER =
			ApplicationConfiguration.getApplicationContainer();

		// Create Guide Holder
		this.#GUIDE_HOLDER = document.createElement('div');
		this.#GUIDE_HOLDER.id = 'development-guides';
		this.#GUIDE_HOLDER.classList.add('full');
		this.#GUIDE_HOLDER.style.cssText = this.#GUIDE_HOLDER_CSS;
		this.#GUIDE_HOLDER.style.zIndex = this.#HOLDER_Z_INDEX;
		APPLICATION_CONTAINER.appendChild(this.#GUIDE_HOLDER);

		// __________________________________________________________ Horizontal

		// Horizontal One Third
		this.#GUIDE_HORIZONTAL_THIRD_SHORT = document.createElement('div');
		this.#GUIDE_HORIZONTAL_THIRD_SHORT.style.cssText =
			this.#GUIDE_HORIZONTAL_SHORT_CSS;
		this.#GUIDE_HORIZONTAL_THIRD_SHORT.style.top = '33%';
		this.#GUIDE_HOLDER.appendChild(this.#GUIDE_HORIZONTAL_THIRD_SHORT);

		// Horizontal Half
		this.#GUIDE_HORIZONTAL_HALF = document.createElement('div');
		this.#GUIDE_HORIZONTAL_HALF.style.cssText = this.#GUIDE_HORIZONTAL_CSS;
		this.#GUIDE_HORIZONTAL_HALF.style.top = '50%';
		this.#GUIDE_HOLDER.appendChild(this.#GUIDE_HORIZONTAL_HALF);

		// Horizontal Two Thirds
		this.#GUIDE_HORIZONTAL_TWO_THIRDS_SHORT = document.createElement('div');
		this.#GUIDE_HORIZONTAL_TWO_THIRDS_SHORT.style.cssText =
			this.#GUIDE_HORIZONTAL_SHORT_CSS;
		this.#GUIDE_HORIZONTAL_TWO_THIRDS_SHORT.style.top = '66%';
		this.#GUIDE_HOLDER.appendChild(this.#GUIDE_HORIZONTAL_TWO_THIRDS_SHORT);

		// _____________________________________________________ Vertical Guides

		// Vertical One Third
		this.#GUIDE_VERTICAL_THIRD_SHORT = document.createElement('div');
		this.#GUIDE_VERTICAL_THIRD_SHORT.style.cssText =
			this.#GUIDE_VERTICAL_SHORT_CSS;
		this.#GUIDE_VERTICAL_THIRD_SHORT.style.left = '33%';
		this.#GUIDE_HOLDER.appendChild(this.#GUIDE_VERTICAL_THIRD_SHORT);

		// Vertical Half
		this.#GUIDE_VERTICAL_HALF = document.createElement('div');
		this.#GUIDE_VERTICAL_HALF.style.cssText = this.#GUIDE_VERTICAL_CSS;
		this.#GUIDE_VERTICAL_HALF.style.left = '50%';
		this.#GUIDE_HOLDER.appendChild(this.#GUIDE_VERTICAL_HALF);

		// Vertical Two Thirds
		this.#GUIDE_VERTICAL_TWO_THIRDS_SHORT = document.createElement('div');
		this.#GUIDE_VERTICAL_TWO_THIRDS_SHORT.style.cssText =
			this.#GUIDE_VERTICAL_SHORT_CSS;
		this.#GUIDE_VERTICAL_TWO_THIRDS_SHORT.style.left = '66%';
		this.#GUIDE_HOLDER.appendChild(this.#GUIDE_VERTICAL_TWO_THIRDS_SHORT);

		// _____________________________________________ Keyboard Event Listener

		window.addEventListener('keyup', this.#onKeyUp.bind(this));

		// ________________________________________________________ Start Hidden

		this.#hide();
	}

	// _________________________________________________________________________

	#onKeyUp(event) {
		// 1
		if (event.keyCode === 49) {
			this.#toggleShowHide();
		}
	}

	// _______________________________________________________________ Show Hide

	#toggleShowHide() {
		if (this.#isHidden) {
			this.#show();
		} else {
			this.#hide();
		}
	}

	#show() {
		// Show Guide Holder
		this.#GUIDE_HOLDER.style.display = 'initial';

		// Store
		this.#isHidden = false;
	}

	#hide() {
		// Hide Guide Holder
		this.#GUIDE_HOLDER.style.display = 'none';

		// Store
		this.#isHidden = true;
	}
}
