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

	#LERP = 0.015;
	#LERP_MARGIN = 0.01;

	#isStopping = false;
	#PLAY_BUTTON = null; // To hold the play button element
	#hasStartedPlaying = false; // To track if playback has begun
	#playCheckTimeout = null; // To hold the timeout ID

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

		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'video-holder';
		this.#HOLDER.className = 'video-holder';
		this.#CONTAINER.appendChild(this.#HOLDER);

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
		this.#PLAYER = new player(this.#HOLDER, OPTIONS);

		// Add Event Listeners
		this.#PLAYER.ready().then(this.#onReady.bind(this));

		this.#PLAYER.on('play', this.#onPlay.bind(this));
		this.#PLAYER.on('loaded', this.#onLoaded.bind(this));
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

	// __________________________________________________________________ Loaded

	#onLoaded(data) {
		ApplicationLogger.log(
			`MediaSurfaceVimeo onLoaded: video ${data.id} has loaded.`,
			this.#LOG_LEVEL,
		);

		// The 'loaded' event confirms the video data is available.
		// We will trigger the fade-in here.
		this.#opacityTarget = 1;
	}

	// ___________________________________________________________________ Ready

	#onReady() {
		ApplicationLogger.log('MediaSurfaceVimeo onReady', this.#LOG_LEVEL);

		// Set Size
		this.setSize(this.#width, this.#height);

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

	// ____________________________________________________________________ Play Button

	#showPlayButton() {
		if (this.#PLAY_BUTTON) return; // Button already exists

		this.#PLAY_BUTTON = document.createElement('button');
		this.#PLAY_BUTTON.className = 'video-play-button';
		this.#PLAY_BUTTON.innerText = '▶';

		// Apply styles directly to the element
		Object.assign(this.#PLAY_BUTTON.style, {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			zIndex: '10',
			padding: '1em 2em',
			fontSize: '2rem',
			background: 'rgba(0, 0, 0, 0.5)',
			color: 'white',
			border: '2px solid white',
			borderRadius: '10px',
			pointerEvents: 'auto',
			cursor: 'pointer',
		});

		this.#HOLDER.appendChild(this.#PLAY_BUTTON);

		this.#PLAY_BUTTON.addEventListener('click', () => {
			this.#playVideo();
			// The onPlay handler will hide the button
		});
	}

	#hidePlayButton() {
		clearTimeout(this.#playCheckTimeout);
		if (this.#PLAY_BUTTON) {
			this.#PLAY_BUTTON.remove();
			this.#PLAY_BUTTON = null;
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

		this.#hidePlayButton(); // Ensure button and timeout are cleaned up

		if (this.#PLAYER) {
			this.#PLAYER.destroy();
			this.#PLAYER = null;
		}
	}
}
