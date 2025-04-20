export default class OverlayDispatcherEvent {
	#EVENT_NAME;
	#CALLBACKS = [];

	// _________________________________________________________________________

	constructor(eventName) {
		// Store
		this.#EVENT_NAME = eventName;
	}

	// ________________________________________________________________ Register

	registerCallback(callback) {
		this.#CALLBACKS.push(callback);
	}

	unregisterCallback(callback) {
		// find the index of the callback
		const INDEX = this.CALLBACKS.indexOf(callback);

		if (INDEX > -1) {
			// remove callback
			this.#CALLBACKS.splice(INDEX, 1);
		}
	}

	// ____________________________________________________________________ Fire

	fire(data) {
		this.#CALLBACKS.forEach((callback) => {
			callback(data);
		});
	}

	// __________________________________________________________________ Access

	get EVENT_NAME() {
		return this.#EVENT_NAME;
	}
}
