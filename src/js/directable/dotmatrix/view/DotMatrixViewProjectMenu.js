import ApplicationLogger from '../../../application/ApplicationLogger.js';

import GridData from '../../../grid/GridData.js';

import DotMatrixView from './DotMatrixView.js';

export default class DotMatrixViewProjectMenu extends DotMatrixView {
	#LOG_LEVEL = 4;

	// _________________________________________________________________________

	constructor(shapeManager) {
		super(shapeManager, 'project-menu');

		ApplicationLogger.log('Project Menu', this.#LOG_LEVEL);
	}
}
