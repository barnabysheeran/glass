import player from '@vimeo/player';

import ApplicationConfiguration from '../../application/ApplicationConfiguration.js';

export default class DirectableVimeo {
	#HOLDER;
	#PLAYER;

	// _________________________________________________________________________

	constructor() {
		// Create Vimeo player
		this.player = null;
		this.#createPlayer();
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {}

	// __________________________________________________________________ Player

	#createPlayer() {
		// Create Holder
		this.#HOLDER = document.createElement('div');
		ApplicationConfiguration.getApplicationContainer().appendChild(
			this.#HOLDER,
		);

		// Create a Vimeo Player Instance
		const OPTIONS = {
			id: 12021447,
			width: 640,
			loop: true,
			background: true,
		};

		this.#PLAYER = new player(this.#HOLDER, OPTIONS);

		// Add event listeners if needed
		this.#PLAYER.on('play', () => {
			console.log('Video is playing');
		});
	}

	// ____________________________________________________________________ Size

	setSize(width, height) {
		// Set size logic for Vimeo if needed
	}
}
