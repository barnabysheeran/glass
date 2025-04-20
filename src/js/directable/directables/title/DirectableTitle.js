import ApplicationLogger from '../../../application/ApplicationLogger';

import Directable from '../../Directable';

export default class DirectableTitle extends Directable {
	// _________________________________________________________________________

	constructor() {
		super();

		ApplicationLogger.log('DirectableTitle', this.LOG_LEVEL);
	}

	// ________________________________________________________________ Set Text

	/* eslint-disable class-methods-use-this */
	setText(text) {
		document.title = text;
	}
}
