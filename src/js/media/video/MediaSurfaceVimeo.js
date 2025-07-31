import player from '@vimeo/player';

import ApplicationLogger from '../../application/ApplicationLogger.js';

export default class MediaSurfaceVimeo {
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
		ApplicationLogger.log(`MediaSurfaceVimeo ${vimeoId}`, this.#LOG_LEVEL);

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
					`MediaSurfaceVimeo setVolume error: ${error.message}`,
					this.#LOG_LEVEL,
				);
			});
		}

		// Stopping ?
		if (
			this.#isStopping &&
			this.#opacity <= this.#LERP_MARGIN &&
			this.#volume <= this.#LERP_MARGIN
		) {
			return true;
		}

		// Return Not Complete
		return false;
	}

	// __________________________________________________________________ Player

	#createPlayer(vimeoId) {
		ApplicationLogger.log(
			`MediaSurfaceVimeo createPlayer ${vimeoId}`,
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
			controls: false,
			dnt: true, // Do Not Track
			responsive: false,
			width: this.#width,
		};

		// Create Player
		this.#PLAYER = new player(this.#HOLDER, OPTIONS);

		// Add Event Listeners
		this.#PLAYER.ready().then(this.#onReady.bind(this));

		this.#PLAYER.on('play', this.#onPlay.bind(this));
		this.#PLAYER.on('loaded', this.#onLoaded.bind(this));
	}

	// __________________________________________________________________ Loaded

	#onLoaded(data) {
		ApplicationLogger.log(
			`MediaSurfaceVimeo onLoaded: video ${data.id} has loaded.`,
			this.#LOG_LEVEL,
		);

		// Play Video
		this.#playVideo();

		// Show
		this.#opacityTarget = 1;
		this.#volumeTarget = 1;
	}

	// ___________________________________________________________________ Ready

	#onReady() {
		ApplicationLogger.log('MediaSurfaceVimeo onReady', this.#LOG_LEVEL);

		console.log('Ready');

		// Set Size
		this.setSize(this.#width, this.#height);
	}

	// ____________________________________________________________________ Play

	async #playVideo() {
		ApplicationLogger.log('MediaSurfaceVimeo playVideo', this.#LOG_LEVEL);

		// Play Video
		try {
			await this.#PLAYER.play();
		} catch (error) {
			ApplicationLogger.error(
				`MediaSurfaceVimeo play error: ${error.message}`,
				this.#LOG_LEVEL,
			);
		}
	}

	#onPlay() {
		ApplicationLogger.log('MediaSurfaceVimeo onPlay', this.#LOG_LEVEL);

		console.log('Play');
	}

	// ____________________________________________________________________ Stop

	stop() {
		ApplicationLogger.log('MediaSurfaceVimeo stop', this.#LOG_LEVEL);

		// Pause Video
		if (this.#PLAYER) {
			this.#PLAYER.pause().catch((error) => {
				ApplicationLogger.error(
					`MediaSurfaceVimeo pause error: ${error.message}`,
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

	setSize(widthPx, heightPx) {
		ApplicationLogger.log(
			`MediaSurfaceVimeo setSize ${widthPx}, ${heightPx}`,
			this.#LOG_LEVEL,
		);

		// Store
		this.#width = widthPx;
		this.#height = heightPx;

		// Size Holder
		this.#HOLDER.style.width = widthPx + 'px';
		this.#HOLDER.style.height = heightPx + 'px';

		// Size Iframe ?
		const iframe = this.#HOLDER.querySelector('iframe');

		if (!iframe) {
			ApplicationLogger.log(' - No iframe');

			return;
		}

		iframe.style.width = `${widthPx}px`;
		iframe.style.height = `${heightPx}px`;
	}

	// _________________________________________________________________ Destroy

	destroy() {
		ApplicationLogger.log('MediaSurfaceVimeo destroy', this.#LOG_LEVEL);

		// Remove Holder
		if (this.#HOLDER) {
			this.#HOLDER.remove();
			this.#HOLDER = null;
		}

		// Stop Player
		if (this.#PLAYER) {
			this.#PLAYER.destroy();
			this.#PLAYER = null;
		}
	}
}
