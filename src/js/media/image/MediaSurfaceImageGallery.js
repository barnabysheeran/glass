import ApplicationLogger from '../../application/ApplicationLogger.js';
import ApplicationConfiguration from '../../application/ApplicationConfiguration.js';

import MediaSurfaceImage from './MediaSurfaceImage.js';

export default class MediaSurfaceImageGallery {
	#IMAGES = [];
	#imagesToLoad = 0;

	#LOG_LEVEL = 2;

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
		// Tick Images
		for (let i = 0; i < this.#IMAGES.length; i++) {
			this.#IMAGES[i].tick();
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
		// Show Image 0
		this.#IMAGES[0].show();
	}

	// ____________________________________________________________________ Stop

	stop() {}

	// ____________________________________________________________________ Size

	setSize(widthPx, heightPx) {
		ApplicationLogger.log(
			`MediaSurfaceImageGallery setSize ${widthPx}, ${heightPx}`,
			this.#LOG_LEVEL,
		);
	}

	// _________________________________________________________________ Destroy

	destroy() {}
}
