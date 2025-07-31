import ApplicationLogger from '../../application/ApplicationLogger.js';
import ApplicationConfiguration from '../../application/ApplicationConfiguration.js';

import MediaSurfaceImage from './MediaSurfaceImage.js';

export default class MediaSurfaceImageGallery {
	#IMAGES = [];
	#imagesToLoad = 0;

	#indexImageCurrent = 0;

	#DELAY_NEXT_IMAGE_MAX = 60 * 4; // Frames
	#delayNextImage = -1;

	#isStopping = false;

	#LOG_LEVEL = 4;

	// _________________________________________________________________________

	constructor(container, imageUrls) {
		ApplicationLogger.log(`MediaSurfaceImageGallery`, this.#LOG_LEVEL);

		const ASSET_PATH = ApplicationConfiguration.getAssetPath();

		for (let i = 0; i < imageUrls.length; i++) {
			// Create
			const MEDIA_SURFACE_IMAGE = new MediaSurfaceImage(
				container,
				ASSET_PATH + imageUrls[i],
				this.#onImageLoaded.bind(this),
			);

			// Store
			this.#IMAGES.push(MEDIA_SURFACE_IMAGE);
		}

		// Images to Load
		this.#imagesToLoad = this.#IMAGES.length;
	}

	// ____________________________________________________________________ Tick

	tick() {
		// Delay ?
		if (this.#delayNextImage > 0) {
			// Decrement Delay
			this.#delayNextImage -= 1;

			if (this.#delayNextImage === 0) {
				this.#showNextImage();

				// Reset Delay
				this.#delayNextImage = this.#DELAY_NEXT_IMAGE_MAX;
			}
		}

		// Tick Images
		let isComplete = true;

		for (let i = 0; i < this.#IMAGES.length; i++) {
			const IS_IMAGE_COMPLETE = this.#IMAGES[i].tick();

			if (IS_IMAGE_COMPLETE === false) {
				isComplete = false;
			}
		}

		if (this.#isStopping && isComplete === true) {
			ApplicationLogger.log(
				`MediaSurfaceImageGallery - All images stopped`,
				this.#LOG_LEVEL,
			);

			return true;
		}

		// Return Not Complete
		return false;
	}

	// _________________________________________________________________ Loading

	#onImageLoaded() {
		ApplicationLogger.log(
			`MediaSurfaceImageGallery #onImageLoaded ${this.#imagesToLoad}`,
			this.#LOG_LEVEL,
		);

		// Decrement Images to Load
		this.#imagesToLoad -= 1;

		// All Images Loaded ?
		if (this.#imagesToLoad === 0) {
			this.#onAllImagesLoaded();
		}
	}

	#onAllImagesLoaded() {
		// Start Showing Images
		ApplicationLogger.log(
			`MediaSurfaceImageGallery #onAllImagesLoaded`,
			this.#LOG_LEVEL,
		);

		// Show First Image
		this.#indexImageCurrent = 0;
		this.#IMAGES[this.#indexImageCurrent].show();

		// Start Delay
		this.#delayNextImage = this.#DELAY_NEXT_IMAGE_MAX;
	}

	#showNextImage() {
		// Hide Current Image
		this.#IMAGES[this.#indexImageCurrent].hide();

		// Increment Index
		this.#indexImageCurrent += 1;

		// Wrap Around
		if (this.#indexImageCurrent >= this.#IMAGES.length) {
			this.#indexImageCurrent = 0;
		}

		// Show Next Image
		this.#IMAGES[this.#indexImageCurrent].show();
	}

	// ____________________________________________________________________ Stop

	stop() {
		// End Delay
		this.#delayNextImage = -1;

		// Stop All Images
		for (let i = 0; i < this.#IMAGES.length; i++) {
			this.#IMAGES[i].stop();
		}

		// Is Stopping
		this.#isStopping = true;
	}

	// ____________________________________________________________________ Size

	setSize(widthPx, heightPx) {
		ApplicationLogger.log(
			`MediaSurfaceImageGallery setSize ${widthPx}, ${heightPx}`,
			this.#LOG_LEVEL,
		);
	}

	// _________________________________________________________________ Destroy

	destroy() {
		ApplicationLogger.log('MediaSurfaceImageGallery destroy', this.#LOG_LEVEL);

		for (let i = 0; i < this.#IMAGES.length; i++) {
			this.#IMAGES[i].destroy();
		}
	}
}
