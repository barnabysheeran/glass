export default class BlockLoader {
	#BLOCK;
	#CANVAS;
	#CONTEXT;

	#LOAD_BAR_LERP = 0.5; // 0.15;
	#LOAD_BAR_COMPLETE_MARGIN = 0.02;

	#isDrawing = false;

	fillStyle = 'white';

	#loadBar = 0;
	#loadBarTarget = 0;

	// __________________________________________________________________________

	constructor(block, canvas, context) {
		// Store
		this.#BLOCK = block;
		this.#CANVAS = canvas;
		this.#CONTEXT = context;
	}

	// ____________________________________________________________________ Tick

	tick() {
		// Drawing ?
		if (!this.#isDrawing) {
			return;
		}

		// Progress Load Bar
		this.#loadBar +=
			(this.#loadBarTarget - this.#loadBar) * this.#LOAD_BAR_LERP;

		// Set Load Bar Width
		this.setLoadBarWidth(this.#loadBar);

		// Loading Complete ?
		if (this.#loadBar > 1.0 - this.#LOAD_BAR_COMPLETE_MARGIN) {
			// Load Complete
			this.#onLoadComplete();
		}
	}

	// ____________________________________________________________________ Draw

	// Starts Draw Left Right
	draw() {
		// Reset
		this.#loadBar = 0;
		this.#loadBarTarget = 0;

		// Start Drawing
		this.#isDrawing = true;
	}

	// ________________________________________________________________ Load Bar

	setLoadBarTarget(target) {
		this.#loadBarTarget = target;
	}

	setLoadBarWidth(proportionIn) {
		const PROPORTION_PX = this.#CANVAS.width * proportionIn;

		// round down
		// TODO Size from GridController ?
		const ROUNDED = PROPORTION_PX - (PROPORTION_PX % 4);

		// Fill Context
		this.#CONTEXT.fillStyle = this.fillStyle;
		this.#CONTEXT.fillRect(0, 0, ROUNDED, this.#CANVAS.height);
	}

	#onLoadComplete() {
		// Stop Drawing
		this.#isDrawing = false;

		// Load Complete
		this.#BLOCK.onLoadComplete();
	}
}
