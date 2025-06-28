import ApplicationDispatcher from '../../application-dispatcher/ApplicationDispatcher';
import ApplicationLogger from '../../application/ApplicationLogger';

import UIGridController from '../grid/UIGridController';

import BlockTest from './block/BlockTest';

import BlockRGB from './block/rgb/BlockRGB';

export default class UIBlockController {
	static #HOLDER;

	static #BLOCKS = [];
	static #blockLoadingIndex = 0;

	static #LOG_LEVEL = 3;

	// _________________________________________________________________________

	static initialise(container) {
		// Calculate Holder Size
		const HOLDER_WIDTH_PX = UIGridController.getMaxWidthPx();
		const HOLDER_HEIGHT_PX = UIGridController.getMaxHeightPx();

		// Create Holder Blocks
		this.#HOLDER = document.createElement('div');
		this.#HOLDER.id = 'block-holder';
		this.#HOLDER.classList.add('full');
		this.#HOLDER.classList.add('centered');
		this.#HOLDER.style.width = `${HOLDER_WIDTH_PX}px`;
		this.#HOLDER.style.height = `${HOLDER_HEIGHT_PX}px`;
		this.#HOLDER.style.transform = 'translate(-50%, -50%)';
		container.appendChild(this.#HOLDER);

		// Dev Red Border
		// this.#HOLDER.style.border = '1px solid red';

		// Event Block Loaded
		ApplicationDispatcher.on('ui-block-loaded', this.#onBlockLoaded.bind(this));

		// Add Block Reset
		// const BLOCK_RESTART_MENU = new BlockTest(this.#HOLDER, 5, 5, 2);
		// this.#BLOCKS.push(BLOCK_RESTART_MENU);

		// Add Test Blocks
		// const BLOCK_TEST_TOTAL = 50;

		// for (let i = 0; i < BLOCK_TEST_TOTAL; i += 1) {
		// 	const width = Math.ceil(Math.random() * 2);
		// 	const height = Math.ceil(Math.random() * 2);

		// 	const block = new BlockTest(this.#HOLDER, width, height);
		// 	this.#BLOCKS.push(block);
		// }

		// Add RGB Blocks
		const BLOCK_RGB_TOTAL = 512;

		for (let i = 0; i < BLOCK_RGB_TOTAL; i += 1) {
			// Calculate Hue
			const hueStep = 360 / BLOCK_RGB_TOTAL;
			const hueOffset = hueStep * i;
			const hue = hueOffset;

			// Saturation
			const saturation = 40;

			// Lightness
			const lightness = 50;

			// Create Block RGB
			const blockRGB = new BlockRGB(this.#HOLDER, hue, saturation, lightness);
			this.#BLOCKS.push(blockRGB);
		}

		// Update Layout
		this.#updateLayout();

		console.log('UIBlockController initialised. Start Loading Blocks');

		// Start Load
		this.#BLOCKS[this.#blockLoadingIndex].load();
	}

	// ____________________________________________________________________ Tick

	static tick() {
		// Tick Blocks
		this.#BLOCKS.forEach((block) => {
			block.tick();
		});
	}

	// __________________________________________________________________ Layout

	static #updateLayout() {
		// Blocks
		for (let i = 0; i < this.#BLOCKS.length; i += 1) {
			// Get Block
			const BLOCK = this.#BLOCKS[i];

			// Get Random Grid Cell
			const gridCell = UIGridController.getRandomEmptyRectangle(
				BLOCK.getGridCellWidth(),
				BLOCK.getGridCellHeight(),
			);

			if (gridCell) {
				const gridCellIndex = gridCell.getCellIndex();

				// Set Position
				BLOCK.setPosition(gridCell.getPositionXPx(), gridCell.getPositionYPx());

				// Mark as Occupied
				UIGridController.setRectangleOccupied(
					gridCellIndex,
					BLOCK.getGridCellWidth(),
					BLOCK.getGridCellHeight(),
				);
			} else {
				ApplicationLogger.warn(
					'UIBlockController. No Empty Grid Cell Found',
					this.#LOG_LEVEL,
				);

				// TODO Overflowing blocks hidden
				BLOCK.hide();
			}
		}
	}

	// __________________________________________________________________ Blocks

	static #onBlockLoaded() {
		// ApplicationLogger.log(
		// 	`UIBlockController. Block Loaded ${this.#blockLoadingIndex}`,
		// 	this.#LOG_LEVEL,
		// );

		// Load Next Block
		this.#blockLoadingIndex += 1;

		// Limit
		if (this.#blockLoadingIndex >= this.#BLOCKS.length) {
			this.#onBlocksLoaded();

			return;
		}

		// Load Block
		this.#BLOCKS[this.#blockLoadingIndex].load();
	}

	static #onBlocksLoaded() {
		ApplicationLogger.log('UIBlockController. Blocks Loaded', this.#LOG_LEVEL);

		// TODO
	}

	// ____________________________________________________________________ Size

	static setSize(widthPx, heightPx) {
		// TODO
	}
}
