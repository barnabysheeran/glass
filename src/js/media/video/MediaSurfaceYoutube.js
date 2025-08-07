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
		this.#CONTAINER.appendChild(this.#HOLDER);

		// Create a YouTube Player Instance
		this.#PLAYER = YouTubePlayer(this.#HOLDER, {
			videoId: youtubeId,
			playerVars: {
				autoplay: 1,
				controls: 0,
				loop: 1,
				playlist: youtubeId, // Required for loop to work
				mute: 1, // Start muted, control volume via API
				playsinline: 1,
				rel: 0, // Do not show related videos
				modestbranding: 1, // Hide YouTube logo
				iv_load_policy: 3, // Hide annotations
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

		// Set Opacity
		if (this.#HOLDER) {
			this.#HOLDER.style.opacity = this.#opacity;
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

	#onReady(event) {
		ApplicationLogger.log(`MediaSurfaceYoutube onReady`, this.#LOG_LEVEL);

		this.#isReady = true;

		this.setSize(this.#width, this.#height);

		event.target.playVideo();
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

		// Unmute and fade in volume and opacity
		if (this.#PLAYER) {
			this.#PLAYER.unMute();
		}

		this.#opacityTarget = 1;
		this.#volumeTarget = 1;
	}

	// ____________________________________________________________________ Stop

	stop() {
		ApplicationLogger.log('MediaSurfaceYoutube stop', this.#LOG_LEVEL);

		// Pause Video
		if (this.#PLAYER) {
			// this.#PLAYER.pauseVideo();
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

		console.log(`MediaSurfaceYoutube setSize ${widthPx}, ${heightPx}`);

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

		console.log(`MediaSurfaceYoutube setSize iframe ${iframe}`);

		iframe.style.width = `${widthPx}px`;
		iframe.style.height = `${heightPx}px`;
	}

	// _________________________________________________________________ Destroy

	destroy() {
		ApplicationLogger.log('MediaSurfaceYoutube destroy', this.#LOG_LEVEL);

		if (this.#PLAYER) {
			console.log('- destroy player');

			this.#PLAYER.destroy();
			this.#PLAYER = null;
		}

		if (this.#HOLDER) {
			console.log('- destroy holder');

			this.#HOLDER.remove();
			this.#HOLDER = null;
		}
	}
}
