import ApplicationLogger from '../application/ApplicationLogger.js';
import ApplicationDispatcher from '../application/ApplicationDispatcher.js';

// ______________________________________________________________________ Holder

export function overlayCreateHolder() {
	// Create Holder
	const HOLDER = document.createElement('div');
	HOLDER.id = 'overlay-holder';
	HOLDER.className = 'overlay-holder';

	return HOLDER;
}

// _______________________________________________________________________ Label

export function overlayCreateLabel(text) {
	// Check Parameters
	if (text === undefined || text === null) {
		ApplicationLogger.warn(
			`OverlayUtils. overlayCreateLabel. Missing required parameter ${text}`,
			3,
		);
	}

	// Create Label
	const LABEL = document.createElement('div');
	LABEL.id = 'overlay-label';
	LABEL.className = 'overlay-label';
	LABEL.innerHTML = text;

	return LABEL;
}

// ______________________________________________________________________ Button

export function overlayCreateButton(
	text,
	dispatcherEventName,
	dispatcherEventData = {},
) {
	// Create Button
	const BUTTON = document.createElement('div');
	BUTTON.id = 'overlay-button';
	BUTTON.className = 'overlay-button standard';
	BUTTON.innerHTML = text;

	// Add Event Listener
	BUTTON.addEventListener('click', () => {
		ApplicationDispatcher.dispatch(dispatcherEventName, dispatcherEventData);
	});

	return BUTTON;
}
