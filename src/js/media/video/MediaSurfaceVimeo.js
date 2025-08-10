import player from '@vimeo/player';

import ApplicationLogger from '../../application/ApplicationLogger.js';

import MediaSurface from '../MediaSurface.js';

export default class MediaSurfaceVimeo {
	#CONTAINER;

	#HOLDER;

	#PLAYER_HOLDER;
	#PLAYER;

	#BUTTON_PLAY;

	#width;
	#height;

	#opacity = 0;
	#opacityTarget = 0;

	#volume = 0;
	#volumeTarget = 0;

	#LERP_SLOW;
	#LERP_MARGIN;

	#isStopping = false;

	#hasStartedPlaying = false;
	#playCheckTimeout = null;

	#LOG_LEVEL = -1; // 4;

	// _________________________________________________________________________

	constructor(container, vimeoId, width, height) {
		ApplicationLogger.log(
			`MediaSurfaceVimeo ${vimeoId} ${width} ${height}`,
			this.#LOG_LEVEL,
		);

		// Store
		this.#CONTAINER = container;
		this.#width = width;
		this.#height = height;

		this.#LERP_SLOW = MediaSurface.LERP_SLOW;
		this.#LERP_MARGIN = MediaSurface.LERP_MARGIN;

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'video-holder';
		this.#HOLDER.className = 'video-holder';
		this.#CONTAINER.appendChild(this.#HOLDER);

		// Create Player Holder
		this.#PLAYER_HOLDER = document.createElement('div');
		this.#PLAYER_HOLDER.id = 'player-holder';
		this.#PLAYER_HOLDER.className = 'player-holder';
		this.#HOLDER.appendChild(this.#PLAYER_HOLDER);

		// Create a Vimeo Player Instance
		const OPTIONS = {
			id: vimeoId,
			loop: true,
			controls: false,
			dnt: true, // Do Not Track
			responsive: false,
			width: this.#width,
			muted: true,
			autoplay: false, // Rely on explicit play() call
			playsinline: true, // Required for iOS
		};

		// Create Player
		this.#PLAYER = new player(this.#PLAYER_HOLDER, OPTIONS);

		// Add Event Listeners
		this.#PLAYER.ready().then(this.#onReady.bind(this));
		this.#PLAYER.on('play', this.#onPlay.bind(this));
		this.#PLAYER.on('pause', this.#onPause.bind(this));
		// this.#PLAYER.on('loaded', this.#onLoaded.bind(this));

		// Create Button Play
		this.#BUTTON_PLAY = document.createElement('div');
		this.#BUTTON_PLAY.className = 'button-play';
		this.#BUTTON_PLAY.innerText = '▶';
		this.#HOLDER.appendChild(this.#BUTTON_PLAY);

		// Add Event Listeners
		// this.#BUTTON_PLAY.addEventListener('click', () => {
		// 	this.#playVideo();
		// });

		this.#BUTTON_PLAY.addEventListener(
			'click',
			this.#onPlayButtonClick.bind(this),
		);
	}

	// ____________________________________________________________________ Tick

	tick() {
		// Lerp Opacity
		this.#opacity += (this.#opacityTarget - this.#opacity) * this.#LERP_SLOW;

		// Lerp Volume
		this.#volume += (this.#volumeTarget - this.#volume) * this.#LERP_SLOW;

		// Set Opacity
		if (this.#PLAYER_HOLDER) {
			this.#PLAYER_HOLDER.style.opacity = this.#opacity;
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

	// __________________________________________________________________ Loaded

	// #onLoaded(data) {
	// 	ApplicationLogger.log(
	// 		`MediaSurfaceVimeo onLoaded: video ${data.id} has loaded.`,
	// 		this.#LOG_LEVEL,
	// 	);
	// }

	// ___________________________________________________________________ Ready

	#onReady() {
		ApplicationLogger.log('MediaSurfaceVimeo onReady', this.#LOG_LEVEL);

		// Set Size
		this.setSize(this.#width, this.#height);

		// Start Fade In
		this.#opacityTarget = 1;

		// Explicitly call play() when ready.
		this.#playVideo();

		// Set a timeout to check if the video actually started playing
		this.#playCheckTimeout = setTimeout(() => {
			if (!this.#hasStartedPlaying) {
				ApplicationLogger.log(
					'MediaSurfaceVimeo: Autoplay failed, showing play button.',
					this.#LOG_LEVEL,
				);
				this.#showPlayButton();
			}
		}, 3000); // 3-second timeout
	}

	// ____________________________________________________________________ Play

	async #playVideo() {
		ApplicationLogger.log('MediaSurfaceVimeo playVideo', this.#LOG_LEVEL);

		// Play Video
		try {
			await this.#PLAYER.play();
		} catch (error) {
			ApplicationLogger.error(
				`MediaSurfaceVimeo playVideo error: ${error.name}: ${error.message}`,
				this.#LOG_LEVEL,
			);
			// If play() throws an error, show the button immediately.
			this.#showPlayButton();
		}
	}

	#onPlay() {
		ApplicationLogger.log('MediaSurfaceVimeo onPlay', this.#LOG_LEVEL);

		this.#hasStartedPlaying = true;

		this.#hidePlayButton();

		// The video is now playing, so we can try to fade in the volume.
		// This is allowed because a user gesture started this whole process.
		this.#volumeTarget = 1;
	}

	#onPause() {
		ApplicationLogger.log('MediaSurfaceVimeo onPause', this.#LOG_LEVEL);
		this.#showPlayButton();
	}

	// _____________________________________________________________ Play Button

	#showPlayButton() {
		this.#BUTTON_PLAY.style.opacity = 1;
	}

	#hidePlayButton() {
		this.#BUTTON_PLAY.style.opacity = 0;
	}

	async #onPlayButtonClick() {
		ApplicationLogger.log(
			'MediaSurfaceVimeo onPlayButtonClick',
			this.#LOG_LEVEL,
		);

		try {
			const isPaused = await this.#PLAYER.getPaused();
			if (isPaused) {
				this.#playVideo();
			} else {
				this.#PLAYER.pause();
			}
		} catch (error) {
			ApplicationLogger.error(
				`MediaSurfaceVimeo onPlayButtonClick error: ${error.name}: ${error.message}`,
				this.#LOG_LEVEL,
			);
		}
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
		this.#PLAYER_HOLDER.style.width = widthPx + 'px';
		this.#PLAYER_HOLDER.style.height = heightPx + 'px';

		// Size Iframe ?
		const iframe = this.#PLAYER_HOLDER.querySelector('iframe');

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

		this.#hidePlayButton(); // Ensure button and timeout are cleaned up

		// Player
		if (this.#PLAYER) {
			this.#PLAYER.destroy();
			this.#PLAYER = null;
		}

		// Holder
		if (this.#PLAYER_HOLDER) {
			this.#PLAYER_HOLDER.remove();
			this.#PLAYER_HOLDER = null;
		}
	}
}
