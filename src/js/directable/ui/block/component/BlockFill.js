export default class BlockFrame {
	#BLOCK;
	#CANVAS;
	#CONTEXT;

	#fillStyle = 'gray';
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

		// Draw Progress
		let pX = this.#drawProgressPx - this.#frameThicknessPx;

		if (pX > this.#CANVAS.width - this.#frameThicknessPx * 2) {
			pX = this.#CANVAS.width - this.#frameThicknessPx * 2;
		}

		this.#CONTEXT.fillRect(
			this.#frameThicknessPx,
			this.#frameThicknessPx,
			pX,
			this.#CANVAS.height - this.#frameThicknessPx * 2,
		);

		// this.#CONTEXT.fillRect(0, 0, this.#CANVAS.width, this.#CANVAS.height);
	}
}
