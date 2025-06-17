import ApplicationDispatcher from '../../../application-dispatcher/ApplicationDispatcher';
import ApplicationLogger from '../../../application/ApplicationLogger';

import UIGridController from '../../grid/UIGridController';

import BlockStates from '../enum/BlockStates';

import BlockLoader from '../component/BlockLoader';
import BlockFrame from '../component/BlockFrame';
import BlockFill from '../component/BlockFill';

// Base Class for Blocks

export default class Block {
	CANVAS;
	CONTEXT;

	GRID_CELL_WIDTH;
	GRID_CELL_HEIGHT;

	blockWidthPx = 0;
	blockHeightPx = 0;

	FRAME_THICKNESS_PX = 2;

	fillStyle = 'white';

	#BLOCK_FILL;
	#BLOCK_FRAME;
	#BLOCK_LOADER;

	#state = BlockStates.IDLE;

	#isDrawing = false;
	#drawProgressPx = 0;

	#preDrawDelayFrames = 0;
	#PRE_DRAW_DELAY_FRAMES_MAX = 8;

	#drawDelayFrames = 0;
	#DRAW_DELAY_FRAMES_MAX = 1;

	#LOG_LEVEL = 5;

	// _________________________________________________________________________

	constructor(container, gridCellWidth, gridCellHeight, frameThicknessPx) {
		// Store
		this.GRID_CELL_WIDTH = gridCellWidth;
		this.GRID_CELL_HEIGHT = gridCellHeight;
		this.FRAME_THICKNESS_PX = frameThicknessPx;

		// Create Canvas
		this.CANVAS = document.createElement('canvas');
		this.CANVAS.id = 'block';
		this.CANVAS.style.position = 'absolute';
		this.CANVAS.style.pointerEvents = 'auto';
		this.CANVAS.style.cursor = 'pointer';
		container.appendChild(this.CANVAS);

		// This canvas will frequently be written to
		this.CANVAS.willReadFrequently = true;

		// Get Context
		this.CONTEXT = this.CANVAS.getContext('2d');

		// Set Size
		this.#setPixelSize();

		// Create Components - Draw Order
		this.#BLOCK_FILL = new BlockFill(this, this.CANVAS, this.CONTEXT);
		this.#BLOCK_FRAME = new BlockFrame(this, this.CANVAS, this.CONTEXT);
		this.#BLOCK_LOADER = new BlockLoader(this, this.CANVAS, this.CONTEXT);
	}

	// ____________________________________________________________________ Tick

	tick() {
		// Order Important

		// Tick Loader
		this.#BLOCK_LOADER.tick();

		// Pre Drawing ?
		if (this.#preDrawDelayFrames < this.#PRE_DRAW_DELAY_FRAMES_MAX) {
			this.#preDrawDelayFrames += 1;

			return;
		}

		// Drawing ?
		if (this.#isDrawing === false) {
			return;
		}

		// Delayed ?
		if (this.#drawDelayFrames < this.#DRAW_DELAY_FRAMES_MAX) {
			this.#drawDelayFrames += 1;

			return;
		}

		// Next
		this.#drawProgressPx += this.FRAME_THICKNESS_PX;

		if (this.#drawProgressPx >= this.blockWidthPx) {
			// Stop Drawing
			this.#isDrawing = false;
		}

		// Draw
		this.#drawProgress();

		// Reset Delay
		this.#drawDelayFrames = 0;

		// Tick in Order
		this.#BLOCK_FILL.tick();
		this.#BLOCK_FRAME.tick();
	}

	// ____________________________________________________________________ Load

	load() {
		// Start Block Loader
		this.#BLOCK_LOADER.draw();

		// Set State
		this.#state = BlockStates.LOADING;
	}

	setLoadBarTarget(target) {
		// Loader
		this.#BLOCK_LOADER.setLoadBarTarget(target);
	}

	onLoadComplete() {
		// Ready
		this.#onReady();

		// Dispatch Event
		ApplicationDispatcher.dispatch('ui-block-loaded');
	}

	// ___________________________________________________________________ Ready

	#onReady() {
		ApplicationLogger.log('Block. onReady', this.#LOG_LEVEL);

		// Set State
		this.#state = BlockStates.READY;

		// Add Interaction
		this.CANVAS.onclick = this.onHolderClick.bind(this);
		this.CANVAS.onmouseenter = this.onHolderOver.bind(this);
		this.CANVAS.onmouseleave = this.onHolderOut.bind(this);

		// Draw in Order
		this.#BLOCK_FILL.draw(this.FRAME_THICKNESS_PX);
		this.#BLOCK_FRAME.draw(this.FRAME_THICKNESS_PX);
	}

