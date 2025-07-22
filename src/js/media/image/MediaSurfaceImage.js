export default class MediaSurfaceImage {
	#IMAGE_URL;
	#CALLBACK_ON_LOADED;

	#HOLDER;
	#IMAGE;

	#LERP = 0.015;
	#LERP_MARGIN = 0.01;

	#opacity = 0;
	#opacityTarget = 0;

	#isStopping = false;

	// _________________________________________________________________ Opacity

	constructor(container, imageURL, callbackOnLoaded) {
		// Store
		this.#IMAGE_URL = imageURL;
		this.#CALLBACK_ON_LOADED = callbackOnLoaded;

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.classList.add('image');
		container.appendChild(this.#HOLDER);

		// Create Image
		this.#IMAGE = new Image();
		this.#IMAGE.onload = this.#onImageLoaded.bind(this);

		// Initial Opacity
		this.#HOLDER.style.opacity = 0;

		// Load
		this.#IMAGE.src = this.#IMAGE_URL;
	}

	#onImageLoaded() {
		// Set Image as Background of Holder
		this.#HOLDER.style.backgroundImage = `url(${this.#IMAGE_URL})`;

		// Discard Image
		this.#IMAGE = null;

		// Callback
		if (this.#CALLBACK_ON_LOADED) {
			this.#CALLBACK_ON_LOADED();
		}
	}

	// ____________________________________________________________________ Tick

	tick() {
		// Lerp Opacity
		this.#opacity += (this.#opacityTarget - this.#opacity) * this.#LERP;

		// Set Opacity
		this.#HOLDER.style.opacity = this.#opacity;

		// Stopping ?
		if (this.#isStopping && this.#opacity <= this.#LERP_MARGIN) {
			console.log('MediaSurfaceImage - Stopping and opacity is low enough');

			// Complete
			return true;
		}

		console.log(
			`MediaSurfaceImage - Tick opacity: ${this.#opacity}, target: ${this.#opacityTarget}`,
		);

		// Return Not Complete
		return false;
	}

	// ____________________________________________________________________ Show

	show() {
		this.#opacityTarget = 1.0;
	}

	hide() {
		this.#opacityTarget = 0;
	}

	// ____________________________________________________________________ Stop

	stop() {
		this.#isStopping = true;

		this.hide();
	}

	// _________________________________________________________________ Destroy

	destroy() {
		// Remove Holder
		if (this.#HOLDER && this.#HOLDER.parentNode) {
			this.#HOLDER.parentNode.removeChild(this.#HOLDER);
		}

		// Clear References
		this.#HOLDER = null;
		this.#IMAGE = null;
	}
}
