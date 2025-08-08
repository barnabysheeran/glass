import YouTubePlayer from 'youtube-player';

import ApplicationLogger from '../../application/ApplicationLogger.js';

export default class MediaSurfaceYoutube {
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
	#isReady = false;
	#IFRAME; // Add a property to hold the iframe reference
	#PLAY_BUTTON = null; // To hold the play button element
	#hasStartedPlaying = false; // To track if playback has begun
	#playCheckTimeout = null; // To hold the timeout ID

	#LOG_LEVEL = 1;

	// _________________________________________________________________________

	constructor(container, youtubeId, width, height) {
		ApplicationLogger.log(
			`MediaSurfaceYoutube ${youtubeId} ${width} ${height}`,
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
		this.#HOLDER.style.opacity = 0.5;
		this.#HOLDER.style.position = 'relative'; // Set positioning context for the button
		this.#CONTAINER.appendChild(this.#HOLDER);

		// Create a YouTube Player Instance
		this.#PLAYER = YouTubePlayer(this.#HOLDER, {
			videoId: youtubeId,
			playerVars: {
				autoplay: 0, // Rely on explicit playVideo() call
				controls: 0,
				disablekb: 1, // Disable keyboard controls
				enablejsapi: 1, // Enable JavaScript API
				iv_load_policy: 3, // Hide annotations
				showinfo: 0, // Hide video title and uploader
				loop: 1,
				playlist: youtubeId, // Required for loop to work
				mute: 1, // Start muted, control volume via API
				playsinline: 1, // Play inline on mobile
				rel: 0, // Related videos from the same channel
			},
		});

		// Add event listeners
		this.#PLAYER.on('ready', this.#onReady.bind(this));
		this.#PLAYER.on('stateChange', this.#onStateChange.bind(this));
	}

	// ____________________________________________________________________ Tick

	tick() {
		// Lerp Opacity
		this.#opacity += (this.#opacityTarget - this.#opacity) * this.#LERP;

		// Lerp Volume
		this.#volume += (this.#volumeTarget - this.#volume) * this.#LERP;

		// Set Opacity on the iframe
		if (this.#IFRAME) {
			this.#IFRAME.style.opacity = this.#opacity;
		}

		// Set Volume
		if (this.#PLAYER && this.#isReady) {
			this.#PLAYER.setVolume(this.#volume * 100); // YouTube volume is 0-100
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

	// ___________________________________________________________ Player Events

	async #onReady(event) {
		ApplicationLogger.log(`MediaSurfaceYoutube onReady`, this.#LOG_LEVEL);

		// Get the iframe and store it
		this.#IFRAME = await this.#PLAYER.getIframe();
		this.#IFRAME.style.opacity = this.#opacity; // Set initial opacity

		this.#isReady = true;
		this.setSize(this.#width, this.#height);

		// Explicitly call playVideo() when ready for maximum compatibility,
		// especially on iOS Safari.
		try {
			await this.#PLAYER.playVideo();
			// Set a timeout to check if the video actually started playing
			this.#playCheckTimeout = setTimeout(() => {
				if (!this.#hasStartedPlaying) {
					ApplicationLogger.log(
						'MediaSurfaceYoutube: Autoplay failed, showing play button.',
						this.#LOG_LEVEL,
					);
					this.#showPlayButton();
				}
			}, 3000); // 3-second timeout
		} catch (error) {
			ApplicationLogger.error(
				`MediaSurfaceYoutube playVideo error: ${error.name}: ${error.message}`,
				this.#LOG_LEVEL,
			);
			// If playVideo() throws an error, show the button immediately.
			this.#showPlayButton();
		}
	}

	#onStateChange(event) {
		ApplicationLogger.log(
			`MediaSurfaceYoutube onStateChange: ${event.data}`,
			this.#LOG_LEVEL,
		);

		// event.data contains the player state
		// -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
		if (event.data === 1) {
			// playing
			this.#onPlay();
		}
	}

	#onPlay() {
		ApplicationLogger.log('MediaSurfaceYoutube onPlay', this.#LOG_LEVEL);

		this.#hasStartedPlaying = true;
		this.#hidePlayButton();

		// Unmute and fade in volume and opacity
		if (this.#PLAYER) {
			this.#PLAYER.unMute();
			this.#volumeTarget = 1;
		}

		this.#opacityTarget = 1;
	}

	// ____________________________________________________________________ Play Button

	#showPlayButton() {
		if (this.#PLAY_BUTTON) return; // Button already exists

		this.#PLAY_BUTTON = document.createElement('button');
		this.#PLAY_BUTTON.className = 'video-play-button';
		this.#PLAY_BUTTON.innerText = '▶'; // Simple play icon

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
			pointerEvents: 'auto', // Ensure the button is clickable
			cursor: 'pointer',
		});

		this.#HOLDER.appendChild(this.#PLAY_BUTTON);

		this.#PLAY_BUTTON.addEventListener('click', async () => {
			try {
				await this.#PLAYER.playVideo();
				this.#hidePlayButton();
			} catch (e) {
				ApplicationLogger.error(
					'Failed to play video on button click.',
					this.#LOG_LEVEL,
				);
			}
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
		ApplicationLogger.log('MediaSurfaceYoutube stop', this.#LOG_LEVEL);

		// Pause Video
		if (this.#PLAYER) {
			this.#PLAYER.pauseVideo();
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
			`MediaSurfaceYoutube setSize ${widthPx}, ${heightPx}`,
			this.#LOG_LEVEL,
		);

		// Store
		this.#width = widthPx;
		this.#height = heightPx;

		// Size Holder
		if (this.#HOLDER) {
			this.#HOLDER.style.width = widthPx + 'px';
			this.#HOLDER.style.height = heightPx + 'px';
		}

		// Size the iframe to be full-width, maintain aspect ratio, and be vertically centered
		if (this.#IFRAME) {
			const videoAspectRatio = 16 / 9;
			const newVideoWidth = widthPx;
			const newVideoHeight = newVideoWidth / videoAspectRatio;

			this.#IFRAME.style.width = `${newVideoWidth}px`;
			this.#IFRAME.style.height = `${newVideoHeight}px`;
			this.#IFRAME.style.left = `0px`;
			this.#IFRAME.style.top = `${(heightPx - newVideoHeight) / 2}px`;
		}
	}

	// _________________________________________________________________ Destroy

	destroy() {
		ApplicationLogger.log('MediaSurfaceYoutube destroy', this.#LOG_LEVEL);

		this.#hidePlayButton(); // Ensure button and timeout are cleaned up

		if (this.#PLAYER) {
			this.#PLAYER.destroy();
			this.#PLAYER = null;
		}

		// The holder is now empty after player.destroy(), so we can remove it.
		if (this.#HOLDER) {
			this.#HOLDER.remove();
			this.#HOLDER = null;
		}

		this.#IFRAME = null;
	}
}
