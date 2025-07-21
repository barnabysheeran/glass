import ApplicationLogger from '../application/ApplicationLogger.js';
import DataController from '../data/DataController.js';

import Display from '../display/Display.js';

import MediaSurfaceVimeo from './video/MediaSurfaceVimeo.js';

export default class MediaSurface {
	static #CONTAINER;

	static #MEDIA_SURFACE_VIMEO;

	static #LOG_LEVEL = 2;

	// _________________________________________________________________________

	static initialise(width, height) {
		ApplicationLogger.log('MediaSurface', this.#LOG_LEVEL);

		// Create Holder
		this.#CONTAINER = document.createElement('div');
		this.#CONTAINER.classList.add('video-surface');

		// Append Holder to Display Holder
		Display.getDisplayHolder().appendChild(this.#CONTAINER);

		// Create Vimeo Player
		this.#MEDIA_SURFACE_VIMEO = new MediaSurfaceVimeo(this.#CONTAINER);

		// Set Initial Size
		this.setSize(width, height);
	}

	// ____________________________________________________________________ Tick

	static tick(frameDeltaMS) {
		// Tick Vimeo Player
		this.#MEDIA_SURFACE_VIMEO.tick(frameDeltaMS);
	}

	// ____________________________________________________________ Show Project

	static showProject(data) {
		ApplicationLogger.log(`MediaSurface showProject`, this.#LOG_LEVEL);

		console.log(`MediaSurface showProject`, data);

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
					// this.#createVimeoPlayer(MEDIA_DATA);

					this.showVimeo(MEDIA_DATA['vimeo-id']);

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

	static showVimeo(videoId) {
		ApplicationLogger.log(`MediaSurface showVimeo ${videoId}`, this.#LOG_LEVEL);
		this.#MEDIA_SURFACE_VIMEO.showVideo(videoId);
	}

	// ___________________________________________________________________ Clear

	static clear() {}

	// ____________________________________________________________________ Size

	static setSize(width, height) {
		this.#CONTAINER.style.width = `${width}px`;
		this.#CONTAINER.style.height = `${height}px`;
	}
}
