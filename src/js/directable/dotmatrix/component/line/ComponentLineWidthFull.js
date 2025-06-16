import GridData from '../../../data/GridData.js';

import Component from '../Component.js';

export default class ComponentLineWidthFull extends Component {
	// _________________________________________________________________________

	constructor(shapeManager, gridY) {
		super(shapeManager);

		const GRID_MAX = GridData.getGridMax();
		const LINE_WIDTH = GRID_MAX[0] - 2;
	}
}
