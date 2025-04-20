import Overlay from '../overlay/Overlay.js';

// import PieceOne from '../piece/pieces/PieceOne';
// import Renderer from '../renderer/Renderer';

export default class Controller {
	#FRAMERATE_FPS = 20;
	#FRAMERATE_MS = 1000 / this.#FRAMERATE_FPS;

	#frameRateDelayMS = 0;

	#OVERLAY;
	// #PIECE;

	// _________________________________________________________________________

	constructor() {
		// Create Overlay
		this.#OVERLAY = new Overlay();

		// Create Piece
		// this.#PIECE = new PieceOne();

		// Initialise Renderer
		// Renderer.initialise();
	}

	// ____________________________________________________________________ Tick

	tick(frameDeltaMS) {
		// Tick
		// this.#PIECE.tick(frameDeltaMS);

		// Frame Rate Delay
		this.#frameRateDelayMS += frameDeltaMS;

		// Next Frame Rate Frame ?
		if (this.#frameRateDelayMS > this.#FRAMERATE_MS) {
			// Reset
			this.#frameRateDelayMS -= this.#FRAMERATE_MS;

			// Tick Piece at Frame Rate
			// this.#PIECE.tickFrameRate();
		}

		// Render
		// Renderer.tick(frameDeltaMS);
	}
}
