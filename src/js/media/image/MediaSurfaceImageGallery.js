import ApplicationLogger from '../../application/ApplicationLogger.js';
import MediaSurfaceImage from './MediaSurfaceImage.js';

export default class MediaSurfaceImageGallery {
	#IMAGES = [];

	#LOG_LEVEL = 2;

	// _________________________________________________________________________

	constructor(container, imageUrls) {
		ApplicationLogger.log(`MediaSurfaceImageGallery`, this.#LOG_LEVEL);

		for (let i = 0; i < imageUrls.length; i++) {
			// Create
			const MEDIA_SURFACE_IMAGE = new MediaSurfaceImage(
				container,
				imageUrls[i],
			);

			// Store
			this.#IMAGES.push(MEDIA_SURFACE_IMAGE);
		}
	}

	// ____________________________________________________________________ Tick

	tick() {
		// Return Not Complete
		return false;
	}

	// ____________________________________________________________________ Stop

	stop() {}
}
