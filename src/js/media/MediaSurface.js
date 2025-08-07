import ApplicationLogger from '../application/ApplicationLogger.js';
import DataController from '../data/DataController.js';

import Display from '../display/Display.js';

import MediaSurfaceVimeo from './video/MediaSurfaceVimeo.js';
import MediaSurfaceYoutube from './video/MediaSurfaceYoutube.js';
import MediaSurfaceImageGallery from './image/MediaSurfaceImageGallery.js';

export default class MediaSurface {
	static #CONTAINER;

	static #MEDIA_ITEMS = [];

	static #width;
	static #height;

	static #LOG_LEVEL = 2;

	// _________________________________________________________________________

	static initialise(width, height) {
		ApplicationLogger.log('MediaSurface', this.#LOG_LEVEL);

		// Create Holder
		this.#CONTAINER = document.createElement('div');
		this.#CONTAINER.classList.add('media-surface');

		// Append Holder to Display Holder
		Display.getDisplayHolder().appendChild(this.#CONTAINER);

		// Set Initial Size
		this.setSize(width, height);
	}

	// ____________________________________________________________________ Tick

	static tick(frameDeltaMS) {
		// Tick Media Items
		for (let i = 0; i < this.#MEDIA_ITEMS.length; i++) {
			// Tick Media Item
			const IS_COMPLETE = this.#MEDIA_ITEMS[i].tick(frameDeltaMS);

			// Remove if Complete
			if (IS_COMPLETE) {
				console.log(`MediaSurface - Removing media item at index ${i}`);

				// Destroy Media Item
				this.#MEDIA_ITEMS[i].destroy();

				// Remove from Array
				this.#MEDIA_ITEMS.splice(i, 1);
				i--; // Adjust index after removal
			}
		}
	}

	// ____________________________________________________________ Show Project

	static showProject(data) {
		ApplicationLogger.log(`MediaSurface showProject`, this.#LOG_LEVEL);

		// Clear Container
		this.clear();

		// Get Project Id
		const projectId = data.projectId;

		ApplicationLogger.log(` - Project ID: ${projectId}`, this.#LOG_LEVEL);

		// Get Project Data
		const PROJECT_DATA = DataController.getProjectById(projectId);

		// Project Data has 'media' property
		if (!PROJECT_DATA || !PROJECT_DATA.media) {
			ApplicationLogger.warn(` - No media data`, this.#LOG_LEVEL);
			return;
		}

		// Through the media data
		const imageUrls = [];

		for (let i = 0; i < PROJECT_DATA.media.length; i++) {
			const MEDIA_DATA = PROJECT_DATA.media[i];

			switch (MEDIA_DATA.type) {
				case 'vimeo':
					// Vimeo - Add Vimeo Player
					this.#addVideoPlayer(MEDIA_DATA['vimeo-id']);

					break;
				case 'youtube':
					// YouTube - Add YouTube Player
					this.#addYouTubePlayer(MEDIA_DATA['youtube-id']);
					break;
				case 'image':
					// Image - Store URL
					imageUrls.push(MEDIA_DATA['url']);
					break;
				default:
					ApplicationLogger.warn(
						`MediaSurface showProject: Unknown media type`,
						this.#LOG_LEVEL,
					);
					break;
			}
		}

		// Create Image Gallery ?
		if (imageUrls.length > 0) {
			ApplicationLogger.log(
				` - Creating Image Gallery with ${imageUrls.length} images`,
				this.#LOG_LEVEL,
			);

			// Create Image Gallery
			this.#addImageGallery(imageUrls);
		}
	}

	// ___________________________________________________________________ Vimeo

	static #addVideoPlayer(vimeoId) {
		ApplicationLogger.log(
			`MediaSurface addVideoPlayer ${vimeoId}`,
			this.#LOG_LEVEL,
		);

		// Create Vimeo Player Instance
		this.#MEDIA_ITEMS.push(
			new MediaSurfaceVimeo(
				this.#CONTAINER,
				vimeoId,
				this.#width,
				this.#height,
			),
		);
	}

	// _________________________________________________________________ YouTube

	static #addYouTubePlayer(youtubeId) {
		ApplicationLogger.log(
			`MediaSurface addYouTubePlayer ${youtubeId}`,
			this.#LOG_LEVEL,
		);

		// Create YouTube Player Instance
		this.#MEDIA_ITEMS.push(
			new MediaSurfaceYoutube(
				this.#CONTAINER,
				youtubeId,
				this.#width,
				this.#height,
			),
		);
	}

	// ___________________________________________________________________ Image

	static #addImageGallery(imageUrls) {
		ApplicationLogger.log(
			`MediaSurface addImage ${imageUrls}`,
			this.#LOG_LEVEL,
		);

		// Create Image Gallery Instance
		this.#MEDIA_ITEMS.push(
			new MediaSurfaceImageGallery(this.#CONTAINER, imageUrls),
		);
	}

	// ___________________________________________________________________ Clear

	static clear() {
		ApplicationLogger.log('MediaSurface clear', this.#LOG_LEVEL);

		// Stop Media Items
		for (let i = 0; i < this.#MEDIA_ITEMS.length; i++) {
			this.#MEDIA_ITEMS[i].stop();
		}
	}

	// ____________________________________________________________________ Size

	static setSize(width, height) {
		// Container
		this.#CONTAINER.style.width = `${width}px`;
		this.#CONTAINER.style.height = `${height}px`;

		// Media Items
		for (let i = 0; i < this.#MEDIA_ITEMS.length; i++) {
			this.#MEDIA_ITEMS[i].setSize(width, height);
		}

		// Store
		this.#width = width;
		this.#height = height;
	}
}
