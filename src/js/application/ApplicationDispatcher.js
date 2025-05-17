import ApplicationEvent from './ApplicationEvent.js';

export default class ApplicationDispatcher {
	static #EVENTS = [];

	static #VALID_EVENT_NAMES = [
		// Overlay
		'overlay-toggle-visibility',

		// Display
		'display-format-change',
	];

	// ________________________________________________________________ Dispatch

	static dispatch(eventName, data) {
		const EVENT = this.#EVENTS[eventName];

		if (EVENT !== undefined) {
			EVENT.fire(data);
		}
	}

	// ______________________________________________________________________ On

	static on(eventName, callback) {
		if (typeof callback !== 'function') {
			throw new Error('Callback must be a function');
		}

		this.#getOrCreateEvent(eventName).registerCallback(callback);
	}

	// _____________________________________________________________________ Off

	static off(eventName, callback) {
		const EVENT = this.#EVENTS[eventName];

		if (EVENT) {
			EVENT.unregisterCallback(callback);

			if (EVENT.CALLBACKS.length === 0) {
				delete this.#EVENTS[eventName];
			}
		}
	}

	// __________________________________________________________________ Create

	static #getOrCreateEvent(eventName) {
		if (this.#EVENTS[eventName] === undefined) {
			if (!this.#VALID_EVENT_NAMES.includes(eventName)) {
				throw new Error(`${eventName} is an invalid event name`);
			}

			this.#EVENTS[eventName] = new ApplicationEvent(eventName);
		}

		return this.#EVENTS[eventName];
	}
}
