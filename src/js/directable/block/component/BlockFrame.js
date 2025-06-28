export default class BlockFrame {
	#BLOCK;
	#CANVAS;
	#CONTEXT;

	#fillStyle = 'white';
	#frameThicknessPx = 0;

	#isDrawing = false;
	#drawProgressPx = 0;

	#delayFrames = 0;
	#DELAY_FRAMES_MAX = 0;

	// _________________________________________________________________________

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

		// Delayed ?
		if (this.#delayFrames < this.#DELAY_FRAMES_MAX) {
			this.#delayFrames += 1;

			return;
		}

		// Next
		this.#drawProgressPx += this.#frameThicknessPx;

		if (this.#drawProgressPx >= this.#CANVAS.width) {
			// Stop Drawing
			this.#isDrawing = false;
		}

		// Draw Frame
		this.#drawFrame();

		// Reset Delay
		this.#delayFrames = 0;
	}

	// ____________________________________________________________________ Draw

	// Starts Draw Left Right
	draw(frameThicknessPx) {
		// Store
		this.#frameThicknessPx = frameThicknessPx;

		// Draw
		this.#drawProgressPx = 0;
		this.#isDrawing = true;
	}

	#drawFrame() {
		// Fill Style
		this.#CONTEXT.fillStyle = this.#fillStyle;

		// Top Border
		this.#CONTEXT.fillRect(0, 0, this.#drawProgressPx, this.#frameThicknessPx);

		// Bottom Border
		this.#CONTEXT.fillRect(
			0,
			this.#CANVAS.height - this.#frameThicknessPx,
			this.#drawProgressPx,
			this.#frameThicknessPx,
		);

		// Left Border
		if (this.#drawProgressPx > this.#frameThicknessPx) {
			this.#CONTEXT.fillRect(0, 0, this.#frameThicknessPx, this.#CANVAS.height);
		}

		// Right Border
		if (this.#drawProgressPx > this.#CANVAS.width - this.#frameThicknessPx) {
			this.#CONTEXT.fillRect(
				this.#CANVAS.width - this.#frameThicknessPx,
				0,
				this.#frameThicknessPx,
				this.#CANVAS.height,
			);
		}
	}
}
