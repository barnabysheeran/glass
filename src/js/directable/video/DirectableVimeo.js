import player from '@vimeo/player';

import ApplicationLogger from '../../application/ApplicationLogger.js';

import VideoSurface from '../../video/VideoSurface.js';

export default class DirectableVimeo {
	#HOLDER;
	#PLAYER;
	#videoAspectRatio = 16 / 9; // Default aspect ratio

	#LOG_LEVEL = 1;

	// _________________________________________________________________________

	constructor() {
		ApplicationLogger.log('DirectableVimeo');

		// Create Vimeo Player
		this.#createPlayer();
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {}

	// __________________________________________________________________ Player

	#createPlayer() {
		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'vimeo-holder';
		this.#HOLDER.className = 'vimeo-holder';
		VideoSurface.getContainer().appendChild(this.#HOLDER);

		// Create a Vimeo Player Instance
		const OPTIONS = {
			id: 12021447,
			loop: true,
			background: true,
			dnt: true, // Do Not Track
			responsive: false,
			width: 640,
		};

		// Create Player
		this.#PLAYER = new player(this.#HOLDER, OPTIONS);

		this.#PLAYER.ready().then(this.#onReady.bind(this));

		// Add event listeners
		this.#PLAYER.on('play', this.#onPlay.bind(this));
	}

	// ___________________________________________________________________ Ready

	async #onReady() {
		try {
			const videoWidth = await this.#PLAYER.getVideoWidth();
			const videoHeight = await this.#PLAYER.getVideoHeight();

			if (videoWidth && videoHeight) {
				this.#videoAspectRatio = videoWidth / videoHeight;
			}
		} catch (error) {
			console.error('Error getting video dimensions:', error);
		}

		// const appContainer = ApplicationConfiguration.getApplicationContainer();
		// this.setSize(appContainer.clientWidth, appContainer.clientHeight);
	}

	// ____________________________________________________________________ Play

	#onPlay() {
		ApplicationLogger.log('DirectableVimeo onPlay', this.#LOG_LEVEL);
	}

	// ____________________________________________________________________ Size

	setSize(width, height) {
		console.log('DirectableVimeo setSize', width, height);

		this.#HOLDER.style.width = width + 'px';
		this.#HOLDER.style.height = height + 'px';

		const iframe = this.#HOLDER.querySelector('iframe');

		if (!iframe) {
			console.log('DirectableVimeo setSize: No iframe found');

			return;
		}

		// const containerAspectRatio = width / height;
		// let newVideoWidth = width;
		// let newVideoHeight = height;

		// if (containerAspectRatio > this.#videoAspectRatio) {
		// 	// Container is wider than the video, scale by width to cover
		// 	newVideoWidth = width;
		// 	newVideoHeight = width / this.#videoAspectRatio;
		// } else {
		// 	// Container is taller than the video, scale by height to cover
		// 	newVideoHeight = height;
		// 	newVideoWidth = height * this.#videoAspectRatio;
		// }
		iframe.style.width = `${width}px`;
		iframe.style.height = `${height}px`;

		// Center the video
		// iframe.style.left = `${(width - newVideoWidth) / 2}px`;
		// iframe.style.top = `${(height - newVideoHeight) / 2}px`;
	}
}
