import ApplicationLogger from '../../../../application/ApplicationLogger';

export default class ImageSequenceImage {
	#IMAGE_SEQUENCE_INDEX;
	#PATH_ASSET_ROOT;
	#CALLBACK_ON_SEQUENCE_COMPLETE;

	#IMAGE;

	#urlBase;

	#frameIndexMax = 0;
	#frameIndex = 0;

	#isPreloaded = false;
	#preloadIndex = 0;

	#playbackRate = 1;

	#OPACITY_DELTA_PER_FRAME = 0.01;
	#OPACITY_FRAME_DURATION = 1 / this.#OPACITY_DELTA_PER_FRAME;
	#opacity = 0.0;

	// _________________________________________________________________________

	constructor(
		imageSequenceIndex,
		holder,
		pathAssetRoot,
		callbackOnSequenceComplete,
	) {
		// Store
		this.#IMAGE_SEQUENCE_INDEX = imageSequenceIndex;
		this.#PATH_ASSET_ROOT = pathAssetRoot;
		this.#CALLBACK_ON_SEQUENCE_COMPLETE = callbackOnSequenceComplete;

		// Create Image
		this.#IMAGE = document.createElement('img');
		this.#IMAGE.className = 'image-sequence-image';
		this.#IMAGE.style.opacity = Math.random();
		holder.appendChild(this.#IMAGE);

		// Initial Blend Mode
		this.setRandomBlendMode();
	}

	// ___________________________________________________________ Load Sequence

	initialiseSequence(sequenceData) {
		ApplicationLogger.log('ImageSequenceImage initialiseSequence');

		// Store
		this.#frameIndexMax = sequenceData.imageTotal;
		this.#urlBase = `${this.#PATH_ASSET_ROOT}${sequenceData.id}/${sequenceData.id}`;

		// Reset Frame Index
		this.#frameIndex = 1;

		// Reset Opacity
		this.#opacity = 0.0;

		// Not Preloaded
		this.#isPreloaded = false;

		// Load
		this.#loadMediaToCache();
	}

	#loadMediaToCache() {
		// Reset Preload Index
		this.#preloadIndex = 1;

		this.#preloadImage(this.#preloadIndex);
	}

	#preloadImage(index) {
		const URL = `${this.#urlBase}${index}.jpg`;

		// TODO Re-Use Image
		const IMAGE = new Image();
		IMAGE.onload = this.#onImagePreloaded.bind(this);
		IMAGE.src = URL;
	}

	#onImagePreloaded() {
		this.#preloadIndex += 1;

		if (this.#preloadIndex <= this.#frameIndexMax) {
			this.#preloadImage(this.#preloadIndex);
		} else {
			this.#isPreloaded = true;
		}
	}

	// ___________________________________________________________________ Frame

	frame() {
		if (this.#isPreloaded === false) {
			return;
		}

		// Move Frame Index
		this.#frameIndex += this.#playbackRate;

		// Set Opacity ?
		const FRAME_OPACITY = this.#getOpacityAtFrameIndex(this.#frameIndex);

		if (FRAME_OPACITY !== this.#opacity) {
			// Set
			this.#IMAGE.style.opacity = FRAME_OPACITY;

			// Store
			this.#opacity = FRAME_OPACITY;
		}

		// Loop at End
		// if (this.#frameIndex >= this.#frameIndexMax) {
		// 	this.#frameIndex = 1;
		// }

		// Callback
		if (this.#frameIndex >= this.#frameIndexMax) {
			this.#CALLBACK_ON_SEQUENCE_COMPLETE(this.#IMAGE_SEQUENCE_INDEX);

			return;
		}

		// Set Image
		this.#setImage(this.#frameIndex);
	}

	#setImage(index) {
		this.#IMAGE.src = `${this.#urlBase}${index}.jpg`;
	}

	// ___________________________________________________________________ Blend

	#BLEND_MODES = ['screen', 'lighten', 'soft-light'];

	setRandomBlendMode() {
		const RANDOM_INDEX = Math.floor(Math.random() * this.#BLEND_MODES.length);

		this.#IMAGE.style.mixBlendMode = this.#BLEND_MODES[RANDOM_INDEX];
	}

	// _________________________________________________________________ Opacity

	#getOpacityAtFrameIndex(frameIndex) {
		let opacity = 1.0;

		// Linear Fade In
		if (frameIndex < this.#OPACITY_FRAME_DURATION) {
			opacity = frameIndex / this.#OPACITY_FRAME_DURATION;
		}

		// Linear Fade Out
		if (frameIndex > this.#frameIndexMax - this.#OPACITY_FRAME_DURATION) {
			opacity =
				1 -
				(frameIndex - (this.#frameIndexMax - this.#OPACITY_FRAME_DURATION)) /
					this.#OPACITY_FRAME_DURATION;
		}

		return opacity;
	}

	// ________________________________________________________________ Position

	setPosition(x, y) {
		// 2D Transform
		this.#IMAGE.style.transform = `translate(${x}px, ${y}px)`;
	}
}
