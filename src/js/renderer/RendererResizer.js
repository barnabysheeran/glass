import ApplicationConfiguration from '../application/ApplicationConfiguration';
import ApplicationLogger from '../application/ApplicationLogger';

import OverlayDispatcher from '../overlay/dispatcher/OverlayDispatcher';

export default class RendererResizer {
	#VIEW_HOLDER;

	#SCALE_MODES = {
		SCALE_MODE_WIDE_2_39_1: 'SCALE_MODE_WIDE_2_39_1',
		SCALE_MODE_WIDE_2_1: 'SCALE_MODE_WIDE_2_1',
		SCALE_MODE_WIDE_4_3: 'SCALE_MODE_WIDE_4_3',
		SCALE_MODE_SQUARE: 'SCALE_MODE_SQUARE',
		SCALE_MODE_PAPER_A: 'SCALE_MODE_PAPER_A',
		SCALE_MODE_FILL: 'SCALE_MODE_FILL',
		SCALE_MODE_1280_720: 'SCALE_MODE_1280_720',
		SCALE_MODE_1024_1024: 'SCALE_MODE_1024_1024',
		SCALE_MODE_2048_1024: 'SCALE_MODE_2048_1024',
	};

	#scaleMode = this.#SCALE_MODES.SCALE_MODE_SQUARE; // Set initial scale mode

	#width = -1;
	#height = -1;

	#top = -1;
	#left = -1;

	// _________________________________________________________________________

	constructor(viewHolder) {
		// Store
		this.#VIEW_HOLDER = viewHolder;

		// Dispatcher Overlay Format
		OverlayDispatcher.on(
			'format-button-wide-2-39-1',
			this.#onOverlayButtonAspectWide2_39_1.bind(this),
		);

		OverlayDispatcher.on(
			'format-button-wide-2-1',
			this.#onOverlayButtonAspectWide2_1.bind(this),
		);

		OverlayDispatcher.on(
			'format-button-wide-4-3',
			this.#onOverlayButtonAspectWide4_3.bind(this),
		);

		OverlayDispatcher.on(
			'format-button-square',
			this.#onOverlayButtonAspectSquare.bind(this),
		);

		OverlayDispatcher.on(
			'format-button-paper-a',
			this.#onOverlayButtonAspectPaperA.bind(this),
		);

		OverlayDispatcher.on(
			'format-button-fill',
			this.#onOverlayButtonAspectFill.bind(this),
		);

		// Dispatcher Overlay Media
		OverlayDispatcher.on(
			'media-button-1280-720',
			this.#onOverlayButtonMedia1280_720.bind(this),
		);

		OverlayDispatcher.on(
			'media-button-1024-1024',
			this.#onOverlayButtonMedia1024_1024.bind(this),
		);

		OverlayDispatcher.on(
			'media-button-2048-1024',
			this.#onOverlayButtonMedia2048_1024.bind(this),
		);

		// Initial Resize
		// this.resize();
	}

	// _______________________________________________ Dispatcher Overlay Format

	#onOverlayButtonAspectWide2_39_1() {
		ApplicationLogger.log('ViewShaper. onOverlayButtonAspectWide2_39_1', 1);

		this.#scaleMode = this.#SCALE_MODES.SCALE_MODE_WIDE_2_39_1;
	}

	#onOverlayButtonAspectWide2_1() {
		ApplicationLogger.log('ViewShaper. onOverlayButtonAspectWide2_1', 1);

		this.#scaleMode = this.#SCALE_MODES.SCALE_MODE_WIDE_2_1;
	}

	#onOverlayButtonAspectWide4_3() {
		ApplicationLogger.log('ViewShaper. onOverlayButtonAspectWide4_3', 1);

		this.#scaleMode = this.#SCALE_MODES.SCALE_MODE_WIDE_4_3;
	}

	#onOverlayButtonAspectSquare() {
		ApplicationLogger.log('ViewShaper. onOverlayButtonAspectSquare', 1);

		this.#scaleMode = this.#SCALE_MODES.SCALE_MODE_SQUARE;
	}

	#onOverlayButtonAspectPaperA() {
		ApplicationLogger.log('ViewShaper. onOverlayButtonAspectPaperA', 1);

		this.#scaleMode = this.#SCALE_MODES.SCALE_MODE_PAPER_A;
	}

	#onOverlayButtonAspectFill() {
		ApplicationLogger.log('ViewShaper. onOverlayButtonAspectFill', 1);

		this.#scaleMode = this.#SCALE_MODES.SCALE_MODE_FILL;
	}

	// ________________________________________________ Dispatcher Overlay Media

	#onOverlayButtonMedia1280_720() {
		ApplicationLogger.log('ViewShaper. onOverlayButtonMedia1280_720', 1);

		this.#scaleMode = this.#SCALE_MODES.SCALE_MODE_1280_720;
	}

	#onOverlayButtonMedia1024_1024() {
		ApplicationLogger.log('ViewShaper. onOverlayButtonMedia1024_1024', 1);

		this.#scaleMode = this.#SCALE_MODES.SCALE_MODE_1024_1024;
	}

	#onOverlayButtonMedia2048_1024() {
		ApplicationLogger.log('ViewShaper. onOverlayButtonMedia2048_1024', 1);

		this.#scaleMode = this.#SCALE_MODES.SCALE_MODE_2048_1024;
	}

	// __________________________________________________________________ Resize

	tick() {
		// Assume No Change
		let didResizeThisFrame = false;

		// Get Rectangle
		const APPLICATION_RECTANGLE =
			ApplicationConfiguration.getApplicationContainer().getBoundingClientRect();

		// Get Width
		const APPLICATION_WIDTH = APPLICATION_RECTANGLE.width;
		const APPLICATION_HEIGHT = APPLICATION_RECTANGLE.height;

		const APPLICATION_MIN = Math.min(APPLICATION_WIDTH, APPLICATION_HEIGHT);

		let width = 0;
		let height = 0;

		let top = 0;
		let left = 0;

		// Scale Mode
		switch (this.#scaleMode) {
			case this.#SCALE_MODES.SCALE_MODE_WIDE_2_39_1:
				// Wide 2:39:1
				width = APPLICATION_WIDTH;
				height = APPLICATION_WIDTH * 0.208;

				top = (APPLICATION_HEIGHT - height) * 0.5;
				left = 0;

				break;

			case this.#SCALE_MODES.SCALE_MODE_WIDE_2_1:
				// Wide 2:1
				width = APPLICATION_WIDTH;
				height = APPLICATION_WIDTH * 0.5;

				top = (APPLICATION_HEIGHT - height) * 0.5;
				left = 0;

				break;

			case this.#SCALE_MODES.SCALE_MODE_WIDE_4_3:
				// Wide 4:3
				width = APPLICATION_WIDTH;
				height = APPLICATION_WIDTH * 0.75;

				top = (APPLICATION_HEIGHT - height) * 0.5;
				left = 0;

				break;

			case this.#SCALE_MODES.SCALE_MODE_SQUARE:
				// Square
				width = APPLICATION_MIN;
				height = APPLICATION_MIN;

				top = (APPLICATION_HEIGHT - height) * 0.5;
				left = (APPLICATION_WIDTH - width) * 0.5;

				break;

			case this.#SCALE_MODES.SCALE_MODE_PAPER_A:
				// Paper A
				width = APPLICATION_MIN * 0.707;
				height = APPLICATION_MIN;

				top = (APPLICATION_HEIGHT - height) * 0.5;
				left = (APPLICATION_WIDTH - width) * 0.5;

				break;

			case this.#SCALE_MODES.SCALE_MODE_FILL:
				// Fill
				width = APPLICATION_WIDTH;
				height = APPLICATION_HEIGHT;

				top = 0;
				left = 0;

				break;

			case this.#SCALE_MODES.SCALE_MODE_1280_720:
				// 1280:720
				width = 1280;
				height = 720;

				top = (APPLICATION_HEIGHT - height) * 0.5;
				left = (APPLICATION_WIDTH - width) * 0.5;

				break;

			case this.#SCALE_MODES.SCALE_MODE_1024_1024:
				// 1024:1024
				width = 1024;
				height = 1024;

				top = (APPLICATION_HEIGHT - height) * 0.5;
				left = (APPLICATION_WIDTH - width) * 0.5;

				break;

			case this.#SCALE_MODES.SCALE_MODE_2048_1024:
				// 2048:1024
				width = 2048;
				height = 1024;

				top = (APPLICATION_HEIGHT - height) * 0.5;
				left = (APPLICATION_WIDTH - width) * 0.5;

				break;

			default:
				break;
		}

		// Int
		width = Math.floor(width);
		height = Math.floor(height);

		top = Math.floor(top);
		left = Math.floor(left);

		// Changed Width Height ?
		if (width !== this.#width || height !== this.#height) {
			// Set
			this.#VIEW_HOLDER.style.width = `${width}px`;
			this.#VIEW_HOLDER.style.height = `${height}px`;

			// Store
			this.#width = width;
			this.#height = height;

			// Resized This Frame
			didResizeThisFrame = true;
		}

		// Changed Top Left ? - Move Holder
		if (top !== this.#top || left !== this.#left) {
			// Set
			this.#VIEW_HOLDER.style.top = `${top}px`;
			this.#VIEW_HOLDER.style.left = `${left}px`;

			// Store
			this.#top = top;
			this.#left = left;
		}

		return didResizeThisFrame;
	}

	// __________________________________________________________________ Access

	getWidth() {
		return this.#width;
	}

	getHeight() {
		return this.#height;
	}
}
