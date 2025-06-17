import FontFaceObserver from 'fontfaceobserver';

// import ApplicationLogger from '../../application/ApplicationLogger';

export default class AssetsFonts {
	#LOADED_CALLBACK;

	#FONT_FACE_OBSERVER_FORUM;

	// _________________________________________________________________________

	constructor(onLoadedCallback) {
		// ApplicationLogger.log('AssetsFonts', 2);

		// Store
		this.#LOADED_CALLBACK = onLoadedCallback;

		// Forum
		this.#FONT_FACE_OBSERVER_FORUM = new FontFaceObserver('Forum');

		this.#FONT_FACE_OBSERVER_FORUM.load().then(this.#onFontLoaded.bind(this));
	}

	// _________________________________________________________________________

	#onFontLoaded() {
		// ApplicationLogger.log('AssetsFonts. onFontLoaded', 2);

		// Loaded
		this.#LOADED_CALLBACK();
	}

	// __________________________________________________________________ Access

	getItemsToLoad() {
		return 1;
	}
}
