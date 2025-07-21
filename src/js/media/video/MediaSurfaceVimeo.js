import player from '@vimeo/player';

import ApplicationLogger from '../../application/ApplicationLogger.js';

export default class DirectableVimeo {
	#CONTAINER;

	#HOLDER;
	#PLAYER;

	#width;
	#height;

	#opacity = 0;
	#opacityTarget = 0;

	#volume = 0;
	#volumeTarget = 0;

	#LERP = 0.05;
	#LERP_MARGIN = 0.01;

	#isStopping = false;

	#LOG_LEVEL = 1;

	// _________________________________________________________________________

	constructor(container, vimeoId) {
		ApplicationLogger.log(`DirectableVimeo ${vimeoId}`, this.#LOG_LEVEL);

		// Store
		this.#CONTAINER = container;

		// Create Player
		this.#createPlayer(vimeoId);
	}

	// ____________________________________________________________________ Tick

	tick() {
		// Lerp Opacity
		this.#opacity += (this.#opacityTarget - this.#opacity) * this.#LERP;

		// Lerp Volume
		this.#volume += (this.#volumeTarget - this.#volume) * this.#LERP;

		// Set Opacity
		if (this.#HOLDER) {
			this.#HOLDER.style.opacity = this.#opacity;
		}

		// Set Volume
		if (this.#PLAYER) {
			this.#PLAYER.setVolume(this.#volume).catch((error) => {
				ApplicationLogger.error(
					`DirectableVimeo setVolume error: ${error.message}`,
					this.#LOG_LEVEL,
				);
			});
		}

		if (
			this.#isStopping &&
			this.#opacity <= this.#LERP_MARGIN &&
			this.#volume <= this.#LERP_MARGIN
		) {
			this.#HOLDER.remove();

			this.#HOLDER = null;
			this.#PLAYER = null;

			return true;
		}

		// Return Not Complete
		return false;
	}

	// __________________________________________________________________ Player

	#createPlayer(vimeoId) {
		ApplicationLogger.log(
			`DirectableVimeo createPlayer ${vimeoId}`,
			this.#LOG_LEVEL,
		);

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'vimeo-holder';
		this.#HOLDER.className = 'vimeo-holder';
		this.#CONTAINER.appendChild(this.#HOLDER);

		// Create a Vimeo Player Instance
		const OPTIONS = {
			id: vimeoId,
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

		// Set Opacity Target
		this.#opacityTarget = 1;

		// Set Volume Target
		this.#volumeTarget = 1;
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

	// ____________________________________________________________________ Stop

	stop() {
		ApplicationLogger.log('DirectableVimeo stop', this.#LOG_LEVEL);

		// Pause Video
		if (this.#PLAYER) {
			this.#PLAYER.pause().catch((error) => {
				ApplicationLogger.error(
					`DirectableVimeo pause error: ${error.message}`,
					this.#LOG_LEVEL,
				);
			});
		}

		// Set Opacity Target
		this.#opacityTarget = 0;

		// Set Volume Target
		this.#volumeTarget = 0;

		// Set Stopping Flag
		this.#isStopping = true;
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
