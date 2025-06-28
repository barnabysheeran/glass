import YouTubePlayer from 'youtube-player';

import ApplicationConfiguration from '../../application/ApplicationConfiguration.js';
import ApplicationLogger from '../../application/ApplicationLogger.js';

export default class DirectableYoutube {
	#HOLDER;
	#PLAYER;
	#videoAspectRatio = 16 / 9; // Default aspect ratio
	#isReady = false;

	#LOG_LEVEL = 1;

	// _________________________________________________________________________

	constructor() {
		ApplicationLogger.log('DirectableYoutube');

		// Create YouTube Player
		this.#createPlayer();
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {}

	// __________________________________________________________________ Player

	#createPlayer() {
		// Create Holder
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'youtube-holder';
		this.#HOLDER.className = 'youtube-holder';
		// this.#HOLDER.style.left = '100px';
		ApplicationConfiguration.getApplicationContainer().appendChild(
			this.#HOLDER,
		);

		// Create a YouTube Player Instance
		this.#PLAYER = YouTubePlayer(this.#HOLDER, {
			videoId: 'M7lc1UVf-VE', // Example video ID
			playerVars: {
				autoplay: 1,
				controls: 0,
				loop: 1,
				playlist: 'M7lc1UVf-VE', // Required for loop to work
				mute: 1,
				playsinline: 1,
			},
		});

		// Add event listeners
		this.#PLAYER.on('ready', this.#onReady.bind(this));
		this.#PLAYER.on('stateChange', this.#onStateChange.bind(this));
	}

	// ___________________________________________________________ Player Events

	#onReady(event) {
		this.#isReady = true;
		// Unlike Vimeo, YouTube API doesn't have a simple way to get video dimensions.
		// We will stick with the default 16:9 aspect ratio which is standard.
		const appContainer = ApplicationConfiguration.getApplicationContainer();
		this.setSize(appContainer.clientWidth, appContainer.clientHeight);
		event.target.playVideo();
	}

	#onStateChange(event) {
		// event.data contains the player state
		// -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
		if (event.data === 1) {
			this.#onPlay();
		}
	}

	#onPlay() {
		ApplicationLogger.log('YouTube video is playing', this.#LOG_LEVEL);
	}

	// ____________________________________________________________________ Size

	setSize(width, height) {
		if (!this.#HOLDER || !this.#isReady) {
			return;
		}

		this.#HOLDER.style.width = `${width}px`;
		this.#HOLDER.style.height = `${height}px`;

		const iframe = this.#HOLDER.querySelector('iframe');
		if (!iframe) {
			return;
		}

		const containerAspectRatio = width / height;
		let newVideoWidth = width;
		let newVideoHeight = height;

		if (containerAspectRatio > this.#videoAspectRatio) {
			newVideoWidth = width;
			newVideoHeight = width / this.#videoAspectRatio;
		} else {
			newVideoHeight = height;
			newVideoWidth = height * this.#videoAspectRatio;
		}

		iframe.style.width = `${newVideoWidth}px`;
		iframe.style.height = `${newVideoHeight}px`;
		iframe.style.left = `${(width - newVideoWidth) / 2}px`;
		iframe.style.top = `${(height - newVideoHeight) / 2}px`;
	}

	// ____________________________________________________________________ Public

	play() {
		if (this.#PLAYER) {
			this.#PLAYER.playVideo();
		}
	}

	pause() {
		if (this.#PLAYER) {
			this.#PLAYER.pauseVideo();
		}
	}

	stop() {
		if (this.#PLAYER) {
			this.#PLAYER.stopVideo();
		}
	}

	mute() {
		if (this.#PLAYER) {
			this.#PLAYER.mute();
		}
	}

	unmute() {
		if (this.#PLAYER) {
			this.#PLAYER.unmute();
		}
	}

	setVolume(volume) {
		if (this.#PLAYER) {
			this.#PLAYER.setVolume(volume);
		}
	}

	getVolume() {
		if (this.#PLAYER) {
			this.#PLAYER.getVolume().then((volume) => {
				return volume;
			});
		}

		return null;
	}

	// ____________________________________________________________________ Destroy

	destroy() {
		if (this.#PLAYER) {
			this.#PLAYER.destroy();
		}

		if (this.#HOLDER) {
			this.#HOLDER.remove();
		}
	}
}