	// __________________________________________________________________ Canvas

	#clearCanvas() {
		this.CONTEXT.clearRect(0, 0, this.blockWidthPx, this.blockHeightPx);
	}

	// _____________________________________________________________ Interaction

	onHolderOver() {
		ApplicationLogger.log('Block onHolderOver', this.#LOG_LEVEL);

		// TODO Screen Position Data

		// Clear
		this.#clearCanvas();

		// Frame
		this.#BLOCK_FRAME.draw(this.FRAME_THICKNESS_PX);
		this.#BLOCK_FILL.draw(this.FRAME_THICKNESS_PX);

		// Dispatch Event
		ApplicationDispatcher.dispatch('ui-block-over', {
			screenProportionTop: 0,
			screenProportionLeft: 0,
			blockWidthPx: this.blockWidthPx,
			blockHeightPx: this.blockHeightPx,
		});
	}

	onHolderOut() {
		// ApplicationLogger.log('Block. onHolderOut', this.#LOG_LEVEL);

		// TODO Screen Position Data

		// Clear
		this.#clearCanvas();

		// Frame
		this.#BLOCK_FRAME.draw(this.FRAME_THICKNESS_PX);
		this.#BLOCK_FILL.draw(this.FRAME_THICKNESS_PX);

		// Dispatch Event
		ApplicationDispatcher.dispatch('ui-block-out', {
			screenProportionTop: 0,
			screenProportionLeft: 0,
			blockWidthPx: this.blockWidthPx,
			blockHeightPx: this.blockHeightPx,
		});
	}

	/* eslint-disable-next-line class-methods-use-this */
	onHolderClick() {
		// Stub
	}

	// _____________________________________________________________ Play / Stop

	// TODO Used

	play() {
		if (this.#state === BlockStates.PLAYING) return;

		if (this.#state === BlockStates.READY) {
			this.#state = BlockStates.PLAYING;
		}
	}

	stop() {
		this.#state = BlockStates.READY;
	}

	// ________________________________________________________________ Position

	setPosition(leftPx, topPx) {
		// Set Position
		this.CANVAS.style.left = `${leftPx}px`;
		this.CANVAS.style.top = `${topPx}px`;
	}

	// ____________________________________________________________________ Size

	#setPixelSize() {
		const CELL_WIDTH_X = UIGridController.getCellWidthPx();
		const CELL_MARGIN_WIDTH_PX = UIGridController.getCellMarginWidthPx();

		const CELL_HEIGHT_Y = UIGridController.getCellHeightPx();
		const CELL_MARGIN_HEIGHT_PX = UIGridController.getCellMarginHeightPx();

		this.blockWidthPx =
			CELL_WIDTH_X * this.GRID_CELL_WIDTH +
			CELL_MARGIN_WIDTH_PX * (this.GRID_CELL_WIDTH - 1);

		this.blockHeightPx =
			CELL_HEIGHT_Y * this.GRID_CELL_HEIGHT +
			CELL_MARGIN_HEIGHT_PX * (this.GRID_CELL_HEIGHT - 1);

		// Set Canvas
		this.CANVAS.width = this.blockWidthPx;
		this.CANVAS.height = this.blockHeightPx;

		this.CANVAS.style.width = `${this.blockWidthPx}px`;
		this.CANVAS.style.height = `${this.blockHeightPx}px`;
	}

	// ________________________________________________________________ Draw RGB

	draw() {
		// Draw
		this.#drawProgressPx = 0;
		this.#drawDelayFrames = 0;
		this.preDrawDelayFrames = 0;

		this.#isDrawing = true;
	}

	#drawProgress() {
		// Draw
		this.CONTEXT.fillStyle = this.fillStyle;

		// Draw Progress
		let pX = this.#drawProgressPx - this.FRAME_THICKNESS_PX;

		if (pX > this.blockWidthPx - this.FRAME_THICKNESS_PX * 2) {
			pX = this.blockWidthPx - this.FRAME_THICKNESS_PX * 2;
		}

		this.CONTEXT.fillRect(
			this.FRAME_THICKNESS_PX,
			this.FRAME_THICKNESS_PX,
			pX,
			this.blockHeightPx - this.FRAME_THICKNESS_PX * 2,
		);
	}

	// _______________________________________________________________ Show Hide

	show() {
		this.CANVAS.style.display = 'block';
	}

	hide() {
		this.CANVAS.style.display = 'none';
	}

	// __________________________________________________________________ Access

	getGridCellWidth() {
		return this.GRID_CELL_WIDTH;
	}

	getGridCellHeight() {
		return this.GRID_CELL_HEIGHT;
	}
}
