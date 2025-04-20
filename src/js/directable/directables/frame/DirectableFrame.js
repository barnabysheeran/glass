import ApplicationLogger from '../../../application/ApplicationLogger';

import Directable from '../../Directable';

export default class DirectableFrame extends Directable {
	// _________________________________________________________________________

	constructor() {
		super();

		ApplicationLogger.log('DirectableFrame', this.LOG_LEVEL);
	}
}
