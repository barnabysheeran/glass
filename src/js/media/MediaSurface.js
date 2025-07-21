import ApplicationLogger from '../application/ApplicationLogger.js';
import DataController from '../data/DataController.js';

import Display from '../display/Display.js';

import MediaSurfaceVimeo from './video/MediaSurfaceVimeo.js';

export default class MediaSurface {
	static #CONTAINER;

	static #MEDIA_ITEMS = [];

	static #LOG_LEVEL = 2;

	// _________________________________________________________________________

	static initialise(width, height) {
		ApplicationLogger.log('MediaSurface', this.#LOG_LEVEL);

		// Create Holder
		this.#CONTAINER = document.createElement('div');
		this.#CONTAINER.classList.add('video-surface');

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
				this.#MEDIA_ITEMS.splice(i, 1);
				i--;
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

		ApplicationLogger.log(
			`MediaSurface showProject: Project ID: ${projectId}`,
			this.#LOG_LEVEL,
		);

		// Get Project Data
		const PROJECT_DATA = DataController.getProjectById(projectId);

		// Project Data has 'media' property
		if (!PROJECT_DATA || !PROJECT_DATA.media) {
			ApplicationLogger.warn(
				`MediaSurface showProject: No media data`,
				this.#LOG_LEVEL,
			);
			return;
		}

		// Through the media data
		for (let i = 0; i < PROJECT_DATA.media.length; i++) {
			const MEDIA_DATA = PROJECT_DATA.media[i];

			console.log(`MediaSurface showProject: Media Data`, MEDIA_DATA);

			switch (MEDIA_DATA.type) {
				case 'vimeo':
					this.#createVimeoPlayer(MEDIA_DATA['vimeo-id']);

					break;
				case 'youtube':
					// this.#createYouTubePlayer(MEDIA_DATA);
					break;
				case 'image':
					// this.#createImage(MEDIA_DATA);
					break;
				default:
					ApplicationLogger.warn(
						`MediaSurface showProject: Unknown media type`,
						this.#LOG_LEVEL,
					);
					break;
			}
		}
	}

	// ___________________________________________________________________ Vimeo

	static #createVimeoPlayer(vimeoId) {
		ApplicationLogger.log(
			`MediaSurface createVimeoPlayer ${vimeoId}`,
			this.#LOG_LEVEL,
		);

		// Create Vimeo Player Instance
		const VIMEO_PLAYER = new MediaSurfaceVimeo(this.#CONTAINER, vimeoId);

		// Store
		this.#MEDIA_ITEMS.push(VIMEO_PLAYER);
	}

	// ___________________________________________________________________ Clear

	static clear() {
		ApplicationLogger.log('MediaSurface clear', this.#LOG_LEVEL);

		// Stop Vimeo Player
		for (let i = 0; i < this.#MEDIA_ITEMS.length; i++) {
			this.#MEDIA_ITEMS[i].stop();
		}
	}

	// ____________________________________________________________________ Size

	static setSize(width, height) {
		this.#CONTAINER.style.width = `${width}px`;
		this.#CONTAINER.style.height = `${height}px`;
	}
}
