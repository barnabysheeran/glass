import ApplicationLogger from '../../../application/ApplicationLogger.js';

import Directable from '../../Directable.js';

export default class DirectableTitle extends Directable {
	// _________________________________________________________________________

	constructor() {
		super();

		ApplicationLogger.log('DirectableTitle', this.LOG_LEVEL);
	}

	// ________________________________________________________________ Set Text

	setText(text) {
		document.title = text;
	}
}
