import ApplicationLogger from '../../application/ApplicationLogger.js';

import OverlayDispatcherEvent from './OverlayDispatcherEvent.js';

export default class OverlayDispatcher {
	static #OVERLAY_DISPATCHER_EVENTS = [];

	// ________________________________________________________________ Dispatch

	static dispatch(eventName, data) {
		// ApplicationLogger.log(
		// 	`OverlayDispatcher.dispatch. eventName ${eventName} data ${data}`,
		// 	1
		// );

		// Get Event
		const EVENT = this.#OVERLAY_DISPATCHER_EVENTS[eventName];

		if (EVENT !== undefined) {
			// Fire Event
			EVENT.fire(data);
		} else {
			// Event Not Found
			ApplicationLogger.warn(
				`OverlayDispatcher.dispatch. eventName ${eventName} has no listeners`,
				1,
			);
		}
	}

	// ________________________________________________________________ On / Off

	static on(eventName, callback) {
		this.#getOrCreateEvent(eventName).registerCallback(callback);
	}

	static off(eventName, callback) {
		const EVENT = this.#OVERLAY_DISPATCHER_EVENTS[eventName];

		if (EVENT !== undefined) {
			EVENT.unregisterCallback(callback);

			if (EVENT.CALLBACKS.length === 0) {
				delete this.#OVERLAY_DISPATCHER_EVENTS[eventName];
			}
		}
	}

	// _____________________________________________________________________ Get

	static #getOrCreateEvent(eventName) {
		if (this.#OVERLAY_DISPATCHER_EVENTS[eventName] === undefined) {
			this.#OVERLAY_DISPATCHER_EVENTS[eventName] = new OverlayDispatcherEvent(
				eventName,
			);
		}

		return this.#OVERLAY_DISPATCHER_EVENTS[eventName];
	}
}
