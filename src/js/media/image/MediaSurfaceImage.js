export default class MediaSurfaceImage {
	#IMAGE_URL;
	#CALLBACK_ON_LOADED;

	#HOLDER;
	#IMAGE;

	#OPACITY_LERP = 0.001;
	#opacity = 0;
	#opacityTarget = 0;

	// _________________________________________________________________ Opacity

	constructor(container, imageURL, callbackOnLoaded) {
		// Store
		this.#IMAGE_URL = imageURL;
		this.#CALLBACK_ON_LOADED = callbackOnLoaded;

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.classList.add('image-wrapper');
		container.appendChild(this.#HOLDER);

		// Create Image
		this.#IMAGE = new Image();
		this.#IMAGE.onload = this.#onImageLoaded.bind(this);

		// Initial Opacity
		this.#HOLDER.style.opacity = 0;
	}

	load() {
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
		this.#opacity += (this.#opacityTarget - this.#opacity) * this.#OPACITY_LERP;
		this.#HOLDER.style.opacity = this.#opacity;
	}

	// ____________________________________________________________________ Show

	show() {
		this.#opacityTarget = 0.6;
	}

	hide() {
		this.#opacityTarget = 0;
	}
}
