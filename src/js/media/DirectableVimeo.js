import player from '@vimeo/player';

import ApplicationLogger from '../application/ApplicationLogger.js';

import MediaSurface from '../../video/MediaSurface.js';

export default class DirectableVimeo {
	#HOLDER;
	#PLAYER;

	#width;
	#height;

	#LOG_LEVEL = 1;

	// _________________________________________________________________________

	constructor(width, height) {
		ApplicationLogger.log('DirectableVimeo', this.#LOG_LEVEL);

		// Create Vimeo Player
		this.#createPlayer();

		// Set Initial Size
		this.setSize(width, height);
	}

	// ____________________________________________________________________ Tick

	tick() {
		// frameDeltaMS
	}

	// __________________________________________________________________ Player

	#createPlayer() {
		ApplicationLogger.log('DirectableVimeo createPlayer', this.#LOG_LEVEL);

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'vimeo-holder';
		this.#HOLDER.className = 'vimeo-holder';
		MediaSurface.getContainer().appendChild(this.#HOLDER);

		// Create a Vimeo Player Instance
		const OPTIONS = {
			id: 12021447,
			loop: true,
			// background: true,
			controls: false,
			dnt: true, // Do Not Track
			responsive: false,
			width: this.#width,
		};

		// Create Player
		this.#PLAYER = new player(this.#HOLDER, OPTIONS);

		this.#PLAYER.ready().then(this.#onReady.bind(this));

		// Add event listeners
		this.#PLAYER.on('play', this.#onPlay.bind(this));
		this.#PLAYER.on('loaded', this.#onLoaded.bind(this));
	}

	// __________________________________________________________________ Loaded

	#onLoaded(data) {
		ApplicationLogger.log(
			`DirectableVimeo onLoaded: video ${data.id} has loaded.`,
			this.#LOG_LEVEL,
		);

		// Play Video
		this.#playVideo();
	}

	// ___________________________________________________________________ Ready

	#onReady() {
		ApplicationLogger.log('DirectableVimeo onReady', this.#LOG_LEVEL);

		// Set Size
		this.setSize(this.#width, this.#height);
	}

	// ____________________________________________________________________ Play

	async #playVideo() {
		// Play Video
		try {
			await this.#PLAYER.play();
			ApplicationLogger.log(' - Video started playing', this.#LOG_LEVEL);
		} catch (error) {
			ApplicationLogger.error(
				' - Error starting video',
				error,
				this.#LOG_LEVEL,
			);
		}
	}

	#onPlay() {
		ApplicationLogger.log('DirectableVimeo onPlay', this.#LOG_LEVEL);
	}

	// ____________________________________________________________________ Size

	setSize(width, height) {
		ApplicationLogger.log('DirectableVimeo setSize', width, height);

		// Store
		this.#width = width;
		this.#height = height;

		// Size Holder
		this.#HOLDER.style.width = width + 'px';
		this.#HOLDER.style.height = height + 'px';

		// Size Iframe ?
		const iframe = this.#HOLDER.querySelector('iframe');

		if (!iframe) {
			ApplicationLogger.log(' - No iframe');

			return;
		}

		iframe.style.width = `${width}px`;
		iframe.style.height = `${height}px`;
	}
}
