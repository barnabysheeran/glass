import ApplicationLogger from '../../../../../application/ApplicationLogger';
import ApplicationDispatcher from '../../../../../application-dispatcher/ApplicationDispatcher';

// import AssetsFonts from './font/AssetsFonts';
import AssetsImages from './image/AssetsImages';

export default class AssetController {
	static #ASSETS_FONTS;
	static #ASSETS_IMAGES;

	static #itemsToLoad = 0;
	static #itemsToLoadMax = this.#itemsToLoad;

	// _________________________________________________________________________

	static initialise() {
		ApplicationLogger.log(`AssetController. initialise`, 1);

		// Font
		// this.#ASSETS_FONTS = new AssetsFonts(this.#onItemLoaded.bind(this));

		// this.#itemsToLoad += 1;

		// Image
		this.#ASSETS_IMAGES = new AssetsImages(this.#onItemLoaded.bind(this));

		this.#itemsToLoad += 1;

		// Store Max
		this.#itemsToLoadMax = this.#itemsToLoad;
	}

	// __________________________________________________________________ Loaded

	static #onItemLoaded() {
		// Loaded
		this.#itemsToLoad -= 1;

		ApplicationLogger.log(
			`AssetController. onItemLoaded. Loaded ${
				this.#itemsToLoadMax - this.#itemsToLoad
			} of ${this.#itemsToLoadMax}`,
			1,
		);

		// Complete ?
		if (this.#itemsToLoad === 0) {
			this.#onAllItemsLoaded();
		}
	}

	/* eslint-disable-next-line class-methods-use-this */
	static #onAllItemsLoaded() {
		// ApplicationLogger.log('AssetController. onAllItemsLoaded', 1);

		// Dispatch
		ApplicationDispatcher.dispatch('path-tracer-assets-preloaded');
	}

	// __________________________________________________________________ Access

	static getImageDimensions() {
		return this.#ASSETS_IMAGES.getImageDimensions();
	}

	static getImageData() {
		return this.#ASSETS_IMAGES.getImageData();
	}
}
