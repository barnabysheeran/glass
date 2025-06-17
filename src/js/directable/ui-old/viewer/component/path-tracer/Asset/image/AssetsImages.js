import ApplicationLogger from '../../../../../../application/ApplicationLogger';
import ApplicationConfiguration from '../../../../../../application/ApplicationConfiguration';
import ApplicationDispatcher from '../../../../../../application-dispatcher/ApplicationDispatcher';

export default class AssetsImages {
	#URLS = ['AdobeStock_421058098.jpg'];

	#IMAGE_TOTAL = this.#URLS.length;
	#imageCurrent = 0;

	#CANVAS;
	#CONTEXT;

	#IMAGES = [];
	#IMAGE_DIMENSIONS = [];
	#IMAGE_DATA = [];

	// _________________________________________________________________________

	constructor() {
		ApplicationLogger.log('AssetsImage', 2);

		// Create Canvas
		this.#CANVAS = document.createElement('canvas');

		this.#CONTEXT = this.#CANVAS.getContext('2d', {
			willReadFrequently: true,
		});

		// Initialize Images
		for (let i = 0; i < this.#IMAGE_TOTAL; i += 1) {
			// Create Image
			const IMAGE = document.createElement('IMG');
			IMAGE.onload = this.#onImageLoaded.bind(this);

			this.#IMAGES.push(IMAGE);
		}

		// Start load
		const URL_FIRST = this.#getFilePath(0);
		this.#IMAGES[0].src = URL_FIRST;
	}

	// ____________________________________________________________________ Load

	#getFilePath(urlIndex) {
		// ApplicationLogger.log(`AssetsImages. getFilePath ${urlIndex}`, 2);

		return `${ApplicationConfiguration.getPathAsset()}path-tracer/texture/${
			this.#URLS[urlIndex]
		}`;
	}

	#onImageLoaded() {
		// ApplicationLogger.log(
		// 	`AssetsImages. onImageLoaded ${this.#imageCurrent}`,
		// 	2
		// );

		this.#imageCurrent += 1;

		if (this.#imageCurrent < this.#IMAGE_TOTAL) {
			this.#IMAGES[this.#imageCurrent].src = this.#getFilePath(
				this.#imageCurrent,
			);
		} else {
			this.#onImagesLoaded();
		}
	}

	#onImagesLoaded() {
		// ApplicationLogger.log('AssetsImages. onImagesLoaded', 2);

		for (let i = 0; i < this.#IMAGE_TOTAL; i += 1) {
			this.#generateImageData(i, this.#IMAGES[i]);
		}

		// Loaded
		ApplicationDispatcher.dispatch('path-tracer-assets-preloaded');
	}

	// ____________________________________________________________________ Data

	#generateImageData(imageIndex, image) {
		// Get Image Dimensions
		const WIDTH = image.width;
		const HEIGHT = image.height;

		// ApplicationLogger.log(
		// 	`ImageLibrary. generateImageData ${imageIndex} ${WIDTH} ${HEIGHT}`,
		// 	3
		// );

		// Size Canvas
		this.#CANVAS.width = WIDTH;
		this.#CANVAS.height = HEIGHT;

		// Draw to Canvas
		this.#CONTEXT.drawImage(image, 0, 0);

		// Store Image Dimensions
		this.#IMAGE_DIMENSIONS[imageIndex] = [WIDTH, HEIGHT];

		// Store Image Data
		this.#IMAGE_DATA[imageIndex] = this.#CONTEXT.getImageData(
			0,
			0,
			WIDTH,
			HEIGHT,
		).data;

		// Tidy Canvas
		this.#CANVAS.width = 0;
		this.#CANVAS.height = 0;
	}

	// __________________________________________________________________ Access

	getItemsToLoad() {
		return this.#IMAGE_TOTAL;
	}

	getImageDimensions() {
		return this.#IMAGE_DIMENSIONS;
	}

	getImageData() {
		return this.#IMAGE_DATA;
	}
}
